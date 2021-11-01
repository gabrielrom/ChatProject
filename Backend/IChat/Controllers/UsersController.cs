using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IChat.Dtos;
using IChat.Helpers;
using IChat.Models;
using IChat.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BC = BCrypt.Net.BCrypt;

namespace IChat.Controllers
{
  [ApiController]
  [Route("api/v1/users")]
  public class UsersController : ControllerBase
  {
    private readonly IUsersRepository _usersRepository;
    private readonly IMapper _mapper;
    private readonly JwtGenerator _jwtGenerator;

    public UsersController(IUsersRepository usersRepository, IMapper mapper, JwtGenerator jwtGenerator) {
      _usersRepository = usersRepository;
      _mapper = mapper;
      _jwtGenerator = jwtGenerator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(UserRequestDto userRequest) {
      if (!ModelState.IsValid) return 
        BadRequest(FormatResponseError.Format(ModelState));

      var userAlreadyExists = await _usersRepository.FindByEmail(userRequest.Email);

      if (userAlreadyExists != null) return 
        BadRequest(FormatResponseError.Format("This user is already exists"));

      var user = _mapper.Map<User>(userRequest);
      
      user.SetPasswordHashed(BC.HashPassword(userRequest.Password));

      await _usersRepository.Create(user);

      return StatusCode(201);
    }

    [HttpPost("sessions")]
    public async Task<IActionResult> CreateSession(SessionRequestDto sessionRequest) {
      if (!ModelState.IsValid) return BadRequest(FormatResponseError.Format(ModelState));

      var user = await _usersRepository.FindByEmail(sessionRequest.Email);

      if (user == null) return BadRequest(FormatResponseError.Format("The email/password is invalid!"));

      var passwordIsMatched = BC.Verify(sessionRequest.Password, user.Password);

      if (!passwordIsMatched) return BadRequest(
        FormatResponseError.Format("The email/password is invalid!")
      );

      return StatusCode(201, new {
        success = true,
        data = new {
          userId = user.Id,
          username = user.Name,
          email = user.Email,
          avatar = user.AvatarUrl ?? "",
          token = _jwtGenerator.Generate(user.Id)
        }
      });
    }

    [HttpPut("{id:guid}/avatars")]
    [Authorize]
    public async Task<IActionResult> UpdateAvatar(Guid id, [FromForm]IFormFile file) {
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

      var userId = Guid.Parse(User.Claims.FirstOrDefault(
        claim => claim.Type == "userId"
      ).Value);

      var user = await _usersRepository.FindById(userId);

      if (user is null) return NotFound(
        FormatResponseError.Format(
          "This user doesnt exist."
        )
      );

      var fileInfos = await HandleImages.SaveImage(file);

      user.SetAvatarUrl(fileInfos.ImageUrl);

      await _usersRepository.SaveChangesAsync();

      return NoContent();
    }
  }
}