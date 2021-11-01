using System.ComponentModel.DataAnnotations;

namespace IChat.Dtos {
  
  public class SessionRequestDto {
    [Required(ErrorMessage = "The property {0} is required")]
    [EmailAddress(ErrorMessage = "The property {0} must have a valid value")]
    public string Email { get; set; }

    [Required(ErrorMessage = "The property {0} is required")]
    [MinLength(5, ErrorMessage = "The property {0} must have at least {1} characters")]
    public string Password { get; set; }
  }
  
}