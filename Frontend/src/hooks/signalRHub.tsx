import React, { createContext, useState, useCallback, useContext } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ResponseMessage } from '../interfaces';

interface SignalRContextData {
  connection: HubConnection;
  messages: ResponseMessage[];
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

const SignalRContext = createContext({} as SignalRContextData);

const SignalRProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState([] as ResponseMessage[])
  const [connection, setConnection] = useState({} as HubConnection);

  const connect = useCallback(async (): Promise<void> => {
    try {
      var connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/chathub")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessages", (message: ResponseMessage) => {
        const messageDiv = document.querySelector(".channel-hub");
        
        setMessages(messages => [...messages, message]);

        if (messageDiv) {
          messageDiv.scrollTop = messageDiv.scrollHeight;
        }

      });
      
      await connection.start();
      setConnection(connection);
    } catch(err) {
      console.log(err);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await connection.stop();
    } catch(err) {
      console.log(err);
    }
  }, [connection]);

  return (
    <SignalRContext.Provider value={{ connection, connect, disconnect, messages }}>
      {children}
    </SignalRContext.Provider>
  )
}

function useSignalR(): SignalRContextData {
  const context = useContext(SignalRContext);

  if (!context) {
    throw new Error('useSignalR must be used within an SignalRProvider');
  }

  return context;
}

export { SignalRProvider, useSignalR };