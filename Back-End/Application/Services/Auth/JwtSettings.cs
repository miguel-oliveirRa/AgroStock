using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services.Auth
{
    public class JwtSettings
    {
        public const string SecretKey = "MinhaChaveSecretaSuperSuperSuperSuperSuperSuperSuperSegura"; 
        public static readonly SymmetricSecurityKey SecurityKey = new(Encoding.UTF8.GetBytes(SecretKey));

        public const string Issuer = "AgroStockAPI";
        public const string Audience = "AgroStockClient";
        
        public static TokenValidationParameters GetValidationParameters() => new()
        {
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = SecurityKey,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = Issuer,
            ValidAudience = Audience,
            ClockSkew = TimeSpan.Zero
        };
    }
}