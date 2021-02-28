import React from 'react'
import styled from 'styled-components';

const Scores = [
  ["Egor", 100],
  ["Jorra", 90],
  ["Jeka", 80],
  ["GOGO", 70],
  ["Max", 60]
]

export default function Menu() {
  return (
    <RightBlock>
      <TitleBlock>
        <Title>LEADERBOARD</Title>
        <Buttons>
          <Button>
            Easy
          </Button>
          <Button>
            Normal
          </Button>
          <Button>
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
        {
          Scores.map ((elem, index) =>
            <Row key={index}>
              <Number>
                # {index+1}
              </Number>
              <Name>
                {elem[0]}
              </Name>
              <Score>
                {elem[1]}
              </Score>
            </Row>
          )
        }
      </Table>
    </RightBlock>
  )
}

const RightBlock = styled.div`
  font-family: 'Lato', sans-serif;
  margin-left: 20px;
  width: min-content;
  display: flex;
  flex-direction: column;
  gap: 40px;
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