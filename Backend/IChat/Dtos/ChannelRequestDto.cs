using System.ComponentModel.DataAnnotations;

namespace IChat.Dtos
{
  public class ChannelRequestDto
  {
    [Required(ErrorMessage = "The property {0} is required.")]
    [MinLength(5, ErrorMessage = "The property {0} must have at least {1} characters")]
    public string Name { get; set; }
  }
}