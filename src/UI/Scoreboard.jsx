import React, {Component} from 'react'
import styled from 'styled-components';
import Authorisation from './Authorisation';
class Scoreboard extends Component {
  render() {
    const {signin, signup, userdata, score, bestScore} = this.props;
    let additionalScore;
    if (this.props.additionalScore) {
      additionalScore = <AdditionalScore>+{this.props.additionalScore}</AdditionalScore>
    }
    return (
      <ScoreBlock>
        <Authorisation signInHandler={signin} signUpHandler={signup} userdata={userdata}/>
        <Window>
          {additionalScore}
          <Title>Score</Title>
          <Content>{score}</Content>
        </Window>
        <Window>
          <Title>best</Title>
          <Content>{bestScore}</Content>
        </Window>
      </ScoreBlock>
    )
  }
}

export default Scoreboard;

const ScoreBlock = styled.div`
  font-family: 'Lato', sans-serif;
  display: flex;
  justify-content: flex-end;
`;

const Window = styled.div`
  position: relative;
  text-align: center;
  padding: 0 10px;
  margin-left: 20px;
  border-radius: 10px;
  background-color: #BBADA0;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 300;
  color: #EDE3DA;
`;

const Content = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #EDE3DA;
`;

const AdditionalScore = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
  font-size: 24px;
  font-weight: bold;
  animation: move-up 600ms ease-in;
  animation-fill-mode: both;
  transition: .6s;

  @keyframes move-up {
    from {
      transform: translateY(0px) scale(1);
      opacity: 1;
    }
    to {
      transform: translateY(-50px) scale(1.2);
      opacity: 0;
    }
  }

  `;
