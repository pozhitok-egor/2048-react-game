import React, { Component } from 'react';
import { MenuBlock, SettingsBlock, SettingsTitle, SettingsParam, Button} from './Elements';
import { changeMusic, setMusicVolume, changeSound, setSoundVolume } from '../../store/actions';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
class Sound extends Component {
  constructor(props) {
    super(props);
    this.buttonHandler = props.buttonHandler;
  }

  render() {
    const {music, sound} = this.props;
    return (
      <MenuBlock>
        <Link to='/'><Button>Back</Button></Link>
        <SettingsBlock>
          <SettingsTitle>Music</SettingsTitle>
          <SettingsParam>
            <Button onClick={(e) => {localStorage.setItem('music', !music); this.props.changeMusic(!music)} }>{music ? "OFF" : "ON"}</Button>
          </SettingsParam>
          <SettingsTitle>Volume</SettingsTitle>
          <SettingsParam>
            <input onChange={(e) => this.props.setMusicVolume(e.target.value/10)} type="range" min="0" max="10"/>
          </SettingsParam>
        </SettingsBlock>
        <SettingsBlock>
          <SettingsTitle>Sound</SettingsTitle>
          <SettingsParam>
            <Button onClick={(e) => {localStorage.setItem('sound', !sound); this.props.changeSound(!sound)}}>{sound ? "OFF" : "ON"}</Button>
          </SettingsParam>
          <SettingsTitle>Volume</SettingsTitle>
          <SettingsParam>
            <input onChange={(e) => this.props.setSoundVolume(e.target.value/10)} type="range" min="0" max="10"/>
          </SettingsParam>
        </SettingsBlock>
      </MenuBlock>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    music: state.music.value,
    sound: state.sound.value,
    musicVolume: state.music.volume,
    soundVolume: state.sound.volume
  }
}
const mapDispatchToProps = {
  changeMusic,
  setMusicVolume,
  changeSound,
  setSoundVolume
}

export default connect(mapStateToProps, mapDispatchToProps)(Sound);
