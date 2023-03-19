import backgroundLight from "../../assets/images/bg-light.png";
import backgroundDark from "../../assets/images/bg-night.png";
import styled from "styled-components";

export const MenuBlock = styled.div<{menuState: boolean; nightmode: boolean}>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-area: 1 / 1 / 3 / 2;
  }

  @media (max-width: 767px) {
    position: ${({menuState}) => (menuState ? "fixed" : "relative")};
    top: 0;
    left: 0;
    background: ${({nightmode, menuState}) =>
      menuState
      ?  nightmode
          ? `url(${backgroundDark}), #3B3A35`
          : `url(${backgroundLight}), #FBF8F1`
      : `none`
      };
    width: 100%;
    height: 100%;
    z-index: 100;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 1.4rem;
  @media (max-width: 576px) {
    width: 17rem;
  }
`;

export const BurgerButton = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

export const Items = styled.div<{menuState: boolean}>`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 767px) {
    display: ${({menuState}) => (menuState ? "flex" : "none")};
  }
`;

export const LogoText = styled.p`
  font-size: 6.4rem;
  font-weight: bold;
  font-family: "Lato";
  @media (max-width: 576px) {
    font-size: 7.2rem;
  }
`;
