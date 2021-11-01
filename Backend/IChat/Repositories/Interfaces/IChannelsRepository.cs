using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IChat.Models;

namespace IChat.Repositories.Interfaces
{
  public interface IChannelsRepository {
    Task Create(Channel channel);
    Task<bool> ChannelNameAreadyExists(string name);
    Task<Channel> FindByNameWithMembers(string name);
    IEnumerable<Channel> FindChannelsWithMembersByUser(User user);
    Task<Channel> FindById(Guid channelId);
    Task SaveChangesAsync();
  }
}