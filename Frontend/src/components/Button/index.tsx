import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonColor: string;
  buttonWidth?: string;
  buttonHeight: string;
  textSize?: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Container  
      buttonBackgroundColor={props.buttonColor}
      {...props}
    >
      {children}
    </Container>
  ); 
}

export default Button;