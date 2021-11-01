using System;

namespace IChat.Models
{
  public abstract class Entity
  {
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }

    public Entity()
    {
      Id = Guid.NewGuid();
      CreatedAt = DateTime.Now;
    }
  }
}