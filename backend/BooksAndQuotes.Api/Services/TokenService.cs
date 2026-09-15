using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BooksAndQuotes.Api.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BooksAndQuotes.Api.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string CreateToken(AppUser user)
    {
        var jwtKey = _configuration["Jwt:Key"];
        var jwtIssuer = _configuration["Jwt:Issuer"];
        var jwtAudience = _configuration["Jwt:Audience"];
        var expiresInMinutes = _configuration["Jwt:ExpiresInMinutes"];

        if (string.IsNullOrWhiteSpace(jwtKey) ||
            string.IsNullOrWhiteSpace(jwtIssuer) ||
            string.IsNullOrWhiteSpace(jwtAudience) ||
            string.IsNullOrWhiteSpace(expiresInMinutes))
        {
            throw new InvalidOperationException(
                "JWT configuration is missing. Set Jwt__Key, Jwt__Issuer, Jwt__Audience, and Jwt__ExpiresInMinutes in Azure App Service application settings.");
        }

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName ?? string.Empty)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtKey));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                double.Parse(expiresInMinutes)),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}