import React, { useCallback, useRef } from 'react';
import { 
  Container, 
  Apresentation, 
  Image,
  Title,
  LoginField,
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

interface SignInCredentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(async (credentials: SignInCredentials) => {
    try {
      var result = await signIn({ 
        email: credentials.email,
        password: credentials.password
      });

      if (!result) {
        console.log("Deu Error!");
        return;
      }

      history.push("/chathub");
    } catch(err) {
      console.log(err);
    }
  }, [history, signIn]);

  return (
    <Container>
      <Apresentation> 
        <Image src={imageApresentation} alt="apresentation" />
      </Apresentation>

      <LoginField>
        <Title>Entrar</Title>
        
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormContainer>
            <Input name="email" icon={iconEmail} type="email" placeholder="Digite seu e-mail.." useMargin />
            <Input name="password" icon={iconPassword} type="password" placeholder="Digite sua senha.." useMargin />

            <Button type="submit" buttonColor="#0760E0" buttonHeight="64px">
              Login
            </Button>
          </FormContainer>
        </Form>

        <Navigation>
          <p>Não tem uma conta?</p>
          <Link to="/signup">Inscreva-se</Link>
        </Navigation>
      </LoginField>
    </Container>
  );
}

export default SignIn;