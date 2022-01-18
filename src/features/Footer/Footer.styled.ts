import styled from "styled-components";

export const FooterBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 768px) {
    grid-area: 2 / 2 / 3 / 4;
  }
`;

export const Text = styled.p`
  text-align: center;
  font-weight: 400;
  font-size: 1.4rem;
`;

export const Contacts = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  flex-direction: column;
  gap: 2rem;
  @media (min-width: 576px) {
    justify-content: space-between;
    flex-direction: row;
  }
`;

export const Link = styled.a`
  display: flex;
  align-items: center;
  width: auto;
  gap: 1rem;
  text-decoration: none;
`;
