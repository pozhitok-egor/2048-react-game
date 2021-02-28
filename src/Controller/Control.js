import { cloneDeep } from 'lodash'
import rotateMatrix from 'rotate-matrix'
import {uniqueId, maxBy} from 'lodash'

function isChanged(arr1, arr2) {
  return arr1.some((value, index) =>
    value.x !== arr2[index].x || value.y !== arr2[index].y || value.id !== arr2[index].id
  );
}

function checkGameOver(cells, size) {

  const matrix = Array.from(new Array(size), () =>
    Array.from(new Array(size), () => 0),
  )

  cells.forEach(cell => {
    matrix[cell.y][cell.x] = cell
  })

  for (let i = 0; i < matrix.length; i++) {
    const column = matrix[i];
    for (let j = 0; j < column.length; j++) {
      if(matrix[i+1] && matrix[i+1][j].value === column[j].value) {
        return false;
      }
      if(column[j+1] && column[j+1].value === column[j].value) {
        return false;
      }
    }
  }
  return true;
}

function populateField(cells, size) {
  const occupiedCoords = new Set()

  cells.forEach(cell => {
    occupiedCoords.add(cell.x * size + cell.y)
  })

  if (occupiedCoords.size === size**2) return

  let x
  let y
  let startSize = occupiedCoords.size
  do {
    x = Math.floor(Math.random() * (size-1+0.9))
    y = Math.floor(Math.random() * (size-1+0.9))

    const sum = x * size + y
    occupiedCoords.add(sum)
  } while (startSize === occupiedCoords.size)

  let maxId = Number(maxBy(cells, (cell) => Number(cell.id)).id);
  let id = uniqueId();
  while (id <= maxId) {
    id = uniqueId();
  }

  return [...cells, create(x, y, (Math.random() - .2 > 0 ? 2 : 4), id)]
}

function removeAndIncreaseCells (cells) {
  return cells.filter(cell => cell.state !== cellStates.DYING).map(cell => {
    if (cell.state === cellStates.INCREASE) {
      cell.value *= 2
    }

    cell.state = cellStates.IDLE

    return cell
  })
}

const directions = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
}

const moveCells = (initCells, direction, size) => {
  const cells = cloneDeep(initCells)


  let matrix = Array.from(new Array(size), () =>
    Array.from(new Array(size), () => 0),
  )

  cells.forEach(cell => {
    matrix[cell.y][cell.x] = cell
  })

  matrix = rotateMatrixFromDirection(matrix, direction);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (matrix[y][x] === 0) continue
      moveCell(matrix, x, y)
    }
  }


  matrix = rotateMatrixToDirection(matrix, direction)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (matrix[y][x] === 0) continue
      matrix[y][x].y = y
      matrix[y][x].x = x
    }
  }

  cells.filter(cell => cell.by != null).forEach(cell => {
    cell.x = cell.by.x
    cell.y = cell.by.y
    delete cell.by
  })

  return cells
}

function moveCell(matrix, x, y) {
  let nextRow = y - 1
  let currentRow = y

  while (nextRow >= 0) {
    if (matrix[nextRow][x] === 0) {
      matrix[nextRow][x] = matrix[currentRow][x]
      matrix[currentRow][x].state = cellStates.MOVING
      matrix[currentRow][x] = 0

      currentRow = nextRow
    } else if (
      matrix[nextRow][x].value === matrix[currentRow][x].value &&
      (matrix[nextRow][x].state === cellStates.IDLE ||
        matrix[nextRow][x].state === cellStates.MOVING)
    ) {
      matrix[nextRow][x].state = cellStates.DYING
      matrix[nextRow][x].by = matrix[currentRow][x]
      matrix[currentRow][x].state = cellStates.INCREASE
      matrix[nextRow][x] = matrix[currentRow][x]
      matrix[currentRow][x] = 0
      currentRow = nextRow
    } else {
      break
    }

    nextRow -= 1
  }
}

function rotateMatrixFromDirection(matrix, direction) {
  switch (direction) {
    case directions.LEFT:
      matrix = rotateMatrix(matrix)
      break
    case directions.DOWN:
      matrix = rotateMatrix(matrix,2)
      break
    case directions.RIGHT:
      matrix = rotateMatrix(matrix,3)
      break
    default:
      break
  }
  return matrix;
}
function rotateMatrixToDirection(matrix, direction) {
  switch (direction) {
    case directions.LEFT:
      matrix = rotateMatrix(matrix,3)
      break
    case directions.DOWN:
      matrix = rotateMatrix(matrix,2)
      break
    case directions.RIGHT:
      matrix = rotateMatrix(matrix)
      break
    default:
      break
  }
  return matrix;
}

const cellStates = {
  IDLE: "IDLE",
  MOVING: "MOVING",
  DYING: "DYING",
  INCREASE: "INCREASE",
}

const create = (x, y, value, id) => ({
  x, y, value, id: id ? id : uniqueId(), state: cellStates.IDLE
})

const initCells = (size) => {
  const cell1 = create(getRandomCoord(size), getRandomCoord(size), 2)
  const cell2 = create(getRandomCoord(size), getRandomCoord(size), 2)

  if (cell1.x === cell2.x && cell1.y === cell2.y) {
    cell1.x = cell1.x === 0 ? 1 : cell1.x - 1
  }

  return [cell1, cell2]
}

const getRandomCoord = (size) => {
  return Math.floor(Math.random() * (size-1+0.9))
}

export { checkGameOver, isChanged, initCells, moveCells, directions, removeAndIncreaseCells, populateField }
