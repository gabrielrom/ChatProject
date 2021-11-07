import { Form } from "@unform/web";
import React, { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';

import { 
  Container, 
  ModalBody,
  ModalContent, 
  ModalHeader, 
  ButtonOptions, 
  ModalFooter
} from "./styles";
import Button from "../Button";
import Input from "../Input";

import closeIcon from '../../assets/close-icon.png';
import iconArrow from '../../assets/icon-arrow.svg';
import iconButtonOptions from '../../assets/icon-button-option.svg';
import iconButtonOptionsJoin from '../../assets/icon-button-options-join.svg';
import imageIcon from '../../assets/image-icon.png';

interface IProps {
  show: boolean;
  onClose(): void;
}

const Modal: React.FC<IProps> = (props) => {
  const [modal, setModal] = useState("default-modal");

  const onDrop = useCallback((file) => {

    console.log(file)

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/jpeg, image/png" , maxFiles: 1});

  if (!props.show) {
    return null;
  }

  return (
    <Container>
      <ModalContent>
        {modal === "default-modal" && 
          <>
            <ModalHeader>
              <h4 className="modal-title">Crie ou entre <br /> em um servidor!</h4>
              <button className="button-modal-close" onClick={props.onClose}>
                <img src={closeIcon} alt="icon close"/>
              </button>
            </ModalHeader>

            <ModalBody>

              <ButtonOptions onClick={() => setModal("create-channel-modal")}>
                <img src={iconButtonOptions} alt="icon options" className="icon"/>
                <p>Criar um canal</p>
                <img src={iconArrow} alt="icon arrow" className="arrow"/>
              </ButtonOptions>

              <ButtonOptions onClick={() => setModal("join-channel-modal")}>
                <img src={iconButtonOptionsJoin} alt="icon options" className="icon"/>
                <p>Entrar em um canal</p>
                <img src={iconArrow} alt="icon arrow" className="arrow"/>
              </ButtonOptions>
              
            </ModalBody>
          </>
        }

        {modal === "create-channel-modal" && 
          <>
            <ModalHeader>
              <h4 className="modal-title">Criar um novo<br/> grupo!</h4>
              <button className="button-modal-close" onClick={() => { setModal("default-modal"); props.onClose(); }}>
                <img src={closeIcon} alt="icon close"/>
              </button>
            </ModalHeader>

            <ModalBody>

              <div className="image-dropzone" {...getRootProps()}>
                <input {...getInputProps()}/>
                
                <img src={imageIcon} alt="icon dropzone" />
                <p>UPLOAD</p>
              </div>

              <Form onSubmit={() => {}}>
                <label>NOME DO GRUPO</label>
                <Input name="groupName" placeholder="Digite o nome do grupo.." />
              </Form>
            </ModalBody>
            
            <ModalFooter>
              <p onClick={() => setModal("default-modal")}>Voltar</p>
              <Button 
                buttonHeight="40px" 
                buttonWidth="130px"
                buttonColor="#006aff" 
                textSize="14px"
              >
                Criar
              </Button>
            </ModalFooter>
            
          </>
        }

        {modal === "join-channel-modal" && 
          <>
            <ModalHeader>
              <h4 className="modal-title">Entrar em um <br /> grupo!</h4>
              <button className="button-modal-close" onClick={() => { setModal("default-modal"); props.onClose(); }}>
                <img src={closeIcon} alt="icon close"/>
              </button>
            </ModalHeader>

            <ModalBody>

              <Form onSubmit={() => {}}>
                <label>NOME DO GRUPO</label>
                <Input name="groupName" placeholder="Digite o nome do grupo.." />
              </Form>
              
            </ModalBody>

            <ModalFooter>
              <p onClick={() => setModal("default-modal")}>Voltar</p>
              <Button 
                buttonHeight="40px" 
                buttonWidth="130px"
                buttonColor="#006aff" 
                textSize="14px"
              >
                Entrar
              </Button>
            </ModalFooter>
          </>
        }

      </ModalContent>
    </Container>

  )

}

export default Modal;