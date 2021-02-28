import React, { Component } from 'react'
import styled from 'styled-components';
import Settings from './Settings';
import Sound from './Sound';
import Main from './Main';
import {Route} from "react-router-dom";

class Menu extends Component{
  constructor(props) {
    super(props);
    this.buttonHandler = props.buttonHandler;
    this.state = {
      menu: "main",
    }
    this.menuHandler = this.menuHandler.bind(this);
  }

  menuHandler(element) {
    this.setState({menu: element});
  }

  render() {
    return (
      <LeftBlock>
        <GameTitle>
          <Title>2048</Title>
          <Description>Join the numbers and get to the <b>2048 tile</b>!</Description>
        </GameTitle>
        <Route path='/settings' render={() => <Settings props={this.props} buttonHandler={this.buttonHandler}/>} />
        <Route path='/sound' render={() => <Sound props={this.props} buttonHandler={this.buttonHandler}/>} />
        <Route exact path='/' render={() => <Main props={this.props} buttonHandler={this.buttonHandler}/>}/>
      </LeftBlock>
    )
  }
}

export default Menu;

const LeftBlock = styled.div`
  font-family: 'Lato', sans-serif;
  margin-right: 20px;
  width: min-content;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const GameTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 72px;
  font-weight: bold;
`;

const Description = styled.p`
  margin: 0;
  font-size: 16px;
`;
