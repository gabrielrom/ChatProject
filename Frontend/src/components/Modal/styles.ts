import { lighten } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 10000;
`;

export const ModalContent = styled.div`
  width: 470px;
  height: 450px;
  background-color: #fff;

  border-radius: 15px;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 20px 50px;

  .modal-title {
    margin: 0px;
    font-size: 24px;
    font-weight: bold;
  }

  .button-modal-close {
    cursor: pointer;

    display: flex;
    border: none;
    margin-top: 10px;
    height: 23px;
    width: 23px;
    background: none;

    align-self: center;
    justify-content: center;

    transition: transform 0.3s;

    &:hover {
      transform: translateY(-3px);
    }

    img {
      height: 16px;
      width: 16px;
    }
  }

`;

export const ModalBody = styled.div`
  padding: 20px 50px;
  margin-top: 14px;

  .image-dropzone {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80px;

    cursor: pointer;

    width: 80px;
    border: 2px dashed #4f5660;
    border-radius: 20%;
    
    margin: 0 auto;
    margin-bottom: 35px;

    p {
      font-size: 12px;
      font-weight: bold;
      margin-top: 4px;
    }
  }

  form {
    label {
      color: #4f5660;
      font-size: 13px;
      font-weight: bold;
    }

    input {
      padding-left: 2px;
    }
  }
`;

export const ButtonOptions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
  cursor: pointer;

  height: 66px;
  margin-bottom: 18px;
  
  background-color: ${lighten(0.06, "#E6E6E6")};

  border: 1px solid #06060714;
  border-radius: 8px;

  transition: background-color 280ms;
  transition: transform 280ms;

  &:hover {
    transform: translateX(4px);
    background-color: ${lighten(0.05, "#E6E6E6")};
  }

  .icon {
    width: 48px;
    height: 48px;
    margin-right: 8px;
  }

  .arrow {
    width: 20px;
    height: 20px;
    margin-left: auto;
  }

  p {
    max-width: 130px;
    font-size: 14px;
    font-weight: bold;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 20px 50px;

  margin-top: auto;

  p {
    font-weight: 500;
    cursor: pointer;
    color: #4f5660;

    &:hover {
      color: ${lighten(0.02, "#747f8d")};
    }
  }

  button {
    &:hover {
      background-color: ${lighten(0.02, "#006aff")};;
    }
  }

`;