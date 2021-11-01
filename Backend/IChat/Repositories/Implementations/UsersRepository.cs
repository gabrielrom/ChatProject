using System;
using System.Threading.Tasks;
using IChat.Data;
using IChat.Models;
using IChat.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IChat.Repositories.Implementations {
  public class UsersRepository : IUsersRepository {
    private readonly ChatContext _context;

    public UsersRepository(ChatContext context) {
      _context = context;
    }

    public async Task<User> Create(User user) {
      _context.Users.Add(user);

      await _context.SaveChangesAsync();

      return user;
    }

    public async Task<User> FindByEmail(string email) {
      return await _context.Users.FirstOrDefaultAsync(value => value.Email == email);
    }

    public async Task<User> FindById(Guid userId) {
      return await _context.Users.FindAsync(userId);
    }

    public async Task SaveChangesAsync() {
      await _context.SaveChangesAsync();
    }
  }
}