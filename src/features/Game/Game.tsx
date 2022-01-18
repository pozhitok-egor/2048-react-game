import {useState} from "react";
import Header from "./components/Header";
import {Card, Cell, GameField} from "./Game.styled";

const Game = () => {
  // TODO: Replace with redux store data
  const [color] = useState<boolean>(true);
  const [nightmode] = useState<boolean>(false);
  let size = 4;
  let cellGrid = [];
  let cells = [];

  for (let i = 0; i < size ** 2; i++) {
    cellGrid.push(<Cell key={i} />);

    // TODO: Remove card mock data
    let saturation;
    let light;
    let cell = {
      id: i,
      value: (i + 1) * 2,
      x: i % size,
      y: (i - (i % size)) / size,
    };
    console.log(cell.x, cell.y);
    if (!color) {
      saturation = 3;
      if (nightmode) {
        light = 50 + Math.log2(cell.value) * 5;
      } else {
        light = 50 - Math.log2(cell.value) * 5;
      }
    } else {
      saturation = 75 - Math.log2(cell.value);
      light = 60;
    }

    let props = {colors: color, saturation, light, size, cell};

    cells.push(
      <Card {...props} key={cell.id} onSelect={(e) => e.preventDefault()}>
        {cell.value}
      </Card>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Header />
      <GameField size={size}>
        {cellGrid}
        {cells}
      </GameField>
    </div>
  );
};

export default Game;
