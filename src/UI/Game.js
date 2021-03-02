import React, { Component } from 'react'
import styled from 'styled-components';
import Scoreboard from './Scoreboard';
import Footer from './Footer';
import ModalWindow from './ModalWindow';
import error from '../assets/images/error.png';
import gameOver from '../assets/images/gameOver.png';
import check from '../assets/images/check.png';
import congrats from '../assets/images/congrats.png';
import axios from 'axios';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modaldata: {
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
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
    this.modal = this.modal.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.exitModal = this.exitModal.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress)
  }

  exitModal() {
    this.props.modalHandler(true);
    this.setState({modal: false});
  }

  signOut() {
    localStorage.removeItem('token');
    this.props.userHandler();
  }

  signIn() {
    this.modal(true, "login", {
      exit: true,
      firstButton: {
        text: "Login",
        handler: (e) => e.preventDefault()
      },
      secondButton: {
        text: "Register",
        handler: this.signUp,
      },
      submit: this.login
    })
  }

  signUp() {
    this.modal(true, "register", {
      exit: true,
      firstButton: {
        text: "Register",
        handler: (e) => e.preventDefault()
      },
      secondButton: {
        text: "Login",
        handler: this.signIn,
      },
      submit: this.register
    })
  }

  register(event, data) {
    console.log(event, data);
    if (data.password !== data.confirm) {
      this.setState((state) => state.modaldata.error = "Passwords don't match");
    }
    if (data.username.length < 4) {
      this.setState((state) => state.modaldata.error = "Your username must be at least 4 characters");
    }
    if (data.username.search(/[a-z]/i) < 0) {
        this.setState((state) => state.modaldata.error = "Your username must contain at least one letter.");
    }

    if (data.password.length < 6) {
        this.setState((state) => state.modaldata.error = "Your password must be at least 8 characters");
    }
    if (data.password.search(/[a-z]/i) < 0) {
        this.setState((state) => state.modaldata.error = "Your password must contain at least one letter.");
    }
    if (data.password.search(/[0-9]/) < 0) {
        this.setState((state) => state.modaldata.error = "Your password must contain at least one digit.");
    }
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
      this.props.userHandler();
    }).catch((err) => this.setState((state) => state.modaldata.error = err.message))
    event.preventDefault();
  }

  login(event, data) {
    console.log(event, data);
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
      this.props.userHandler();
    }).catch((err) => this.setState((state) => state.modaldata.error = err.message))
    event.preventDefault();
  }

  modal(modal, type, data) {
    this.props.modalHandler(false);
    const {icon, title, description, inputId, firstButton, secondButton, submit, error, exit} = data

    this.setState({
      modal,
      modaldata: {
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
    })
  }

  render() {
    const {userdata, nightmode, colors, additionalScore, bestScore, score, cells, size} = this.props;
    let cellGrid = [];

    for (let i = 0; i < size**2; i++) {
      cellGrid.push(<Cell key={i}/>);
    }
    return (
      <MainBlock>
        {this.state.modal && <ModalWindow exitHandler={this.exitModal} modaldata={this.state.modaldata}/>}
        <Scoreboard signout={this.signOut} signin={this.signIn} signup={this.signUp} userdata={userdata} additionalScore={additionalScore} score={score} bestScore={bestScore}/>
        <Field size={size}>
          {
            cells.map((value) =>
              {
              let saturation;
              let light;
              if (colors === 'ON') {
                saturation = 3;
                if (nightmode === 'OFF') {
                  light = 50+Math.log2(value.value)*5;
                } else {
                  light = 50-Math.log2(value.value)*5;
                }
              } else {
                saturation = 75-Math.log2(value.value);
                light = 60;
              }
              return <Card colors={colors} saturation={saturation} light={light} nightmode={nightmode} size={size} key={value.id} value={value.value} style={{
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

export default Game;

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
  color: ${({colors, saturation, light}) => colors === "OFF" ? `#FBF8F1`: `hsla(60,${saturation}%,${100-light}%,1)`};
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