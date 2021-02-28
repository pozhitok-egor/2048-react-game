import React, { Component } from 'react';
import { MenuBlock, Button} from './Elements';
import { Link } from "react-router-dom";

export default class Main extends Component {
  render() {
    return (
      <MenuBlock>
          <Button onClick={(e) => this.props.buttonHandler("new game")}>New Game</Button>
          <Link to='/settings'><Button>Settings</Button></Link>
          <Link to='/sound'><Button>Sound</Button></Link>
      </MenuBlock>
    )
  }
}
