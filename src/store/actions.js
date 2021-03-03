import { CHANGE_MUSIC, CHANGE_SOUND, CHANGE_THEME, CHANGE_COLOR, NEW_FIELD, SET_SIZE , UPDATE_FIELD, CHANGE_SIZE, INCREMENT, RESET_SCORE, MUSIC_VOLUME, SOUND_VOLUME } from "./types";

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
