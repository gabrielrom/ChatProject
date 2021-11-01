import styled from 'styled-components';

export const ChannelInfo = styled.div`
  grid-area: CI;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background-color: #12141D;
  z-index: 2;
  
  border-bottom: 2px solid #10121B;

  padding: 21px 130px;
`;

export const ChannelInfoName= styled.div`
  display: flex;

  align-items: center;

  img {
    height: 50px;
    width: 50px;
    border-radius: 10px;
    margin-right: 15px;
  }

  h1 {
    margin: 0 0 4px 0;

    color: #fff;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  p {
    color: #BBBBBB;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 12px;
    font-weight: bold;
  }
`;

export const ChannelInfoMembers = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  span {
    height: 40px;
    width: 40px;

    cursor: pointer;

    margin-right: -20px;
  }

  img {
    height: 40px;
    width: 40px;
    border-radius: 10px;

    transition: transform 280ms;

    :hover {
      transform: translateY(-8px);
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
    p {
      background-color: #20222E;
      border: 1px solid #20222E;
      border-radius: 10px;
      padding: 8px 8px;
      margin-right: -80px;
      color: #BBBBBB;
      font-size: 10px;
      font-weight: bold;
    }
  }
`;

export const ChannelData = styled.div`
  grid-area: CD;

  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #2A2A2D;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: #20222E;
  }

  padding: 15px 145px;

  background-color: #12141D;

  > div {
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;

export const Message = styled.div`
  display: flex;
  flex-direction: row;

  img {
    height: 46px;
    width: 46px;
    border-radius: 50%;
  }

  .message-box {
    display: flex;
    flex-direction: column;

    margin-top: 6px;
    margin-left: 12px;
    max-width: 60vh;

    & > p {
      color: #D3D3D3;
      font-size: 12px;
      font-weight: bold;
      
      background-color: #20222E;
      padding: 14px 14px;
      margin-top: 12px;
      word-break: break-all;

      border-radius: 10px;
      border-top-left-radius: 0;
    }
  }

  .message-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    
    p {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      margin-right: 10px;
    }

    span {
      padding-top: 2px;
      color: #999999;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 2px;
    }
  }
`;

export const MyMessage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;

  img {
    height: 46px;
    width: 46px;
    border-radius: 50%;
  }

  .message-box {
    display: flex;
    flex-direction: column;

    margin-top: 6px;
    margin-right: 12px;
    max-width: 60vh;

    & > p {
      color: #D3D3D3;
      font-size: 12px;
      font-weight: bold;
      
      background-color: #20222E;
      padding: 14px 14px;
      margin-top: 12px;
      word-break: break-all;
      
      border-radius: 10px;
      border-top-right-radius: 0;
    }
  }

  .message-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    
    p {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      margin-left: 10px;
    }

    span {
      padding-top: 2px;
      color: #999999;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 2px;
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
