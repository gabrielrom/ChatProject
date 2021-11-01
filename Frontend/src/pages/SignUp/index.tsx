import React, { useCallback, useRef } from 'react';
import { 
  Container, 
  Apresentation, 
  Image,
  Title,
  RegisterField,
  FormContainer,
  Navigation
} from './styles';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';
import Input from '../../components/Input';

import imageApresentation from '../../assets/image-apresentation.png';
import iconEmail from '../../assets/icon-email.png';
import iconPassword from '../../assets/icon-password.png';
import iconUser from '../../assets/icon-user.png';

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { signUp } = useAuth();

  const handleSubmit = useCallback(async (credentials: SignUpCredentials) => {
    try {
      var result = await signUp({ 
        name: credentials.name, 
        email: credentials.email, 
        password: credentials.password 
      });
  
      if (!result) {
        console.log("Deu error!");
        return;
      }
  
      history.push("/");
    } catch(err) {
      console.log(err);
    }
  }, [signUp, history]);

  return (
    <Container>
      <Apresentation> 
        <Image src={imageApresentation} alt="apresentation" />
      </Apresentation>

      <RegisterField>
        <Title>Cadastre-se</Title>
        
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormContainer>
            <Input name="name" icon={iconUser} type="text" placeholder="Digite seu nome.." useMargin />
            <Input name="email" icon={iconEmail} type="email" placeholder="Digite seu e-mail.." useMargin />
            <Input name="password" icon={iconPassword} type="password" placeholder="Digite sua senha.." useMargin />

            <Button type="submit" buttonColor="#0760E0" buttonHeight="64px">
              Cadastrar
            </Button>
          </FormContainer>
        </Form>
        
        <Navigation>
          <p>Já tem uma conta?</p>
          <Link to="/">Entre</Link>
        </Navigation>
      </RegisterField>
    </Container>
  );
}

export default SignUp;