import styled from "styled-components";

export const FooterBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-weight: bold;
  @media (min-width: 768px) {
    grid-area: 2 / 2 / 3 / 4;
  }
`;

export const InfoText = styled.p`
  text-align: center;
  font-weight: 400;
  font-size: 1.4rem;
`;

export const KeysText = styled.p`
  text-align: center;
  font-weight: 400;
  font-size: 1.4rem;
  @media (max-width: 575px) {
    display: none;
  }
`;

export const Contacts = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  @media (max-width: 300px) {
    flex-direction: column;
  }
`;

export const Link = styled.a`
  display: flex;
  align-items: center;
  width: auto;
  gap: 1rem;
  text-decoration: none;
`;
