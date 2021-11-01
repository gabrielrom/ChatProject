import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/auth';
import { ResponseMessage, UserResponse } from '../../interfaces';

import { 
  ChannelInfo,
  ChannelInfoName,
  ChannelInfoMembers,
  ChannelData,
  Message,
  MyMessage
} from './styles';

interface DataProps {
  channelName: string;
  channelCountMembers: number;
  channelImage: string;
  imageMembers: UserResponse[];
  messages: ResponseMessage[];
}

const ChannelHub: React.FC<DataProps> = ({channelName, channelCountMembers,messages, channelImage, imageMembers, ...props }) => {
  const messagesRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { user } = useAuth();

  useEffect(() => {
    const div = messagesRef.current;

    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  }, []);

  return (
    <>
      <ChannelInfo {...props}>
          <ChannelInfoName>
            <img src={channelImage} alt="channel logo" />

            <div>
              <h1>{channelName}</h1>
              <p>{channelCountMembers} members</p>
            </div>
            
          </ChannelInfoName>

          <ChannelInfoMembers>

            {
              imageMembers.map((user, index) => 
                index <= 3 &&
                <span key={user.id}>
                  <img src={user.avatarUrl} alt="avatars" />
                </span>
              )
            }

            { 
              channelCountMembers > 3 &&
              <div>
                <p>+{channelCountMembers - 3}</p>
              </div>
            }
            
          </ChannelInfoMembers>
        </ChannelInfo>

        <ChannelData ref={messagesRef} className="channel-hub">
          {
            messages.map(message => {
              return message.userId === user.userId ? (
                <MyMessage>
                  <div className="message-box">
                    <div className="message-info">
                      <span>{message.sendDate}</span>
                      <p>{message.userName}</p>
                    </div>

                    <p>{message.message}</p>
                  </div>

                  <img src={message.userAvatar} alt=""/>
                </MyMessage>
              ) : (
              <Message>
                <img src={message.userAvatar} alt=""/>

                <div className="message-box">
                  <div className="message-info">
                    <p>{message.userName}</p>
                    <span>{message.sendDate}</span>
                  </div>
                  <p>{message.message}</p>
                </div>
              </Message>
              )
            }) 
          }
        </ChannelData>
    </>
  )
}

export default ChannelHub;