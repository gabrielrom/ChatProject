using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace IChat.Hubs {
  public class ChatHub : Hub {
    
    public async Task JoinToGroup(Guid groupId) {
      await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());

      await Clients.Caller.SendAsync(
        "ReceiveMessages", 
        $"The user with connection id: {Context.ConnectionId} connected to the group {groupId}");
    }

  }
}