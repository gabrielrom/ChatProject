import styled, { css } from 'styled-components';
import { lighten } from 'polished';

interface InputProps {
  hasIcon: boolean;
  backgroundColor?: string;
  height?: string;
  width?: string;
  colorText?: string;
  useMargin?: boolean;
  inputTextSize?: string;
}

export const Container = styled.div<InputProps>`
  display: flex;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : lighten(0.05, "#E6E6E6")};

  align-items: center;
  
  border: 1px;
  border-color: ${props => props.backgroundColor ? props.backgroundColor : "#fff"};;
  border-style: solid;
  border-radius: 10px;
  
  height: ${props => props.height ? props.height : "50px"};
  
  ${props => props.useMargin && css` margin-bottom: 15px `} ;
  ${props => props.width && css` width: ${props.width} `}

  padding: 5px 15px;

  input {
    border: none;
    background: transparent;

    color: ${props => props.colorText ? props.colorText : "#41414D"};
    font-size: ${props => props.inputTextSize ? props.inputTextSize : "16px"};
    font-weight: bold;
    padding-left: 5px;

    outline: none;
    width: 100%;
    height: ${props => props.height ? props.height : css` height: ${props.height} - 10px`};

    ::placeholder {
      font-size: 14px;
      color: #999999;
      font-weight: bold;
    }
  }

  ${props => props.hasIcon && css`
    input {
      padding-left: 14px;
      border-left: 1px solid #C5C5C5;
    }

    img {
      height: 26px;
      width: 26px;
      margin-right: 18px;
    }
  `}
`;