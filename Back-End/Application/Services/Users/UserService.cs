using Domain;
using Domain.Entities;

namespace Application.Services.Users
{
    public class UserService
    {
        private readonly List<User> _users = new()
        {
            new User { Email = "teste1@email.com", Password = "12345678910", Role = Roles.Admin },
            new User { Email = "teste2@email.com", Password = "123456789", Role = Roles.User }
        };

        public User? ValidadeUser(string email, string password)
        {
            return _users.FirstOrDefault(u => u.Email == email && u.Password == password);
        }

        public User? GetUserByEmail(string email)
        {
            return _users.FirstOrDefault(u => u.Email == email);
        }
    }
}