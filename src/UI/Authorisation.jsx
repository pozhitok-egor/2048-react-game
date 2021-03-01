import React, { Component } from 'react'
import styled from 'styled-components';


export default class Authorisation extends Component {
  render() {
    const {userdata, signOutHandler, signInHandler, signUpHandler} = this.props;
    if (userdata) {
      return <Auth><Name>{userdata.username}</Name><Button onClick={() => signOutHandler()}>Sign Out</Button></Auth>;
    }
    return <Auth><Button onClick={() => signInHandler()}>Sign In</Button><Button onClick={() => signUpHandler()}>Sign Up</Button></Auth>;
  }
}

const Auth = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.p`
  margin: 0 10px 0;
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #7D7171;
  border-radius: 10px;
  font-family: 'Lato',sans-serif;
  text-transform: uppercase;
  font-size: 18px;
  background-color: transparent;
  &:hover {
    background-color: #BBADA0;
    color: #EDE3DA;
  }
`;
