export default interface ICell {
  value: number;
  id: number;
  x: number;
  y: number;
  state: CellState;
  removedBy?: ICell;
}

export enum CELLSTATES {
  IDLE = "IDLE",
  MOVING = "MOVING",
  DYING = "DYING",
  INCREASE = "INCREASE"
}

export type CellState = CELLSTATES.IDLE | CELLSTATES.MOVING | CELLSTATES.DYING | CELLSTATES.INCREASE;
