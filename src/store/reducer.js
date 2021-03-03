import { combineReducers } from "redux";
import { initCells } from "../Controller/Control";
import { CHANGE_MUSIC, CHANGE_SOUND, CHANGE_THEME, CHANGE_COLOR, NEW_FIELD, SET_SIZE , UPDATE_FIELD, CHANGE_SIZE, INCREMENT, RESET_SCORE, MUSIC_VOLUME, SOUND_VOLUME, FETCH_USERDATA, SIGN_OUT } from "./types";


function cellsReducer( state = { value: initCells(3) }, action ) {
  switch (action.type) {
    case UPDATE_FIELD:
      return {...state, value: action.payload}
    case NEW_FIELD:
      return {...state, value: initCells(action.payload)}
    case CHANGE_SIZE:
      return {...state, value: initCells(action.payload)}
    default: return state
  }
}

function scoreReducer( state = 0, action ) {
  switch (action.type) {
    case INCREMENT:
      return state + action.payload
    case RESET_SCORE:
      return 0
    case NEW_FIELD:
      return 0
    default: return state
  }
}

function sizeReducer( state = { value: 4 }, action ) {
  switch (action.type) {
    case SET_SIZE:
      return {...state, value: action.payload}
    case CHANGE_SIZE:
      return {...state, value: action.payload}
    default: return state
  }
}

function themeReducer(state = { value: false }, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {...state, value: action.payload}
    default: return state
  }
}

function colorReducer(state = { value: true }, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return {...state, value: action.payload}
    default: return state
  }
}

function musicReducer(state = { value: true, volume: 0.5 }, action) {
  switch (action.type) {
    case CHANGE_MUSIC:
      return {...state, value: action.payload};
    case MUSIC_VOLUME:
      return {...state, volume: action.payload};
    default: return state
  }
}

function soundReducer(state = { value: true, volume: 0.5 }, action) {
  switch (action.type) {
    case CHANGE_SOUND:
      return {...state, value: action.payload};
    case SOUND_VOLUME:
      return {...state, volume: action.payload};
    default: return state
  }
}

function userReducer(state = null, action) {
  switch (action.type) {
    case FETCH_USERDATA:
      return action.payload;
    case SIGN_OUT:
      return null;
    default: return state;
  }
}

export const rootReducer = combineReducers({
  cells: cellsReducer,
  score: scoreReducer,
  size: sizeReducer,
  theme: themeReducer,
  color: colorReducer,
  music: musicReducer,
  sound: soundReducer,
  user: userReducer
})
