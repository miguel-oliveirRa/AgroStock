using Domain.Entities;

namespace Application.Services.Auth
{
    public interface ITokenManager
    {
        string GenerateToken(User user);

        string GenerateRefreshToken(User user);

        Task<string?> GenerateAccessTokenAsync(string token);

        User? Authenticate(string email, string password);
    }
}