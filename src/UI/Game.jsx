import React, { Component } from 'react';
import { checkGameOver, isChanged, initCells, moveCells, directions, removeAndIncreaseCells, populateField } from '../Controller/Control';
import { updateField, newField, resetScore, addScore, setSize, setSoundVolume, changeTheme, fetchUser} from '../store/actions';
import cryptojs from 'crypto-js';
import styled from 'styled-components';
import Scoreboard from './Scoreboard';
import Footer from './Footer';
import ModalWindow from './ModalWindow';
import error from '../assets/images/error.png';
import gameOver from '../assets/images/gameOver.png';
// import check from '../assets/images/check.png';
import congrats from '../assets/images/congrats.png';
import axios from 'axios';
import { connect } from 'react-redux';
import moveSound from '../assets/audio/move.wav';

var keyPressAllow = true;
const secret = 'secret';
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = this.getAllData();
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.modal = this.modal.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.exitModal = this.exitModal.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.gameOver = this.gameOver.bind(this)
    this.moveSound = new Audio(moveSound);
  }

  getAllData() {
    const bestScore = localStorage.getItem("bestScore") ||  0;
    const mainSettings = localStorage.getItem("s") ? JSON.parse(cryptojs.AES.decrypt(localStorage.getItem("s"), secret).toString(cryptojs.enc.Utf8))
    : {
      cells: initCells(4),
      score: 0,
      size: 4,
    };
    this.props.updateField(mainSettings.cells);
    this.props.addScore(mainSettings.score);
    this.props.setSize(mainSettings.size);
    this.props.setSoundVolume(localStorage.getItem("soundVolume") ||  0.5);
    return {
      additionalScore: 0,
      bestScore,
      modal: {
        active: false,
        data: {
          type: 'error',
          exit: true,
          icon: error,
          title: "Error",
          description: "An error occurred",
          inputId: "input",
          error: null,
          firstButton: {
            text: "OK",
            handler: null
          },
          secondButton: {
            active: false,
            text: "",
            handler: null
          },
          submit: ''
        }
      }
    }
  }

  saveAllData(state) {
    const cells = this.props.cells;
    const score = this.props.score;
    const size = this.props.size;
    localStorage.setItem("bestScore", state.bestScore);
    localStorage.setItem("s", cryptojs.AES.encrypt(JSON.stringify({cells, score, size}), secret).toString());
    localStorage.setItem("nightmode", this.props.nightmode);
  }

  exitModal() {
    keyPressAllow = true;
    this.setState((state) => state.modal.active = false);
  }

  signIn(exit) {
    this.modal(true, "login", {
      exit: exit !== undefined ? exit : true,
      firstButton: {
        text: "Login",
        handler: (e) => e.preventDefault()
      },
      secondButton: {
        text: "Register",
        handler: () => this.signUp(exit),
      },
      submit: this.login
    })
  }

  signUp(exit) {
    this.modal(true, "register", {
      exit: exit !== undefined ? exit : true,
      firstButton: {
        text: "Register",
        handler: (e) => e.preventDefault()
      },
      secondButton: {
        text: "Login",
        handler: () => this.signIn(exit),
      },
      submit: this.register
    })
  }

  register(event, data) {
    if (data.password !== data.confirm) {
      this.setState((state) => state.modal.data.error = "Passwords don't match");
    } else if (data.username.length < 4) {
      this.setState((state) => state.modal.data.error = "Your username must be at least 4 characters");
    } else if (data.username.search(/[a-z]/i) < 0) {
        this.setState((state) => state.modal.data.error = "Your username must contain at least one letter.");
    } else if (data.password.length < 6) {
        this.setState((state) => state.modal.data.error = "Your password must be at least 8 characters");
    } else if (data.password.search(/[a-z]/i) < 0) {
        this.setState((state) => state.modal.data.error = "Your password must contain at least one letter.");
    } else if (data.password.search(/[0-9]/) < 0) {
        this.setState((state) => state.modal.data.error = "Your password must contain at least one digit.");
    } else {
      axios.post('https://twenty-forty-eight.herokuapp.com/user/register',
      {
        username: data.username,
        password: data.password
      } ,
      {
        method: 'post',
        headers: {
          accept: 'application/json'
        }
      }).then((res) => {
        this.exitModal();
        localStorage.setItem('token', res.data.token);
        this.props.fetchUser(res.data.token);
        this.gameOver();
      }).catch((err) => this.setState((state) => state.modal.data.error = err.response.data.message));
    }
    event.preventDefault();
  }

  login(event, data) {
    axios.post('https://twenty-forty-eight.herokuapp.com/user/login',
    {
      username: data.username,
      password: data.password
    } ,
    {
      method: 'post',
      headers: {
        accept: 'application/json'
      }
    }).then((res) => {
      this.exitModal();
      localStorage.setItem('token', res.data.token);
      this.props.fetchUser(res.data.token);
      this.gameOver();
    }).catch((err) => this.setState((state) => state.modal.data.error = err.response.data.message));
    event.preventDefault();
  }

  modal(active, type, data) {
    keyPressAllow = false;
    const {icon, title, description, inputId, firstButton, secondButton, submit, error, exit} = data

    this.setState({
      modal: {
        active,
        data: {
          type,
          exit: exit || false,
          icon: icon || null,
          title: title || null,
          description: description || null,
          inputId: inputId || 0,
          error: error || null,
          firstButton: {
            text: firstButton.text || "OK",
            handler: firstButton.handler || null
          },
          secondButton: {
            text: secondButton.text || null,
            handler: secondButton.handler || null
          },
          submit: submit || ""
        }
      }
    })
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress)
  }

  handleKeyPress = async event => {
    const tempCells = this.props.cells;

    if (event.code === "KeyF") {
      this.props.changeTheme(!this.props.nightmode)
      this.saveAllData({...this.state})
    }

    if (event.code === "KeyR") {
      this.props.newField(this.props.size);
      this.saveAllData({...this.state});
    }

    if (['KeyA', 'KeyS', 'KeyD', 'KeyW'].includes(event.code) && keyPressAllow) {

      this.setState({additionalScore: null})

      keyPressAllow = false;

      const mapKeyCodeToDirection = {
        KeyA: directions.LEFT,
        KeyS: directions.DOWN,
        KeyD: directions.RIGHT,
        KeyW: directions.UP,
      }

      this.props.updateField(moveCells(this.props.cells, mapKeyCodeToDirection[event.code], this.props.size))

      const tempScore = this.props.score;

      this.props.cells.filter(cell => cell.state !== "DYING").forEach((cell) => {
        if (cell.state === "INCREASE") {
          this.props.addScore(cell.value*2);
        }
      });

      if (this.props.score !== tempScore) {
        this.setState({additionalScore: this.props.score-tempScore});
      }

      if(isChanged(tempCells, this.props.cells)) {
        await delay(100);

        if (this.props.sound) {
          this.moveSound.play();
        }

        const cells = removeAndIncreaseCells(this.props.cells);

        this.props.updateField(populateField(cells, this.props.size));
        this.setState(state => ({
          ...state,
          bestScore: this.props.score > this.state.bestScore ? this.props.score : this.state.bestScore
        }))
        if(this.props.cells && this.props.cells.some(cell => cell.value === 2048) && !this.props.cells.some(cell => cell.value === 4096)) {
          this.modal(true, "wingame", {
            exit: true,
            icon: congrats,
            title: "You Win!!!",
            description: `You hit 2048 and won the game!`,
            firstButton: {
              text: "OK",
              handler: (e) => {this.exitModal();}
            },
            secondButton: {}
          });
        }
        this.saveAllData({...this.state});
      }

      if(this.props.cells.length === this.props.size**2)
      {
        if (checkGameOver(this.props.cells, this.props.size)) {
          if (!this.props.user) {
            this.signIn(false);
          } else {
            this.gameOver();
          }
        };
      }

      setTimeout(() => keyPressAllow = true, 110)
    }
  }

  gameOver() {
    this.modal(true, "gameover", {
      exit: true,
      icon: gameOver,
      title: "Game Over",
      description: `You scored ${this.props.score}`,
      firstButton: {
        text: "OK",
        handler: (e) => {this.exitModal();
        this.props.newField(this.props.size);
        this.saveAllData({...this.state});
        axios.post("https://twenty-forty-eight.herokuapp.com/score", {
          type: this.props.size === 3 ? "hard" : this.props.size === 5 ? "easy" : "medium",
          score: this.props.score
        }, {
          headers: {
            accept: 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });}
      },
      secondButton: {}
    })
  }

  getNewState() {
    return {
      cells: initCells(this.state.size),
      score: 0,
      bestScore: localStorage.getItem('bestScore') ? localStorage.getItem('bestScore') : 0
    };
  };

  render() {
    const { userdata, nightmode, color } = this.props;
    this.moveSound.volume = this.props.soundVolume;
    let cellGrid = [];

    const { bestScore } = this.state;
    const {cells, size, score} = this.props;

    for (let i = 0; i < size**2; i++) {
      cellGrid.push(<Cell key={i}/>);
    }
    return (
      <MainBlock>
        {this.state.modal.active && <ModalWindow exitHandler={this.exitModal} modaldata={this.state.modal.data}/>}
        <Scoreboard signin={this.signIn} signup={this.signUp} userdata={userdata} additionalScore={this.state.additionalScore} score={score} bestScore={bestScore}/>
        <Field size={size}>
          {
            cells.map((value) =>
              {
              let saturation;
              let light;
              if (!color) {
                saturation = 3;
                if (nightmode) {
                  light = 50+Math.log2(value.value)*5;
                } else {
                  light = 50-Math.log2(value.value)*5;
                }
              } else {
                saturation = 75-Math.log2(value.value);
                light = 60;
              }
              return <Card colors={color} saturation={saturation} light={light} size={size} key={value.id} value={value.value} style={{
                top: `calc(10px + calc(calc(100% - 20px - 10px*${size-1}) / ${size}) * ${value.y} + 10px * ${value.y})`,
                left:`calc(10px + calc(calc(100% - 20px - 10px*${size-1}) / ${size}) * ${value.x} + 10px * ${value.x})`,
                backgroundColor: `hsla(${60-20*(Math.log2(value.value))},${saturation}%,${light}%,1)`,
                boxShadow: `0px 0px 10px 0px hsla(${60-20*(Math.log2(value.value))},${saturation}%,${light}%,1)`
              }}>{value.value}</Card>
              }
            )
          }
          {
            cellGrid.map((cell) => cell)
          }
        </Field>
        <Footer />
      </MainBlock>

    )
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 440px;
`;

const Field = styled.div`
  position: relative;
  display: grid;
  grid-template: repeat(${({size}) => size},1fr) / repeat(${({size}) => size},1fr);
  padding: 10px;
  gap: 10px;
  flex-wrap: wrap;
  max-width: 440px;
  max-height: 440px;
  width: 440px;
  height: 440px;
  background-color: #BBADA0;
  border-radius: 10px;
`;

const Cell = styled.div`
  background-color: #CDC1B4;
  border-radius: 10px;
`;

const Card = styled.div`
  position: absolute;
  display: flex;
  color: ${({colors, saturation, light}) => colors ? `#FBF8F1`: `hsla(60,${saturation}%,${100-light}%,1)`};
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: ${({size}) => `calc(calc(100% - 20px - 10px*${size-1}) / ${size})`};
  height: ${({size}) => `calc(calc(100% - 20px - 10px*${size-1}) / ${size})`};
  font-size: ${({value, size}) => `${216/size - Math.log2(value)}px`};
  border-radius: 10px;
  transition: .1s ease-in-out;
  animation: .2s creation ease-in;

  @keyframes creation {
    from {
      opacity: 0;
      transform: scale(1.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const mapStateToProps = state => {
  return {
    cells: state.cells.value,
    score: state.score,
    size: state.size.value,
    color: state.color.value,
    nightmode: state.theme.value,
    sound: state.sound.value,
    soundVolume: state.sound.volume,
    user: state.user
  };
};

const mapDispatchToProps = {
  newField,
  updateField,
  resetScore,
  addScore,
  setSize,
  changeTheme,
  setSoundVolume,
  fetchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
