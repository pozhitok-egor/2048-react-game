import styled from 'styled-components';
import ReactModal from 'react-modal';
import React, { useState } from 'react';
import github from '../assets/images/github.svg';

function isFunction(fn) {
  return fn && {}.toString.call(fn) === '[object Function]';
 }

const ModalWindow = ({exitHandler, modaldata}) => {
  const {exit, error, type, icon, title, description, inputId, firstButton, secondButton, submit} = modaldata;

  const [username, handleUsername] = useState();
  const [password, handlePassword] = useState();
  const [confirm, handleConfirm] = useState();

  return (
    <ReactModal appElement={document.getElementById('root')} isOpen={true} style={ModalStyles}>
      {exit && <Exit type="button" onClick={(e) => exitHandler()}>✖</Exit>}
      {icon && <ModalIcon src={icon} alt='icon'></ModalIcon>}
      {title && <ModalTitle type={type}>{title}</ModalTitle>}
      {description && <ModalDescription type={type}>{description}</ModalDescription>}
      { ((type === "login" || type === "register" || type === 'input') &&
        <form onSubmit={(e) => submit(e, {username, password, confirm})}>
          { type === 'input' &&
            <ModalInput type="text" id={inputId}></ModalInput>
          }
          { (type === "login" || type === "register") &&
            <InputLabel>
              <Label htmlFor="username">Username</Label>
              <ModalInput id="username" name="username" required onChange={(e) => handleUsername(e.target.value)} type="text"></ModalInput>
            </InputLabel>
          }
          { (type === "login" || type === "register") &&
            <InputLabel>
              <Label htmlFor="password">Password</Label>
              <ModalInput id="password" name="password" required onChange={(e) => handlePassword(e.target.value)} type="password"></ModalInput>
            </InputLabel>
          }
          { type === "register" &&
            <InputLabel>
              <Label htmlFor="password_confirm">Confirm password</Label>
              <ModalInput id="password_confirm" name="password" required onChange={(e) => handleConfirm(e.target.value)} type="password"></ModalInput>
            </InputLabel>
          }
          { error &&
            <Error>{error}</Error>
          }
          { (type === "login" || type === "register") &&
            <Social>
              or login with social account
              <a href="https://github.com/login/oauth/authorize?client_id=70e40fe40ada41351efa"><SocialIcon src={github} alt="github" style={{filter: "brightness(0)"}}/></a>
            </Social>
          }
          <Buttons>
            {
              <ModalButton type="submit">{firstButton.text}</ModalButton>
            }
            {
            secondButton.text &&
              <ModalButton type="button" onClick={(e) => secondButton.handler()}>{secondButton.text}</ModalButton>
            }
          </Buttons>
        </form> )
      ||
      <Buttons>
        { firstButton.text &&
          <ModalButton type="button" onClick={(e) => isFunction(firstButton.handler) ? firstButton.handler() : false}>{firstButton.text}</ModalButton>
        }
        {
        secondButton.text &&
          <ModalButton type="button" onClick={(e) => secondButton.handler()}>{secondButton.text}</ModalButton>
        }
      </Buttons>
      }
    </ReactModal>
  )
}

export default ModalWindow;

const Exit = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: -1px;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  outline: none;
  font-size: 18px;
  border: 1px solid #7D7171;
  border-radius: 20px;
  color: #7D7171;
  background-color: transparent;
  &:hover {
    background-color: #BBADA0;
    color: #EDE3DA;
  }
`;

const Error = styled.p`
  max-width: 210px;
  color: #DB7A7A;
  text-align: center;
`;

const ModalIcon = styled.img`
  width: 200px;
`;

const ModalTitle = styled.h2`
  color: ${({type}) => type === "error" ? "#DB7A7A" : "#7D7171"};
  margin: 20px;
`;

const ModalDescription = styled.p`
  color: ${({type}) => type === "error" ? "#DB7A7A" : "#7D7171"};
  margin: 0 0 20px;
`;

const ModalInput = styled.input`
font-family: 'Lato',sans-serif;
outline: none;
border: 1px solid #7D7171;
border-radius: 10px;
padding: 5px 10px;
$:invalid {
  border: 1px solid #DB7A7A;
}
&::placeholder {
  text-weight: bold;
}
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const ModalButton = styled.button`
  outline: none;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #7D7171;
  border-radius: 10px;
  font-family: 'Lato',sans-serif;
  text-transform: uppercase;
  font-size: 16px;
  color: #7D7171;
  background-color: transparent;
  &:hover {
    background-color: #BBADA0;
    color: #EDE3DA;
  }
`;

const InputLabel = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const Label = styled.label`
  margin-top: 20px;
  margin-bottom: 5px;
`;

const Social = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  margin-top: 20px;
`;

const SocialIcon = styled.img`
  width: 30px;
  margin: 10px;
`;

const ModalStyles = { overlay: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(125, 113, 113, .7)"
}, content: {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: "20px 50px",
  position: "relative",
  width: "max-content",
  background: "#FBF8F1",
  borderRadius: "20px",
  color: "#7D7171"
} };