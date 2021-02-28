import React, { Component } from 'react';
import { MenuBlock, SettingsBlock, SettingsTitle, SettingsParam, LeftButton, RightButton, Button} from './Elements';
import iconButton from '../../assets/images/arrow.svg';
import {Link} from "react-router-dom";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.buttonHandler = props.buttonHandler;
  }

  render() {
    const {difficulty, colors, nightmode} = this.props.props;
    let leftButton, rightButton;
    switch (difficulty) {
      case "hard":
        leftButton = <LeftButton onClick={(e) => this.buttonHandler("normal")}><img src={iconButton} alt="Normal"/></LeftButton>;
        break;
      case "easy":
        rightButton = <RightButton onClick={(e) => this.buttonHandler("normal")}><img src={iconButton} alt="Easy"/></RightButton>
        break;
      default:
        leftButton = <LeftButton onClick={(e) => this.buttonHandler("easy")}><img src={iconButton} alt="Easy"/></LeftButton>;
        rightButton = <RightButton onClick={(e) => this.buttonHandler("hard")}><img src={iconButton} alt="Hard"/></RightButton>
        break;
    }
    return (
      <MenuBlock>
        <Link to='/'><Button>Back</Button></Link>
        <SettingsBlock>
          <SettingsTitle>Gamemode</SettingsTitle>
          <SettingsParam><Button onClick={(e) => this.buttonHandler("classic")}>CLASSIC</Button></SettingsParam>
        </SettingsBlock>

        <SettingsBlock>
          <SettingsTitle>Difficulty</SettingsTitle>
          <SettingsParam>
            {leftButton}{difficulty}{rightButton}
          </SettingsParam>
        </SettingsBlock>

        <SettingsBlock>
          <SettingsTitle>Colored</SettingsTitle>
          <SettingsParam><Button onClick={(e) => this.buttonHandler("colors")}>{colors}</Button></SettingsParam>
        </SettingsBlock>

        <SettingsBlock>
          <SettingsTitle>NightMode</SettingsTitle>
          <SettingsParam><Button onClick={(e) => this.buttonHandler("nightmode")}>{nightmode}</Button></SettingsParam>
        </SettingsBlock>
      </MenuBlock>
    )
  }
}
