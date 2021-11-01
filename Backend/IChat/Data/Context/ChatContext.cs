using IChat.Models;
using Microsoft.EntityFrameworkCore;

namespace IChat.Data
{
  public class ChatContext : DbContext
  { 
    public DbSet<User> Users { get; set; }
    public DbSet<Channel> Channels { get; set; }

    public ChatContext(DbContextOptions options) : base(options){}
  }
}