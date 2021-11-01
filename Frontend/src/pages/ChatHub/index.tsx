import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { 
  Container,
  ChannelList,
  Channel,
  // ChannelInfo,
  // ChannelData,
  ChannelButton,
  // ChannelInfoName,
  // ChannelInfoMembers,
  // Message,
  // MyMessage,
  InitialChannelHub, 
  InitialChannelInfo,
  InputWrapper,
  InitialInputWrapper
 } from './styles';

import { useAuth } from '../../hooks/auth';
import { useSignalR } from '../../hooks/signalRHub';
import api from '../../services/api';

import ChannelHub from '../../components/ChannelHub';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { ChannnelsData, MessageData  } from '../../interfaces';

import imageChannel from '../../assets/image-channel.png';
import iconButtonChannel from '../../assets/icon-channel-button.png';

const ChatHub: React.FC = () => {
  const messagesRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { connection, connect, messages } = useSignalR();
  
  const [ channels, setChannels ] = useState([] as ChannnelsData[]);
  const { user, signOut } = useAuth();

  const [ channelActive, setChannelActive ] = useState("InitialChannelHub");

  useEffect(() => {
    const div = messagesRef.current;

    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  }, [messagesRef]);

  useEffect(() => {
    api.get("/channels", {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }).then(value => setChannels([...value.data.data]));

  }, [user.token]);

  useEffect(() => {
    connect().then().catch(err => console.error(err));
  }, [connect]);

  const sendMessageHandle = useCallback(async (message: MessageData) => {
    const response = await api.post(`channels/${channelActive}/sendmessages`, {
      userId: user.userId,
      message: message.sendMessage,
      sendDate: Date.now().toString(),
    }, {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });

    if (response.status !== 200) {
      console.log("Ocorreu um error!");
    }
  }, [channelActive, user.token, user.userId]);

  return (
    <Container>
      
      <ChannelList>

        {channels.map(channel => {
          return <Channel key={channel.id} type="button" image={channel.imageUrl} onClick={() => { 
            connection.invoke("JoinToGroup", channel.id).then().catch(err => console.log(err));
            setChannelActive(channel.id)
          }} />
        })}
        
        <Channel type="button" image={imageChannel} onClick={signOut}/>

        <ChannelButton type="button" image={iconButtonChannel}/>

      </ChannelList>

        {
          channelActive === "InitialChannelHub"
          &&
          <>
            <InitialChannelHub />
            <InitialChannelInfo />
            <InitialInputWrapper />
          </>
        }

        {
          channels.map(channel => 
            channelActive === channel.id 
            &&
            <>
              <ChannelHub 
                key={channel.name}
                channelName={channel.name}
                channelCountMembers={channel.countMembers}
                channelImage={channel.imageUrl}
                imageMembers={channel.users}
                messages={messages.filter((message, index) => message.channelName === channel.name && messages.indexOf(message) === index)}
              />

              <InputWrapper key={Math.random()}>
                <Form onSubmit={sendMessageHandle}>
                  <Input
                    name="sendMessage"
                    inputTextSize="14px"
                    height="35px"
                    backgroundColor="#20222E"
                    colorText="#d4d4d4"
                    placeholder="Digite sua mensagem aqui..."
                  />
                  <Button 
                    type="submit"
                    buttonColor="#0760E0"
                    buttonHeight="45px"
                    buttonWidth="113px"
                    textSize="14px">Enviar</Button>
                </Form>
              </InputWrapper>
            </>
          )
        }
    </Container>
  );
}

export default ChatHub;