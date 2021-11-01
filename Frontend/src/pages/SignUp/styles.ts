import styled, { keyframes } from 'styled-components';
import { shade  } from 'polished';

export const Container = styled.div`
  display: flex;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Apresentation = styled.div`
  flex: 2;
  
  animation: ${appearFromLeft} 1s;

  h1 {
    color: #fff;
    font-size: 48px;
    font-weight: bold;
    letter-spacing: 3px;
  }

  p {
    color: #fff;
    font-size: 18px;
    letter-spacing: 3px;

    max-width: 380px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  height: 100vh;
  
  background-color: #20222E;
`;

export const Image = styled.img`
  @media only screen and (max-width: 1050px) {

    width: 500px; 
    height: auto;

  } 

  @media only screen and (min-width: 1400px) {

    width: 900px; 
    height: auto;

  }

  @media only screen and (min-width: 2520px) {
    width: 1020px; 
    height: auto;
  }
 
  margin-top: 12vh;
`;

export const Title = styled.p`
  font-size: 36px;
  font-weight: bold;
  font-family: sans-serif;
  color: #000;

  @media only screen and (max-height: 696px) {
    margin-top: 22vh;
  }

  margin-top: 23vh;
  margin-bottom: 26px;
`;

const appearFromRight = keyframes`

  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }

`;

export const RegisterField = styled.div`
  flex: 1.1;

  animation: ${appearFromRight} 1s;

  max-width: 529px;

  margin: 0 50px;
  padding: 0;

  @media only screen and (min-width: 1400px) {
    max-width: 700px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  button {
    margin-top: 12px;

    transition: transform 280ms;

    :hover {
      background-color: ${shade(0.1, "#0760E0")};
      transform: translateY(-4px);
    }
  }
`;

export const Navigation = styled.div`
  display:flex;
  flex-direction: row;

  justify-content: center;
  
  @media only screen and (max-height: 696px) {
    margin-top: 15vh;
  }

  margin-top: 34vh;

  p {
    color: #41414D; 
    font-size: 18px;
    letter-spacing: 1px;
    margin-right: 6px;
  }

  a {
    font-size: 18px;
    font-weight: bold;
    color: #0760E0;

    :hover {
      color: ${shade(0.2, "#0760E0")}
    }
  }

`;
