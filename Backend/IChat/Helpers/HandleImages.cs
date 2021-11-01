using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace IChat.Helpers
{
  public static class HandleImages {
    public static async Task<FileInfos> SaveImage(IFormFile imageFile) {
      var pathFile = $"C:/Users/Vaivoa/Documents/desafios-vaivoa/ChatProject/Backend/IChat/tmp/images";

      var random = new Random();
      var generateFileName = $"{random.Next(100000, 999999)}-{imageFile.FileName}";

      var isDirectoryExists = Directory.Exists(
        pathFile
      );

      if (!isDirectoryExists) {
        Directory.CreateDirectory(pathFile);
      }

      using(
        FileStream fileStream = File.Create(
          Path.Combine(
            pathFile,
            generateFileName
          )
        )
      ) {
        await imageFile.CopyToAsync(fileStream);
        fileStream.Flush();
      }

      return new FileInfos (
        fileName: generateFileName,
        imageUrl: $"http://localhost:5000/images/{generateFileName}"
      );
    }
  }

  public class FileInfos {
    public string FileName { get; private set; }
    public string ImageUrl { get; private set; }

    public FileInfos(
      string fileName,
      string imageUrl
    ) {
      FileName = fileName;
      ImageUrl = imageUrl;
    }
  }
}