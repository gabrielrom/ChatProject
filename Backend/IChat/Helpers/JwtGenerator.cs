using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IChat.Configurations;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace IChat.Helpers
{
  public class JwtGenerator
  {
    private readonly JwtSettings _jwtSetting;

    public JwtGenerator(IOptions<JwtSettings> jwtSettings) {
      _jwtSetting = jwtSettings.Value;
    }
    
    public string Generate(Guid userId) {

      var tokenHandler = new JwtSecurityTokenHandler();
      var jwtSecretKey = Encoding.ASCII.GetBytes(
        _jwtSetting.Secret
      );

      var token = tokenHandler.CreateToken(
        new SecurityTokenDescriptor{
          Subject = new ClaimsIdentity(
            new Claim[] {
              new Claim("userId", userId.ToString())
            }
          ),
          Issuer = _jwtSetting.Issuer,
          Audience = _jwtSetting.Audience,
          Expires = DateTime.UtcNow.AddHours(_jwtSetting.ExpiresInHour),
          SigningCredentials = new SigningCredentials(
            new SymmetricSecurityKey(jwtSecretKey), 
            SecurityAlgorithms.HmacSha256Signature
          )
        }
      );

      var encodedToken = tokenHandler.WriteToken(token);

      return encodedToken;
    } 
  }
}