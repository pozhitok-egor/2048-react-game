import React, { Component } from 'react'
import styled from 'styled-components';
import Scoreboard from './Scoreboard';
import Footer from './Footer';

class Game extends Component {
  render() {
    const {signout, signin, signup, userdata, nightmode, colors, additionalScore, bestScore, score, cells, size} = this.props;
    let cellGrid = [];

    for (let i = 0; i < size**2; i++) {
      cellGrid.push(<Cell key={i}/>);
    }
    return (
      <MainBlock>
        <Scoreboard signout={signout} signin={signin} signup={signup} userdata={userdata} additionalScore={additionalScore} score={score} bestScore={bestScore}/>
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