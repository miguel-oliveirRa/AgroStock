using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Application.Services.Users;
using Domain.Entities;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services.Auth
{
    public class TokenManager : ITokenManager
    {

        private readonly UserService _user;

        public TokenManager(UserService user)
        {
            _user = user;
        }

        public User? Authenticate(string email, string password)
        {
            var user = _user.ValidadeUser(email, password);
            if (user == null)
                return null;         

            return user;
        }

        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();   
            var key = JwtSettings.SecurityKey;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = JwtSettings.Issuer,
                Audience = JwtSettings.Audience,
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string GenerateRefreshToken(User user)
        {  
            var tokenHandler = new JwtSecurityTokenHandler();   
            var key = JwtSettings.SecurityKey;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                Audience = JwtSettings.Audience,
                Issuer = JwtSettings.Issuer,
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<string?> GenerateAccessTokenAsync(string token)
        {
            if(string.IsNullOrWhiteSpace(token))
                return null;

            var validToken = await new JwtSecurityTokenHandler().ValidateTokenAsync(token, JwtSettings.GetValidationParameters());

            if (!validToken.IsValid)
                return  null;

            var emailClaim  = validToken.Claims.FirstOrDefault(c => c.Key == ClaimTypes.Email).Value.ToString();

            if(string.IsNullOrWhiteSpace(emailClaim))
                return null;

            return emailClaim;
        }
    }
}