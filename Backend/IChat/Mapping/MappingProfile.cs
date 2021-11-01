using AutoMapper;
using IChat.Dtos;
using IChat.Models;

namespace IChat.Mapping {
  public class MappingProfile : Profile {

    public MappingProfile() {
      CreateMap<UserRequestDto, User>();
      CreateMap<ChannelRequestDto, Channel>();

      CreateMap<User, UsersResponseDto>();
      CreateMap<Channel, ChannelResponseDto>();
  
    } 

  }
}