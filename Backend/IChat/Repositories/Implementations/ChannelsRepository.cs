using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using IChat.Data;
using IChat.Models;
using IChat.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace IChat.Repositories.Implementations {
  public class ChannelsRepository : IChannelsRepository {
    private readonly ChatContext _context;

    public ChannelsRepository(ChatContext context)
    {
      _context = context;
    }

    public async Task Create(Channel channel) {
      _context.Channels.Add(channel);
      await _context.SaveChangesAsync();
    }

    public async Task<bool> ChannelNameAreadyExists(string name) {
      return await _context.Channels.AnyAsync(channel => channel.Name == name);
    }

    public async Task<Channel> FindById(Guid channelId) {
      return await _context.Channels.FindAsync(channelId);
    }

    public async Task<Channel> FindByNameWithMembers(string name) {
      return await _context.Channels.Include(channel => channel.Users)
        .FirstOrDefaultAsync(channel => channel.Name == name);
    }

    public IEnumerable<Channel> FindChannelsWithMembersByUser(User user) {
      return _context.Channels.Include(channel => channel.Users).AsNoTracking()
        .Where(channel => channel.Users.Contains(user));
    }

    public async Task SaveChangesAsync() {
      await _context.SaveChangesAsync();
    }
  }
}