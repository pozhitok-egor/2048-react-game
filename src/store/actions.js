import axios from "axios";
import { CHANGE_MUSIC, CHANGE_SOUND, CHANGE_THEME, CHANGE_COLOR, NEW_FIELD, SET_SIZE , UPDATE_FIELD, CHANGE_SIZE, INCREMENT, RESET_SCORE, MUSIC_VOLUME, SOUND_VOLUME, FETCH_USERDATA, SIGN_OUT, FETCH_LEADERBOARD, LOADER_DEACTIVATE, LOADER_ACTIVATE } from "./types";

export function newField(size) {
  return {
    type: NEW_FIELD,
    payload: size
  }
}

export function updateField(cells) {
  return {
    type: UPDATE_FIELD,
    payload: cells
  }
}

export function resetScore() {
  return {
    type: RESET_SCORE
  }
}

export function addScore(score) {
  return {
    type: INCREMENT,
    payload: score
  }
}

export function setSize(size) {
  return {
    type: SET_SIZE,
    payload: size
  }
}

export function changeSize(size) {
  return {
      type: CHANGE_SIZE,
      payload: size
    }
}

export function changeMusic(state) {
  return {
      type: CHANGE_MUSIC,
      payload: state
    }
}

export function setMusicVolume(volume) {
  return {
      type: MUSIC_VOLUME,
      payload: volume
    }
}

export function changeSound(state) {
  return {
      type: CHANGE_SOUND,
      payload: state
    }
}

export function setSoundVolume(volume) {
  return {
      type: SOUND_VOLUME,
      payload: volume
    }
}

export function changeTheme(state) {
  return {
      type: CHANGE_THEME,
      payload: state
    }
}

export function changeColor(state) {
  return {
    type: CHANGE_COLOR,
    payload: state
  }
}

export function loaderActivate() {
  return {
    type: LOADER_ACTIVATE
  }
}

export function loaderDeactivate() {
  return {
    type: LOADER_DEACTIVATE
  }
}
export function fetchUser(token) {
  return async dispatch => {
    axios.get('https://twenty-forty-eight.herokuapp.com/user',{
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
    }).then((res) => {
      dispatch({type: FETCH_USERDATA, payload: res.data.user});
    }).catch((err) => {
      dispatch({type: FETCH_USERDATA, payload: null});
    })
  }
}

export function fetchLeaderboard(type) {
  return async dispatch => {
    dispatch(loaderActivate());
    axios.get('https://twenty-forty-eight.herokuapp.com/score',{
    headers: {
      accept: 'application/json'
    }
    }).then((res) => {
      const data = res.data.scores;
      dispatch({type: FETCH_LEADERBOARD, payload: data.filter(scores => scores.type === type).sort((a, b) => b.score - a.score)})
      dispatch(loaderDeactivate());
    }).catch(() => {
      dispatch({type: FETCH_LEADERBOARD, payload: {}})
      dispatch(loaderDeactivate());
    })
  }
}

export function signOut() {
  return {
    type: SIGN_OUT
  }
}
