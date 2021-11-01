import { shade } from 'polished';
import styled from 'styled-components';

// CL - channel list
// CI - channel info
// CD - channel data
// CS - channel sender

interface ChannelButtonProps {
  image: string;
  isSelected?: boolean;
}

export const Container = styled.div` 
  display: grid;

  grid-template-columns: 106px auto;
  grid-template-rows: 92px auto 92px;

  grid-template-areas: 
    'CL CI'
    'CL CD'
    'CL CS';


  height: 100vh;
`;

export const ChannelList = styled.div`
  grid-area: CL;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 28px 20px;

  background-color: #20222E;
  
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Channel = styled.button<ChannelButtonProps>`
  height: 55px;
  width: 55px;
  cursor: pointer;
  flex-shrink: 0;

  border: none;
  border-radius: 10px;
  
  background-image: url(${props => props.image});
  background-position: center;
  background-size: contain;

  transition: transform 280ms;
  margin-bottom: 20px;

  :hover {
    transform: translateX(3px);
  }
`;

export const ChannelButton = styled.button<ChannelButtonProps>`
  height: 55px;
  width: 55px;
  cursor: pointer;
  flex-shrink: 0;

  border: 2px dashed #fff;
  border-radius: 10px;
  background: transparent;
  
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  
  transition: transform 280ms;

  :hover {
    transform: translateX(3px);
  }

`;

export const InputWrapper = styled.div`
  grid-area: CS;
  
  padding: 20px 145px;
  background-color: #12141D;

  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    div {
      width: 100%;
    }

    button {
      margin-left: 10px;
      
      transition: background-color 280ms;

      :hover {
        background-color: ${shade(0.1, "#0760E0")};
      }
    }
  }
`;

export const InitialChannelHub = styled.div`
  grid-area: CD;
  background-color: #12141D;
`;

export const InitialChannelInfo = styled.div`
  grid-area: CI;
  background-color: #12141D;
`;

export const InitialInputWrapper = styled.div`
  grid-area: CS;
  background-color: #12141D;
`;
