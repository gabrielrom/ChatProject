using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace IChat.Models
{
  public class Channel : Entity {
    public string Name { get; private set; }
    public Guid OwnerId { get; private set; }
    public string ImageUrl { get; private set; }
    public int CountMembers { get; private set; }
  
    public ICollection<User> Users { get; private set; } = new Collection<User>();

    public Channel(string name) {
      Name = name;
    }

    public void AddOwner(Guid ownerId) => OwnerId = ownerId;

    public void AddMember(User user) {
      Users.Add(user);
      CountMembers += 1;
    }

    public void SetImageUrl(string imageUrl) => ImageUrl = imageUrl;
  }
}