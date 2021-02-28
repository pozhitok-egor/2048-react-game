import React, { Component } from 'react';
import { MenuBlock, SettingsBlock, SettingsTitle, SettingsParam, Button} from './Elements';
import {Link} from "react-router-dom";

export default class Sound extends Component {
  constructor(props) {
    super(props);
    this.buttonHandler = props.buttonHandler;
  }

  render() {
    const {musicHandler, soundHandler, music, sound} = this.props.props;
    return (
      <MenuBlock>
        <Link to='/'><Button>Back</Button></Link>
        <SettingsBlock>
          <SettingsTitle>Music</SettingsTitle>
          <SettingsParam>
            <Button onClick={(e) => this.buttonHandler("music")}>{music}</Button>
          </SettingsParam>
          <SettingsTitle>Volume</SettingsTitle>
          <SettingsParam>
            <input onChange={(e) => musicHandler(e.target.value/10)}type="range" min="0" max="10" />
          </SettingsParam>
        </SettingsBlock>
        <SettingsBlock>
          <SettingsTitle>Sound</SettingsTitle>
          <SettingsParam>
            <Button onClick={(e) => this.buttonHandler("sound")}>{sound}</Button>
          </SettingsParam>
          <SettingsTitle>Volume</SettingsTitle>
          <SettingsParam>
            <input onChange={(e) => soundHandler(e.target.value/10)}type="range" min="0" max="10" />
          </SettingsParam>
        </SettingsBlock>
      </MenuBlock>
    )
  }
}
