using System;
using System.Threading.Tasks;
using IChat.Models;

namespace IChat.Repositories.Interfaces
{
  public interface IUsersRepository {
    Task<User> Create(User user);
    Task<User> FindByEmail(string email);
    Task<User> FindById(Guid userId);
    Task SaveChangesAsync();
  }
}