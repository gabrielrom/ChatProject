using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IChat.Dtos;
using IChat.Helpers;
using IChat.Hubs;
using IChat.Models;
using IChat.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace IChat.Controllers
{
  [ApiController]
  [Authorize]
  [Route("api/v1/channels")]
  public class ChannelsController : ControllerBase {
    private readonly IChannelsRepository _channelsRepository;
    private readonly IUsersRepository _usersRepository;
    private readonly IHubContext<ChatHub> _hubContext;
    private readonly IMapper _mapper;

    public ChannelsController(IChannelsRepository channelsRepository, 
                              IUsersRepository usersRepository,
                              IHubContext<ChatHub> hubContext,
                              IMapper mapper)
    {
      _channelsRepository = channelsRepository;
      _usersRepository = usersRepository;
      _hubContext = hubContext;
      _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> CreateChannel(ChannelRequestDto channelRequestDto) {
      if (!ModelState.IsValid) return BadRequest(
        FormatResponseError.Format(ModelState)
      );

      var channelExists = await _channelsRepository.ChannelNameAreadyExists(channelRequestDto.Name);

      if (channelExists) return BadRequest(
        FormatResponseError.Format("This channel name already exists")
      );

      var userId = Guid.Parse(User.Claims.FirstOrDefault(
        claim => claim.Type == "userId"
      ).Value);

      var user = await _usersRepository.FindById(userId);

      if (user is null) return NotFound(
        FormatResponseError.Format(
          "This user doesnt exist."
        )
      );

      var channel = _mapper.Map<Channel>(channelRequestDto);

      channel.AddOwner(userId);
      channel.AddMember(user);

      await _channelsRepository.Create(channel);

      return StatusCode(201);
    }

    [HttpPost("join")]
    public async Task<IActionResult> JoinChannel(ChannelRequestDto channelRequest) {
      if (!ModelState.IsValid) return BadRequest(
        FormatResponseError.Format(ModelState)
      );

      var userId = Guid.Parse(User.Claims.FirstOrDefault(
        claim => claim.Type == "userId"
      ).Value);

      var user = await _usersRepository.FindById(userId);

      if (user is null) return NotFound(
        FormatResponseError.Format(
          "This user doesnt exist."
        )
      );

      var channel = await _channelsRepository.FindByNameWithMembers(channelRequest.Name);

      if (channel is null) return NotFound(
        FormatResponseError.Format(
          "This channel does not exist."
        )
      );

      if (channel.Users.Any(user => user.Id == userId)) return BadRequest(
        FormatResponseError.Format("You are already in this channel")
      );

      channel.AddMember(user);

      await _channelsRepository.SaveChangesAsync();

      return Ok(new { success = true, data = _mapper.Map<ChannelResponseDto>(channel) });
    }


    [HttpGet]
    public async Task<IActionResult> GetChannels() {
      var userId = Guid.Parse(User.Claims.FirstOrDefault(
        claim => claim.Type == "userId"
      ).Value);

      var user = await _usersRepository.FindById(userId);

      if (user is null) return NotFound(
        FormatResponseError.Format(
          "This user doesnt exist."
        )
      );

      var channels = _channelsRepository.FindChannelsWithMembersByUser(user);
 
      var channelsMapped = _mapper.Map<IEnumerable<ChannelResponseDto>>(channels);

      return Ok(new { success = true, data = channelsMapped});
    }

    [HttpPost("{id:guid}/images")]
    public async Task<IActionResult> UploadImage(Guid id, [FromForm]IFormFile file) {
      if (file == null) return BadRequest(
        FormatResponseError.Format(
          "You cannot upgrade without an image."
        )
      );

      if (file.FileName.Contains(' ')) return BadRequest(
        FormatResponseError.Format(
          "Filename cannot have blank spaces."
        )
      );

      var channel = await _channelsRepository.FindById(id);

      if (channel is null) return BadRequest(
        FormatResponseError.Format("This channel does not exist")
      );

      var fileInfos = await HandleImages.SaveImage(file);

      channel.SetImageUrl(fileInfos.ImageUrl);

      await _channelsRepository.SaveChangesAsync();
    
      return Ok(); 
    }

    [HttpPost("{id:guid}/sendmessages")]
    public async Task<IActionResult> SendMessage(Guid id, SendMessageRequestDto sendMessageDto) {

      if (!ModelState.IsValid) return BadRequest(FormatResponseError.Format(ModelState));

      var channel = await _channelsRepository.FindById(id);

      if (channel is null) return BadRequest(
        FormatResponseError.Format("This channel does not exists!")
      );

      var channelWithMembers = await _channelsRepository.FindByNameWithMembers(channel.Name);
      var user = channelWithMembers.Users.FirstOrDefault(user => user.Id == sendMessageDto.UserId);

      if (user is null) return BadRequest(
        FormatResponseError.Format("you can't send a message to a group that you're not a member of")
      );

      await _hubContext.Clients.Group(channel.Id.ToString()).SendAsync("ReceiveMessages", new { 
        channelName = channel.Name,
        userAvatar = user.AvatarUrl ?? "",
        userName = user.Name,
        userId = user.Id,
        message = sendMessageDto.Message,
        sendDate = $"{DateTime.Now.ToString("hh:mm")} {DateTime.Now.ToString("tt", CultureInfo.InvariantCulture)}",
      });

      return Ok();
    }
  }
}