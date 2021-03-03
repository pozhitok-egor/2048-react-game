import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import styled from 'styled-components';
import Menu from './UI/Menu/Menu.jsx';
import Game from './UI/Game.jsx';
import Leaderboard from './UI/Leaderboard.jsx';
import './main.css';
import backgroundLight from './assets/images/bg-light.png';
import backgroundDark from './assets/images/bg-night.png';
import mainTheme from './assets/audio/main theme chill.mp3';
import Callback from './UI/Callback';
import axios from 'axios';
import { connect } from 'react-redux';
import { changeTheme, fetchUser, fetchLeaderboard } from './store/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      leaderboard: {
        easy: [],
        medium: [],
        hard: [],
      },
    };

    this.getAllData();

    this.buttonHandler = this.buttonHandler.bind(this);
    this.musicVolumeHandler = this.musicVolumeHandler.bind(this);
    this.soundVolumeHandler = this.soundVolumeHandler.bind(this);
    this.mainTheme = new Audio(mainTheme);
    this.mainTheme.loop = true;
  }

  getAllData() {
    const token = localStorage.getItem('token') || null;
    if (token) {
      this.props.fetchUser(token);
    }
    this.props.changeTheme(localStorage.getItem('nightmode') || false)
    this.props.fetchLeaderboard("easy");
  }

  musicVolumeHandler(volume) {
    this.setState({musicVolume: volume});
    this.mainTheme.volume = volume;
  }

  soundVolumeHandler(volume) {
    this.setState({soundVolume: volume});
    this.moveSound.volume = volume;
    this.saveAllData({...this.state, soundVolume: volume});
  }

  buttonHandler(param) {
    switch (param) {
      case "nightmode":
        this.saveAllData({...this.state, nightmode: !this.state.nightmode});
        this.setState({nightmode: !this.state.nightmode});
        break;
      case "colors":
        this.saveAllData({...this.state, colors: !this.state.colors});
        this.setState({colors: !this.state.colors});
        break;
      default:
        break;
    }
  }

  render() {
    if (this.props.music) {
      this.mainTheme.play();
    } else {
      this.mainTheme.pause();
    }
    this.mainTheme.volume = this.props.musicVolume;
    return (
      <Main nightmode={this.props.nightmode}>
        <BrowserRouter>
          <Route path='/callback' component={Callback}/>
          <Layout>
            <Switch>
              <Menu />
            </Switch>
            <Game userHandler={this.userHandler} userdata={this.state.user}/>
            <Leaderboard />
          </Layout>
        </BrowserRouter>
      </Main>
    )
  };
}

const Main = styled.div`
  display: flex;
  background: ${props => props.nightmode ? `url(${backgroundDark}), #3B3A35` : `url(${backgroundLight}), #FBF8F1`};
  min-height: 100%;
  color: ${props => props.nightmode ? '#EDE3DA' : '#7D7171'};
  justify-content: center;
  align-items: center;
  & img {
    filter: ${props => props.nightmode ? 'brightness(1.5)' : 'none'};
  }
  & a, & button {
    text-align: center;
    color: ${props => props.nightmode ? '#EDE3DA' : '#7D7171'};;
  }
  & input[type=range] {
    width: 100%;
    margin: 5px 0;
    background-color: transparent;
    -webkit-appearance: none;
    &:focus {
      outline: none;
    }
    &::-webkit-slider-runnable-track {
      background: ${props => props.nightmode ? '#EDE3DA' : '#7D7171'};
      border: 0.2px solid #010101;
      border-radius: 25px;
      width: 100%;
      height: 12px;
      cursor: pointer;
    }
    &::-webkit-slider-thumb {
      margin-top: -5.5px;
      width: 20px;
      height: 20px;
      background: ${props => props.nightmode ? '#7D7171' : '#EDE3DA'};
      border: 1px solid #000000;
      border-radius: 50px;
      cursor: pointer;
      -webkit-appearance: none;
    }
    &:focus::-webkit-slider-runnable-track {
      background: ${props => props.nightmode ? '#EDE3DA' : '#7D7171'};
    }
    &::-moz-range-track {
      background: ${props => props.nightmode ? '#EDE3DA' : '#7D7171'};
      border: 0.2px solid #010101;
      border-radius: 25px;
      width: 100%;
      height: 12px;
      cursor: pointer;
    }
    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: ${props => props.nightmode ? '#7D7171' : '#EDE3DA'};
      border: 1px solid #000000;
      border-radius: 50px;
      cursor: pointer;
    }
    &::-ms-track {
      background: transparent;
      border-color: transparent;
      border-width: 6px 0;
      color: transparent;
      width: 100%;
      height: 10px;
      cursor: pointer;
    }
    &::-ms-fill-lower {
      background: ${props => props.nightmode ? '#EDE3DA' : '#7D7171'};
      border: 0.2px solid #010101;
      border-radius: 50px;
    }
    &::-ms-fill-upper {
      background: ${props => props.nightmode ? '#EDE3DA' : '#7D7171'};
      border: 0.2px solid #010101;
      border-radius: 50px;
    }
    &::-ms-thumb {
      width: 20px;
      height: 20px;
      background: ${props => props.nightmode ? '#7D7171' : '#EDE3DA'};
      border: 1px solid #000000;
      border-radius: 50px;
      cursor: pointer;
      margin-top: 0px;
      /*Needed to keep the Edge thumb centred*/
    }
    &:focus::-ms-fill-lower {
      background: ${props => props.nightmode ? '#EDE3DA' : '#7D7171'};
    }
    &:focus::-ms-fill-upper {
      background: #c6baaf;
    }
  }
`

const Layout = styled.div`
  display: flex;
  @media (max-width: 940px) {
    flex-direction: column;
    align-items: center;
  }
`

const mapStateToProps = (state) => {
  return {
    nightmode: state.theme.value,
    music: state.music.value,
    musicVolume: state.music.volume,
  }
}

const mapDispatchToProps = {
  changeTheme,
  fetchUser,
  fetchLeaderboard
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
