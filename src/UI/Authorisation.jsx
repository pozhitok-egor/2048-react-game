import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { signOut } from '../store/actions';


class Authorisation extends Component {
  render() {
    const {userdata, signInHandler, signUpHandler} = this.props;
    if (userdata) {
      return <Auth><Name>{userdata.username}</Name><Button onClick={() => { localStorage.removeItem("token"); this.props.signOut()}}>Sign Out</Button></Auth>;
    }
    return <Auth><Button onClick={() => signInHandler()}>Sign In</Button><Button onClick={() => signUpHandler()}>Sign Up</Button></Auth>;
  }
}

const Auth = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.p`
  margin: 0;
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  padding: 5px 10px;
  margin-left: 10px;
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

const mapStateToProps = (state) => {
  return {
    userdata: state.user
  }
}

const mapDispatchToProps = {
  signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorisation)
