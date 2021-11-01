using System;
using System.Collections.Generic;

namespace IChat.Dtos
{
  public class ChannelResponseDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string OwnerId { get; set; }
    public string ImageUrl { get; set; }
    public int CountMembers { get; set; }
    public IEnumerable<UsersResponseDto> Users { get; set; }
  }

  public class UsersResponseDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string AvatarUrl { get; set; }
  }
}