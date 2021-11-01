using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace IChat.Helpers
{
  public static class FormatResponseError
  {
    public static object Format(ModelStateDictionary modelState) {
      return new {
        success = false,
        errors = modelState.Values.SelectMany(value => value.Errors.Select(error => error.ErrorMessage))
      };
    }

    public static object Format(string message) {
      return new {
        success = false,
        message
      };
    }
  }
}