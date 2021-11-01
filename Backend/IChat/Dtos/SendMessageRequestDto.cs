using System;
using System.ComponentModel.DataAnnotations;

namespace IChat.Dtos {
  public class SendMessageRequestDto {

    [Required(ErrorMessage = "The userId is required")]
    public Guid UserId { get; set; }
    [Required(ErrorMessage = "The message is required")]
    [MinLength(1, ErrorMessage = "The message can not be empty")]
    public string Message { get; set; }
    [Required(ErrorMessage = "The send date of message is required")]
    public string SendDate { get; set; }

  }
}