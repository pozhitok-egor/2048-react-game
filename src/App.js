import { checkGameOver, isChanged, initCells, moveCells, directions, removeAndIncreaseCells, populateField } from './Controller/Control';
import {ModalIcon, ModalTitle, ModalDescription, ModalInput, ModalButton} from './UI/ModalWindow';
import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import styled from 'styled-components';
import Menu from './UI/Menu/Menu.js';
import Game from './UI/Game.js';
import Leaderboard from './UI/Leaderboard.js';
import './main.css';
import backgroundLight from './assets/images/bg-light.png';
import backgroundDark from './assets/images/bg-night.png';
import mainTheme from './assets/audio/main theme chill.mp3';
import moveSound from './assets/audio/move.wav';
import ReactModal from 'react-modal';
import cryptojs from 'crypto-js';
import Callback from './UI/Callback';
import axios from 'axios';

var keyPressAllow = true;
const secret = 'secret';

class App extends Component {
  constructor(props) {
    super(props);
    const state = this.getAllData();

    this.state = state ? state : {
      cells: initCells(4),
      score: 0,
      size: 4,
      user: null,
      leaderboard: {
        easy: [],
        medium: [],
        hard: [],
      },
      bestScore: Number(localStorage.getItem('bestScore')) || 0,
      colors: localStorage.getItem('colors') ? localStorage.getItem('colors') === 'true' : true,
      nightmode: localStorage.getItem('nightmode') ? localStorage.getItem('nightmode') === 'true' : false,
      music: localStorage.getItem('music') ? localStorage.getItem('music') === 'true' : true,
      sound: localStorage.getItem('sound') ? localStorage.getItem('sound') === 'true' : true,
      musicVolume: Number(localStorage.getItem('soundVolume')) || 1,
      soundVolume: Number(localStorage.getItem('soundVolume')) || 1
    };

    this.saveAllData = this.saveAllData.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
    this.musicVolumeHandler = this.musicVolumeHandler.bind(this);
    this.soundVolumeHandler = this.soundVolumeHandler.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.signInHandler = this.signInHandler.bind(this);
    this.signUpHandler = this.signUpHandler.bind(this);
    this.mainTheme = new Audio(mainTheme);
    this.mainTheme.loop = true;

    if (this.state.music) {
      this.mainTheme.play();
    }
    this.moveSound = new Audio(moveSound);
  }

  signOutHandler(e) {
    // TODO: signOutHandler
    console.log(`signOutHandler ${e}`);
  }

  signInHandler(e) {
    // TODO: signInHandler
    console.log(`signInHandler ${e}`);
  }

  signUpHandler(e) {
    // TODO: signUpHandler
    console.log(`signUpHandler ${e}`);
  }


  getAllData() {
    const token = localStorage.getItem('token') || null;
    if (token) {
      axios.get('https://twenty-forty-eight.herokuapp.com/user',{
      headers: {
        authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
      }).then((res) => {
        this.setState({user: res.data.user});
      }).catch((err) => {
        console.error(err);
      })
    }
    const bestScore = localStorage.getItem("bestScore") ||  0;
    const colors = localStorage.getItem("colors") ? localStorage.getItem("colors") === "true" : true;
    const nightmode = localStorage.getItem("nightmode") ? localStorage.getItem("nightmode") === "true" : false;
    const music = localStorage.getItem("music") ? localStorage.getItem("music") === "true" : true;
    const sound = localStorage.getItem("sound") ? localStorage.getItem("sound") === "true" : true;
    const musicVolume = localStorage.getItem("musicVolume") || .5;
    const soundVolume = localStorage.getItem("soundVolume") || .5;

    const mainSettings = localStorage.getItem("s") ? JSON.parse(cryptojs.AES.decrypt(localStorage.getItem("s"), secret).toString(cryptojs.enc.Utf8))
    : {
      cells: initCells(4),
      score: 0,
      size: 4,
    };
    return {
      bestScore,
      colors,
      nightmode,
      music,
      sound,
      musicVolume,
      soundVolume,
      ...mainSettings
    }
  }

  saveAllData(state) {
    const cells = state.cells;
    const score = state.score;
    const size = state.size;
    localStorage.setItem("s", cryptojs.AES.encrypt(JSON.stringify({cells, score, size}), secret).toString());
    localStorage.setItem("bestScore", state.bestScore);
    localStorage.setItem("colors", state.colors);
    localStorage.setItem("nightmode", state.nightmode);
    localStorage.setItem("music", state.music);
    localStorage.setItem("sound", state.sound);
    localStorage.setItem("musicVolume", state.musicVolume);
    localStorage.setItem("soundVolume", state.soundVolume);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress)
  }

  handleKeyPress = async event => {
    const tempCells = this.state.cells;

    if (event.code === "KeyF") {
      this.saveAllData({...this.state, nightmode: !this.state.nightmode});
      this.setState({nightmode: !this.state.nightmode})
    }

    if (event.code === "KeyR") {
      this.setState(this.getNewState());
    }

    if (['KeyA', 'KeyS', 'KeyD', 'KeyW'].includes(event.code) && keyPressAllow) {

      // TODO: Refactor for better response

      this.setState({additionalScore: null})

      keyPressAllow = false;

      const mapKeyCodeToDirection = {
        KeyA: directions.LEFT,
        KeyS: directions.DOWN,
        KeyD: directions.RIGHT,
        KeyW: directions.UP,
      }

      this.setState(state => ({
        ...state,
        cells: moveCells(state.cells, mapKeyCodeToDirection[event.code], state.size),
      }))

      const tempScore = this.state.score;

      this.state.cells.filter(cell => cell.state !== "DYING").forEach((cell) => {
        if (cell.state === "INCREASE") {
          this.setState(state => ({
            ...state,
            score: this.state.score + cell.value*2
          }));
        }
      });

      if (this.state.score !== tempScore) {
        this.setState({additionalScore: this.state.score-tempScore});
      }

      if(isChanged(tempCells, this.state.cells)) {
        await delay(100);

        if (this.state.sound) {
          this.moveSound.play();
        }

        this.setState(state => ({
          ...state,
          cells: removeAndIncreaseCells(state.cells),
        }));
        this.setState(state => ({
          ...state,
          cells: populateField(state.cells, state.size),
          bestScore: this.state.score > this.state.bestScore ? this.state.score : this.state.bestScore
        }))
        if(this.state.cells.length === this.state.size**2)
        {
          if (checkGameOver(this.state.cells, this.state.size)) {
            console.log("Game Over")
          };
        }
        this.saveAllData({...this.state});
      }

      setTimeout(() => keyPressAllow = true, 110)
    }
  }

  getNewState() {
    return {
      cells: initCells(this.state.size),
      score: 0,
      bestScore: localStorage.getItem('bestScore') ? localStorage.getItem('bestScore') : 0
    };
  };

  musicVolumeHandler(volume) {
    this.setState({musicVolume: volume});
    this.mainTheme.volume = volume;
    this.saveAllData({...this.state, musicVolume: volume});
  }

  soundVolumeHandler(volume) {
    this.setState({soundVolume: volume});
    this.moveSound.volume = volume;
    this.saveAllData({...this.state, soundVolume: volume});
  }

  buttonHandler(param) {
    switch (param) {
      case "new game":
        this.setState(this.getNewState());
        break;
      case "music":
        if (!this.state.music) {
          this.mainTheme.play();
        } else {
          this.mainTheme.pause();
        }
        this.saveAllData({...this.state, music: !this.state.music});
        this.setState({music: !this.state.music});
        break;
      case "sound":
        if (!this.state.sound === true) {
          this.moveSound.play();
        }
        this.saveAllData({...this.state, sound: !this.state.sound});
        this.setState({sound: !this.state.sound});
        break;
      case "nightmode":
        this.saveAllData({...this.state, nightmode: !this.state.nightmode});
        this.setState({nightmode: !this.state.nightmode});
        break;
      case "colors":
        this.saveAllData({...this.state, colors: !this.state.colors});
        this.setState({colors: !this.state.colors});
        break;
      case "easy":
        this.setState({
          size: 5,
          cells: initCells(5),
          bestScore: localStorage.getItem('bestScore') ? localStorage.getItem('bestScore') : 0
        });
        break;
      case "normal":
        this.setState({
          size: 4,
          cells: initCells(4),
          bestScore: localStorage.getItem('bestScore') ? localStorage.getItem('bestScore') : 0
        });
        break;
      case "hard":
        this.setState({
          size: 3,
          cells: initCells(3),
          bestScore: localStorage.getItem('bestScore') ? localStorage.getItem('bestScore') : 0
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { additionalScore, bestScore, score, size} = this.state;
    const difficulty = this.state.size ? this.state.size === 5 ? "easy" : this.state.size === 4 ? "normal" : "hard" : "normal";
    const music = !this.state.music ? 'ON' : 'OFF';
    const sound = !this.state.sound ? 'ON' : 'OFF';
    const nightmode = !this.state.nightmode ? 'ON' : 'OFF';
    const colors = !this.state.colors ? 'ON' : 'OFF';
    return (
      <Main nightmode={this.state.nightmode}>
        <BrowserRouter>
        <a href="https://github.com/login/oauth/authorize?client_id=70e40fe40ada41351efa">Sign in GitHub</a>
        <Route path='/callback' component={Callback}/>
          <ReactModal isOpen={false} style={ModalStyles}>
            <ModalIcon></ModalIcon>
            <ModalTitle></ModalTitle>
            <ModalDescription></ModalDescription>
            <ModalInput></ModalInput>
            <ModalButton>Ok</ModalButton>
          </ReactModal>
          <Layout>
            <Switch>
              <Menu nightmode={nightmode} musicHandler={this.musicVolumeHandler} soundHandler={this.soundVolumeHandler} colors={colors} music={music} sound={sound} difficulty={difficulty} buttonHandler={this.buttonHandler}/>
            </Switch>
            <Game signin={this.signOutHandler} signout={this.signInHandler} signup={this.signUpHandler} userdata={this.state.user} nightmode={nightmode} colors={colors} additionalScore={additionalScore} score={score} bestScore={bestScore} cells={this.state.cells} size={size}/>
            <Leaderboard />
          </Layout>
        </BrowserRouter>
      </Main>
    )
  };
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default App

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
`

const ModalStyles = { overlay: {

}, content: {
  width: "40%",
  height: "40%",
  background: "red",
} };
