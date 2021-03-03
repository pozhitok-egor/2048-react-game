import styled from 'styled-components';

const MenuBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 940px) {
    a, &>button {
      width: 85%;
    }
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const SettingsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-transform: uppercase;
  text-align: center;
  @media (max-width: 940px) {
    width: 40%;
  }
`;

const SettingsTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

const SettingsParam = styled.p`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0;
  font-size: 18px;
`;

const LeftButton = styled.button`
  margin-right: 10px;
  cursor: pointer;
  padding: 0;
  background: none;
  border: none;
  outline: none;
  & img {
    transform: rotate(180deg);
  }
  &:hover {
    & img {
      transform: rotate(180deg) translateX(1px) scale(1.5);
    }
  }
`;

const RightButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
  outline: none;
  padding: 0;
  background: none;
  border: none;
  &:hover {
    & img {
      transform: translateX(1px) scale(1.5);
    }
  }
`;

const Button = styled.button`
  width: 100%;
  outline: none;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #7D7171;
  border-radius: 10px;
  font-family: 'Lato',sans-serif;
  text-transform: uppercase;
  font-size: 18px;
  background-color: transparent;
  &:hover {
    background-color: #BBADA0;
    color: #EDE3DA;
  }
`;

export {
  MenuBlock,
  SettingsBlock,
  SettingsTitle,
  SettingsParam,
  LeftButton,
  RightButton,
  Button
}
