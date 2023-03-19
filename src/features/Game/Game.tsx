import {MouseEvent, MouseEventHandler, useEffect, useRef, useState} from "react";
import GameController from '../../Controller/Game';
import { DIRECTIONS } from "../../interfaces/Directions";
import Header from "./components/Header";
import {Card, Cell, GameField} from "./Game.styled";
import ICell from "../../interfaces/ICell";

const Game = () => {
  // TODO: Replace with redux store data
  const [color] = useState<boolean>(true);
  const [nightmode] = useState<boolean>(false);
  let size = 4;
  let cellGrid = [];

  const [game, setGame] = useState(new GameController(4));
  const cells = useRef<ICell[]>(game.cells)
  const [, setForceUpdate] = useState(Date.now());

  function detectMobileDevice() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
  }

  useEffect(() => {

    const touches = {
      x: [0, 0],
      y: [0, 0]
    }

    function touchStart(e: TouchEvent): void;
    function touchStart(e: globalThis.MouseEvent): void;
    function touchStart(e: TouchEvent | globalThis.MouseEvent) {
      if (e instanceof TouchEvent) {
        console.log(e.touches)
        touches.x[0] = e.touches[0].clientX;
        touches.y[0] = e.touches[0].clientY;
      } else {
        touches.x[0] = e.screenX;
        touches.y[0] = e.screenY;
      }
    }



    function touchEnd(e: TouchEvent): void;
    function touchEnd(e: globalThis.MouseEvent): void;
    function touchEnd(e: globalThis.MouseEvent | TouchEvent) {
      if (e instanceof TouchEvent) {
        touches.x[1] = e.changedTouches[0].clientX;
        touches.y[1] = e.changedTouches[0].clientY;
      } else {
        touches.x[1] = e.screenX;
        touches.y[1] = e.screenY;
      }

      const x = touches.x[0] - touches.x[1];
      const y = touches.y[0] - touches.y[1];
      console.log(x, y);
      if (Math.abs(x) > 150 || Math.abs(y) > 150) {
        const axis = Math.abs(x) - Math.abs(y);
        const direction = axis > 0
          ? x > 0
            ? DIRECTIONS.LEFT
            : DIRECTIONS.RIGHT
          : y > 0
            ? DIRECTIONS.UP
            : DIRECTIONS.DOWN;
        game.move(direction);
      }
    }

    document.addEventListener('touchstart', touchStart);
    document.addEventListener('touchend', touchEnd);
    document.addEventListener('mousedown', touchStart);
    document.addEventListener('mouseup', touchEnd);


    document.onkeydown = (e: KeyboardEvent) => {
      console.log(e.code);
      if (e.code === 'KeyA' || e.code === 'KeyS' || e.code === 'KeyD' || e.code === 'KeyW' || e.code === 'ArrowRight' || e.code === 'ArrowLeft' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        const mapKeyCodeToDirection = {
          KeyA: DIRECTIONS.LEFT,
          KeyS: DIRECTIONS.DOWN,
          KeyD: DIRECTIONS.RIGHT,
          KeyW: DIRECTIONS.UP,
          ArrowRight: DIRECTIONS.RIGHT,
          ArrowLeft: DIRECTIONS.LEFT,
          ArrowUp: DIRECTIONS.UP,
          ArrowDown: DIRECTIONS.DOWN
        }
        game.move(mapKeyCodeToDirection[e.code])
      }
    }
    game.onCellsUpdate = (newCells) => {
      console.log('updated')
      cells.current = newCells;
      setForceUpdate(Date.now());
    }

    return () => {
      document.addEventListener('touchstart', touchStart);
      document.addEventListener('touchend', touchEnd);
      document.addEventListener('mousedown', touchStart);
      document.addEventListener('mouseup', touchEnd);
    }
  }, [game])

  for (let i = 0; i < size ** 2; i++) {
    cellGrid.push(<Cell key={i} />);
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
      <GameField size={size} onSelect={(e) => e.preventDefault()}>
        {cellGrid}
        {cells.current.map(cell => {
          let saturation;
          let light;
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

          return <Card {...props} key={cell.id}>
            {cell.value}
          </Card>
        })}
      </GameField>
    </div>
  );
};

export default Game;
