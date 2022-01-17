import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "./UI/Menu/Menu.jsx";
import Game from "./UI/Game.jsx";
import Leaderboard from "./UI/Leaderboard.jsx";
import "./main.css";
import mainTheme from "./assets/audio/main theme chill.mp3";
import Callback from "./UI/Callback";
import { connect } from "react-redux";
import { changeTheme, changeMusic, fetchUser, fetchLeaderboard } from "./store/actions";
import { Layout, Main } from "./App.styled.js";

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
      musicVolume: this.props.musicVolume
    };

    this.getAllData();

    this.musicVolumeHandler = this.musicVolumeHandler.bind(this);
    this.soundVolumeHandler = this.soundVolumeHandler.bind(this);
    this.mainTheme = new Audio(mainTheme);
    this.mainTheme.volume = this.state.musicVolume;
    this.mainTheme.loop = true;
  }

  getAllData() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.fetchUser(token);
    }
    this.props.changeTheme(localStorage.getItem("nightmode") === "true");
    this.props.fetchLeaderboard("easy");
    this.props.changeMusic(localStorage.getItem("music") === "true");
  }

  musicVolumeHandler(volume) {
    this.setState({ musicVolume: volume });
    this.mainTheme.volume = volume;
  }

  soundVolumeHandler(volume) {
    this.setState({ soundVolume: volume });
    this.moveSound.volume = volume;
    this.saveAllData({ ...this.state, soundVolume: volume });
  }

  render() {
    if (this.props.music) {
      this.mainTheme.play();
    } else {
      this.mainTheme.pause();
    }
    return (
      <Main nightmode={this.props.nightmode}>
        <BrowserRouter>
          <Route path="/callback" component={Callback} />
          <Layout>
            <Switch>
              <Menu />
            </Switch>
            <Game userHandler={this.userHandler} userdata={this.state.user} />
            <Leaderboard />
          </Layout>
        </BrowserRouter>
      </Main>
    )
  };
}

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
  fetchLeaderboard,
  changeMusic
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
