import Cell from './Cell.js';
import Stack from './Stack.js';

export default class Maze {
  constructor(size = { rows: 3, cols: 3 }) {
    this.size = size;
    this.grid = this.createCells();
    this.generateMaze();
  }

  createCells = () => {
    const { cols, rows } = this.size;
    let arr = new Array(cols * rows);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Cell(this.getPos(i));
    }
    return arr;
  };

  generateMaze = () => {
    const stack = new Stack();
    const entranceiIndex = Math.floor(Math.random() * this.size.cols);
    const entrance = this.grid[entranceiIndex];
    entrance.removeTopWall();
    const { cols, rows } = this.size;
    const max = cols * rows;
    const exitIndex =
      Math.floor(Math.random() * (max - (max - cols))) + (max - cols);
    const exit = this.grid[exitIndex];
    exit.removeBottomWall();
    entrance.setVisited();
    stack.push(entrance);
    let current = null;
    while (!stack.isEmpty()) {
      current = stack.pop();
      const next = this.checkNeighbours(current);
      if (next) {
        stack.push(current);
        current.setWalls({ [next.getName()]: false });
        next.setWalls({ [current.getName()]: false });
        next.setVisited();
        stack.push(next);
      }
    }
  };

  getGrid() {
    return this.grid;
  }

  getSize() {
    return this.size;
  }

  checkNeighbours = (cell) => {
    let neighbours = [];
    const { x, y } = cell.getPos();

    const top = this.grid[this.getIndex(x, y - 1)];
    const right = this.grid[this.getIndex(x + 1, y)];
    const bottom = this.grid[this.getIndex(x, y + 1)];
    const left = this.grid[this.getIndex(x - 1, y)];

    if (top && !top.isVisited()) {
      neighbours.push(top);
    }
    if (right && !right.isVisited()) {
      neighbours.push(right);
    }
    if (bottom && !bottom.isVisited()) {
      neighbours.push(bottom);
    }
    if (left && !left.isVisited()) {
      neighbours.push(left);
    }

    if (neighbours.length > 0) {
      let r = Math.floor(Math.random() * neighbours.length);
      return neighbours[r];
    } else {
      return undefined;
    }
  };

  getIndex = (x, y) => {
    if (x < 0 || y < 0 || x >= this.size.cols || y > this.size.rows) {
      return -1;
    }
    return x + y * this.size.cols;
  };

  getPos = (index) => {
    return {
      x: index % this.size.cols,
      y: Math.floor(index / this.size.cols),
    };
  };
}
