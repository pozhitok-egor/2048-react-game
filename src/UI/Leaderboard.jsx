import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchLeaderboard } from '../store/actions';
import loaderImage from '../assets/images/loader.gif';

function Leaderboard(props) {
  const loader = props.loader.active;

  return (
    <RightBlock>
      <TitleBlock>
        <Title>LEADERBOARD</Title>
        <Buttons>
          <Button onClick={() => props.fetchLeaderboard("easy")}>
            Easy
          </Button>
          <Button onClick={() => props.fetchLeaderboard("medium")}>
            Normal
          </Button>
          <Button onClick={() => props.fetchLeaderboard("hard")}>
            Hard
          </Button>
        </Buttons>
      </TitleBlock>
      <Table>
        <Row>
          <Number>
            Position
          </Number>
          <Name>
            Name
          </Name>
          <Score>
            Score
          </Score>
        </Row>
        { loader && <Loader><img src={loaderImage} alt="loader"/></Loader>}
        { !loader && props.leaderboard &&
          props.leaderboard.map((elem, index) =>
            <Row key={index}>
              <Number>
                # {index+1}
              </Number>
              <Name>
                {elem.name}
              </Name>
              <Score>
                {elem.score}
              </Score>
            </Row>
          )
        }
      </Table>
    </RightBlock>
  )
}

const Loader = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  & img {
    width: 100px;
    animation: rotate 4s infinite linear;
    @keyframes rotate {
      from {transform: rotate(0deg);}
      50% {transform: rotate(180deg);}
      to {transform: rotate(360deg);}
    }
  }
`;

const RightBlock = styled.div`
  font-family: 'Lato', sans-serif;
  margin-left: 20px;
  width: min-content;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (max-width: 940px) {
    min-height: 320px;
    margin: 20px 0 40px;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

const Buttons = styled.div`
  display: flex;
`;

const Button = styled.button`
  padding: 5px 10px;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  text-transform: uppercase;
  border: none;
  outline: none;
  background-color: transparent;
  &:hover {
    background-color: #BBADA0;
    color: #EDE3DA;
    &:last-child {
      border-radius: 0 10px 10px 0;
    }
    &:first-child {
      border-radius: 10px 0 0 10px;
    }
  }
  &:not(:last-child) {
    border-right: 1px solid #757575;
  }
`;

const Table = styled.div`
`;

const Row = styled.div`
  display: flex;
`;

const Number = styled.div`
  min-width: 30%;
  text-align: center;
`;

const Name = styled.div`
  min-width: 50%;
  text-align: center;
`;

const Score = styled.div`
  min-width: 20%;
  text-align: center;
`;

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard,
    loader: state.loader
  }
}

const mapDispatchToProps = {
  fetchLeaderboard
}


export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)
