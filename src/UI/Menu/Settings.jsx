import React, { Component } from 'react';
import { MenuBlock, SettingsBlock, SettingsTitle, SettingsParam, LeftButton, RightButton, Button} from './Elements';
import iconButton from '../../assets/images/arrow.svg';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { changeSize, changeTheme, changeColor } from '../../store/actions';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.buttonHandler = props.buttonHandler;
  }

  render() {
    const {color, nightmode} = this.props;
    const difficulty = this.props.size === 3 ? "hard" : this.props.size === 4 ? "normal" : "easy";
    return (
      <MenuBlock>
        <Link to='/'><Button>Back</Button></Link>
        <SettingsBlock>
          <SettingsTitle>Gamemode</SettingsTitle>
          <SettingsParam><Button onClick={(e) => console.log("NOT IMPLEMENTED")}>CLASSIC</Button></SettingsParam>
        </SettingsBlock>

        <SettingsBlock>
          <SettingsTitle>Difficulty</SettingsTitle>
          <SettingsParam>
            { this.props.size < 5 &&
              <LeftButton onClick={(e) => {this.props.changeSize(this.props.size+1)}}><img alt="Easier" src={iconButton}/></LeftButton>
            }
            {difficulty}
            { this.props.size > 3 &&
              <RightButton onClick={(e) => {this.props.changeSize(this.props.size-1)}}><img alt="More difficult" src={iconButton}/></RightButton>
            }
          </SettingsParam>
        </SettingsBlock>

        <SettingsBlock>
          <SettingsTitle>Colored</SettingsTitle>
          <SettingsParam><Button onClick={(e) => {localStorage.setItem("colors", !color); this.props.changeTheme(!color)}}>{color ? "OFF" : "ON"}</Button></SettingsParam>
        </SettingsBlock>

        <SettingsBlock>
          <SettingsTitle>NightMode</SettingsTitle>
          <SettingsParam><Button onClick={(e) => {localStorage.setItem("nightmode", !nightmode); this.props.changeColor(!nightmode)}}>{nightmode ? "OFF" : "ON"}</Button></SettingsParam>
        </SettingsBlock>
      </MenuBlock>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    size: state.size.value,
    nightmode: state.theme.value,
    color: state.color.value
  }
}

const mapDispatchToProps = {
  changeSize,
  changeTheme,
  changeColor
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
