using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace IChat.Models
{
  public class User : Entity { 
    public string Name { get; private set; }
    public string Email { get; private set; }
    public string Password { get; private set; }
    public string AvatarUrl { get; private set; }

    public ICollection<Channel> Channels { get; private set; } = new Collection<Channel>();

    public User(string name, string email, string password)
    {
      Name = name;
      Email = email;
      Password = password;
    }

    public void SetAvatarUrl(string url) => AvatarUrl = url;

    public void SetPasswordHashed(string passwordHashed) => Password = passwordHashed;
  }
}