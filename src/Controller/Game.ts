import {DIRECTIONS, Directions} from "../interfaces/Directions";
import ICell, {CELLSTATES} from "../interfaces/ICell";
import Queue from "./Queue";

let _id = 0;

class Game {
  private _cells: Array<ICell> = [];
  private _size: number;
  private _queue: Queue<ICell>;
  private _changed: boolean = false;
  private _onCellsUpdate?: (cells: ICell[]) => void;

  constructor(size: number) {
    this._size = size;
    this.newGame();
    this._queue = new Queue<ICell>();
  }

  get cells(): ICell[] {
    return [...this._cells];
  }

  get isChanged(): boolean {
    return this._changed.valueOf();
  }

  logGameField(): void {
    let gameField = this.gameField;
    let str = "";
    for (let i = 0; i < gameField.length; i++) {
      str += " |";
      for (let j = 0; j < gameField[i].length; j++) {
        const cell = gameField[i][j];
        let strCell = "_";
        if (cell !== 0) strCell = cell.value.toString();
        str += " " + strCell;
      }
      str += " | \n";
    }
    console.log(str);
  }

  private newGameField(): void {
    this._cells = [];
  }

  private createEmptyArray<T>(): Array<Array<T | 0>> {
    return Array.from(new Array(this._size), () =>
      Array.from(new Array(this._size), () => 0)
    );
  }

  moveCell(matrix: (0 | ICell)[][], x: number, y: number): void {
    let cell = matrix[y][x];
    if (cell !== 0) {
      for (let j = x + 1; j < matrix[y].length; j++) {
        let nextCell = matrix[y][j];
        if (nextCell === 0) {
          matrix[y][j] = cell;
          matrix[y][j - 1] = 0;
          this._changed = true;
        } else if (
          nextCell.state === CELLSTATES.IDLE &&
          nextCell.value === cell.value
        ) {
          cell.state = CELLSTATES.INCREASE;
          nextCell.state = CELLSTATES.DYING;
          nextCell.removedBy = cell;
          matrix[y][j] = cell;
          matrix[y][j - 1] = 0;
          this._changed = true;
        } else {
          break;
        }
      }
    }
  }

  set onCellsUpdate(callbackFn: (cells: ICell[]) => void) {
    this._onCellsUpdate = callbackFn;
  }

  private onCellsUpdateHandler() {
    if (this._onCellsUpdate) this._onCellsUpdate(this._cells)
  }

  private moveCells(matrix: (0 | ICell)[][]): (0 | ICell)[][] {
    this._changed = false;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = matrix[i].length - 1; j >= 0; j--) {
        this.moveCell(matrix, j, i);
      }
    }
    return matrix;
  }

  move(direction: Directions) {
    let newGameField = this.rotateMatrixFromDirection(
      this.gameField,
      direction
    );
    newGameField = this.moveCells(newGameField);
    newGameField = this.rotateMatrixToDirection(newGameField, direction);
    if (this._changed) {
      newGameField.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell !== 0) {
            cell.x = x;
            cell.y = y;
          }
        });
      });
      this.onCellsUpdateHandler();
      setTimeout(() => {
          this.updateCellStates();
          this.onCellsUpdateHandler();
      }, 100);
    }
  }

  private updateCellStates(): void {
    this._cells = this._cells.reduce((acc: ICell[], cell) => {
      if (cell.state === CELLSTATES.DYING) {
        return acc;
      }
      if (cell.state === CELLSTATES.INCREASE) {
        cell.value = cell.value * 2;
        cell.state = CELLSTATES.IDLE;
        acc.push(cell);
      } else {
        acc.push(cell);
      }
      return acc;
    }, []);
    this.addOneNumber();
  }

  private rotateMatrixToDirection<T>(
    matrix: T[][],
    direction: Directions
  ): T[][] {
    let newGameField = matrix;
    switch (direction) {
      case DIRECTIONS.UP:
        newGameField = this.rotateMatrix(newGameField, 3);
        break;
      case DIRECTIONS.DOWN:
        newGameField = this.rotateMatrix(newGameField, 1);
        break;
      case DIRECTIONS.LEFT:
        newGameField = this.rotateMatrix(newGameField, 2);
        break;
    }
    return newGameField;
  }

  private rotateMatrixFromDirection<T>(
    matrix: T[][],
    direction: Directions
  ): T[][] {
    let newGameField = matrix;
    switch (direction) {
      case DIRECTIONS.UP:
        newGameField = this.rotateMatrix(newGameField, 1);
        break;
      case DIRECTIONS.DOWN:
        newGameField = this.rotateMatrix(newGameField, 3);
        break;
      case DIRECTIONS.LEFT:
        newGameField = this.rotateMatrix(newGameField, 2);
        break;
    }
    return newGameField;
  }

  private rotateMatrix<T>(matrix: T[][], times: number): T[][] {
    let n = times % 4;
    let prevMt, mt: T[][];
    prevMt = mt = matrix;

    while (n !== 0) {
      mt = [];

      for (var i = 0, cl = prevMt.length; i < cl; i++) {
        for (var j = 0, rl = prevMt[i].length; j < rl; j++) {
          if (cl !== rl) {
            return [];
          }

          mt[i] = mt[i] || [];
          mt[i][j] = prevMt[j][i];
        }

        if (n > 0) {
          mt[i] = mt[i].reverse();
        }
      }

      if (n < 0) {
        mt.reverse();
        n++;
      } else {
        n--;
      }

      prevMt = mt;
    }

    return mt;
  }

  newGame(): void {
    this.newGameField();
    this.addOneNumber();
    this.addOneNumber();
  }

  private newCell(y: number, x: number, value: number): void {
    this._cells.push({
      state: CELLSTATES.IDLE,
      value,
      x,
      y,
      id: this.getUniqueId(),
    });
  }

  private get gameField() {
    let gameField: Array<Array<ICell | 0>> = this.createEmptyArray();
    this._cells.forEach((cell) => {
      if (cell.state !== CELLSTATES.DYING) gameField[cell.y][cell.x] = cell;
    });
    return gameField;
  }

  private addOneNumber(): void {
    const emptyCellsArray = this.getEmptyValuesCoordinates();
    const emptyCell = this.getRandomValueFromArray(emptyCellsArray);
    const newValue = this.getTwoOrFour();
    this.newCell(emptyCell.y, emptyCell.x, newValue);
  }

  private getTwoOrFour(): number {
    return Math.random() - 0.1 > 0 ? 2 : 4;
  }

  private getRandomValueFromArray<T>(array: Array<T>): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private getEmptyValuesCoordinates(): Array<{y: number; x: number}> {
    const gameField = this.gameField;
    const map: Array<{y: number; x: number}> = [];
    for (let i = 0; i < gameField.length; i++) {
      for (let j = 0; j < gameField[i].length; j++) {
        if (gameField[i][j] === 0) {
          map.push({x: j, y: i});
        }
      }
    }
    return map;
  }

  get isGameOver() {
    return false;
  }

  private getUniqueId(): number {
    return _id++;
  }
}

export default Game;
