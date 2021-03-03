import React from 'react'
import styled from 'styled-components';
import icon_github from '../assets/images/github.svg';
import icon_rsschool from '../assets/images/rs_school.svg';


export default function Game() {
  return (
    <Footer>
      <Text>
        <b>HOW TO PLAY:</b>  Use your <b>arrow keys</b> to move the tiles. When towo tiles with the same number touch, they <b>merge into one</b>!
      </Text>
      <Contacts>
        <Link href='https://github.com/pozhitok-egor'>
          <img src={icon_github} alt="GitHub"/> pozhitok-egor
        </Link>
        <Link href='https://rs.school/js/'>
          <img src={icon_rsschool} alt="The Rolling Scopes School"/>
        </Link>
      </Contacts>
      <Text><b>R</b> Restart | <b>F</b> Nightmode | <b>WASD</b> move</Text>
    </Footer>

  )
}

const Footer = styled.div`
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Text = styled.p`
  font-weight: 400;
  margin: 0;
  font-size: 16px;
  text-align: center;
`;

const Contacts = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Link = styled.a`
  display: flex;
  align-content: center;
  width: auto;
  gap: 10px;
  text-decoration: none;
`;
