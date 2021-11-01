using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace IChat.Configurations
{
  public static class JwtConfigurations
  {
    public static IServiceCollection AddJwt(
      this IServiceCollection service, 
      IConfiguration configuration
    ) {

      var jwtSettingsSection = configuration.GetSection("JwtSettings");
      service.Configure<JwtSettings>(jwtSettingsSection);

      var jwtSettings = jwtSettingsSection.Get<JwtSettings>();
      var jwtKey = Encoding.ASCII.GetBytes(jwtSettings.Secret);

      service.AddAuthentication(options => {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(
        options => {
          options.RequireHttpsMetadata = true;
          options.SaveToken = true;
          options.TokenValidationParameters = new TokenValidationParameters {
            ClockSkew = TimeSpan.Zero,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(jwtKey),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = jwtSettings.Issuer,
            ValidAudience = jwtSettings.Audience
          };
        }
      );

      return service;

    }
  }

  public class JwtSettings {

    public string Secret { get; set; }
    public string Audience { get; set; }
    public string Issuer { get; set; }
    public int ExpiresInHour { get; set; }

  }
}