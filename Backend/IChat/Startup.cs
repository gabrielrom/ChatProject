using System.IO;
using IChat.Configurations;
using IChat.Data;
using IChat.Helpers;
using IChat.Hubs;
using IChat.Repositories.Implementations;
using IChat.Repositories.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace IChat
{
  public class Startup
  {
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<ChatContext>(options => options.UseNpgsql(Configuration.GetConnectionString("DatabaseConnection")));

      services.Configure<ApiBehaviorOptions>(
        options => options.SuppressModelStateInvalidFilter = true
      );

      services.AddJwt(Configuration);
      services.AddScoped<JwtGenerator>();

      services.AddScoped<IUsersRepository, UsersRepository>();
      services.AddScoped<IChannelsRepository, ChannelsRepository>();
      services.AddAutoMapper(typeof(Startup));

      services.AddCors(options => {
        options.AddDefaultPolicy(builder => {
          builder.AllowAnyHeader();
          builder.WithOrigins("http://localhost:3000").AllowCredentials();
        });
      });

      services.AddControllers();
      services.AddSignalR();

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "IChat", Version = "v1" });
      });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "IChat v1"));
      }

      app.UseStaticFiles(new StaticFileOptions {
        FileProvider = new PhysicalFileProvider(
          Path.Combine(env.ContentRootPath, "tmp/images")),
        RequestPath = "/images"
      });

      app.UseRouting();

      app.UseCors();

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
        endpoints.MapHub<ChatHub>("/chathub");
      });
    }
  }
}
