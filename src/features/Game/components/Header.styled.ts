import styled from "styled-components";

export const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-end;
  & > div {
    display: flex;
    gap: 2rem;
  }
  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const Score = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  color: #ede3da;
  background-color: #bbada0;
  border-radius: 1rem;
`;

export const ScoreTitle = styled.p`
  text-align: center;
  font-size: 1.4rem;
`;

export const AdditionalScore = styled.div`
  position: absolute;
  font-weight: bold;
  animation: 600ms ease-in 0s 1 normal both running move-up;
  transition: all 0.6s ease 0s;

  @keyframes move-up {
    0% {
      top: 50%;
      left: calc(50% - 1.4rem);
      font-size: 1.4rem;
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      top: -70%;
      left: calc(50% - 2.4rem);
      font-size: 2.4rem;
      opacity: 0;
    }
  }
`;

export const ScoreValue = styled.p`
  font-weight: bold;
  font-size: 1.8rem;
`;
