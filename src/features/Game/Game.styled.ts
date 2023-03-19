import styled from "styled-components";
import ICell from "../../interfaces/ICell";

export const GameField = styled.div<{size: number}>`
  user-select: none;
  position: relative;
  aspect-ratio: 1;
  display: grid;
  grid-template: repeat(${({size}) => size}, 1fr) / repeat(
      ${({size}) => size},
      1fr
    );
  background-color: #bbada0;
  border-radius: 1.5rem;
  gap: 0.5rem;
  padding: 0.5rem;
  @media (min-width: 768px) {
    height: 35vw;
    width: 35vw;
  }
  @media (min-width: 992px) {
    height: 60vh;
    width: 60vh;
  }
`;

export const Cell = styled.div`
  background-color: #cdc1b4;
  border-radius: 1rem;
`;

export const Card = styled.div<{
  colors: boolean;
  saturation: number;
  light: number;
  size: number;
  cell: ICell;
}>`
  position: absolute;
  display: flex;
  color: ${({colors, saturation, light}) =>
    colors ? `#FBF8F1` : `hsla(60,${saturation}%,${100 - light}%,1)`};
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: ${({size}) => `calc(calc(100% - .5rem - .5rem*${size}) / ${size})`};
  height: ${({size}) => `calc(calc(100% - .5rem - .5rem*${size}) / ${size})`};
  top: ${({cell, size}) =>
    `calc(.5rem + calc(calc(100% - .5rem - .5rem*${size}) / ${size}) * ${cell.y} + .5rem * ${cell.y})`};
  left: ${({cell, size}) =>
    `calc(.5rem + calc(calc(100% - .5rem - .5rem*${size}) / ${size}) * ${cell.x} + .5rem * ${cell.x})`};
  background-color: ${({cell, saturation, light}) =>
    `hsla(${60 - 20 * Math.log2(cell.value)},${saturation}%,${light}%,1)`};
  box-shadow: ${({cell, saturation, light}) =>
    `0 0 1rem 0 hsla(${
      60 - 20 * Math.log2(cell.value)
    },${saturation}%,${light}%,1)`};
  font-size: ${({cell, size}) => `${216 / size - Math.log2(cell.value)}px`};
  border-radius: 10px;
  transition: 0.1s ease-in-out;
  animation: 0.2s creation ease-in;

  @keyframes creation {
    from {
      opacity: 0;
      transform: scale(1.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
