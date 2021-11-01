import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: string;
  iconAlt?: string;
  backgroundColor?: string;
  height?: string;
  width?: string;
  colorText?: string;
  useMargin?: boolean;
  inputTextSize?: string;
}

const Input: React.FC<InputProps> = ({ 
  name, 
  icon, 
  iconAlt, 
  backgroundColor, 
  inputTextSize, 
  colorText, 
  height, 
  width, 
  useMargin, 
  ...props 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <Container 
      hasIcon={!!icon} 
      inputTextSize={inputTextSize} 
      backgroundColor={backgroundColor} 
      width={width}
      height={height}
      colorText={colorText}
      useMargin={!!useMargin}
    >
      {icon && <img src={icon} alt={iconAlt} />}
      <input ref={inputRef} {...props}/>
    </Container>
  );
}

export default Input;