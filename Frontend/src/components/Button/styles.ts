import styled, { css } from 'styled-components';

interface ButtonProps {
  buttonBackgroundColor: string;
  buttonWidth?: string;
  buttonHeight: string;
  textSize?: string;
};

export const Container = styled.button<ButtonProps>`
  color: #fff;
  font-size: ${props => props.textSize ? props.textSize : "18px" };
  font-weight: bold;
  letter-spacing: 2px;

  cursor: pointer;

  border: 1px;
  border-color: ${props => props.buttonBackgroundColor};
  border-style: solid;
  border-radius: 10px;

  background-color: ${props => props.buttonBackgroundColor};

  height: ${props => props.buttonHeight};

  ${props => props.buttonWidth && css` 
    width: ${props.buttonWidth} 
  `}
`;