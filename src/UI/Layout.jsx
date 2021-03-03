import React, { Component } from 'react';
import styled from 'styled-components';

const Main = styled.main`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Menu = styled.div`
background-color: blue;
`;

const GameField = styled.div`
background-color: green;
`;
const Leaderboard = styled.div`
background-color: red;
  @media (max-width: 940px) {
    margin: 20px 0;
  }
`;

class Layout extends Component {
  render() {
    const { menu, game, leaderboard } = this.props
    console.log(menu)
    return (
      <Main>
        <Menu>{menu}</Menu>
        <GameField>{game}</GameField>
        <Leaderboard>{leaderboard}</Leaderboard>
      </Main>
    )
  }
}

export default Layout