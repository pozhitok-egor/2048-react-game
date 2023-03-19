import backgroundLight from './assets/images/bg-light.png';
import backgroundDark from './assets/images/bg-night.png';
import styled from 'styled-components'

export const Main = styled.div<{nightmode: boolean}>`
  height: 100%;
  background: ${props => props.nightmode ? `url(${backgroundDark}), #3B3A35` : `url(${backgroundLight}), #FBF8F1`};
  color: ${props => props.nightmode ? '#EDE3DA' : '#7D7171'};
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

export const Layout = styled.div`
  display: grid;
  height: 100%;
  padding: 20px;
  grid-template-columns: 1fr;
  gap: 20px;
  @media (min-width: 576px) {
    padding: 40px;
  }
  @media (min-width: 992px) {
    padding: 40px 10%;
  }
`
