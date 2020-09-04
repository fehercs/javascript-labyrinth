import Maze from './classes/Maze.js';
import readline from 'readline';

const WALL_CHAR = '▅';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getUserInput = (question) => {
  let input = '';
  rl.question(question, (answer) => {
    input = answer;
    rl.close();
  });
  return input;
};

const getCanvas = (cols, rows) => {
  let arr = new Array(2 * rows + 1);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(2 * cols + 1).fill(' ');
  }
  return arr;
};

const drawMaze = () => {
  const maze = new Maze({ rows: 5, cols: 5 });
  const { cols, rows } = maze.getSize();
  const grid = maze.getGrid();
  let canvas = getCanvas(cols, rows);
  for (let cell of grid) {
    const { x, y } = cell.getPos();
    const { top, left, bottom, right } = cell.getWalls();
    if (top) {
      canvas[2 * y][2 * x] = WALL_CHAR;
      canvas[2 * y][2 * x + 1] = WALL_CHAR;
      canvas[2 * y][2 * x + 2] = WALL_CHAR;
    }
    if (right) {
      canvas[2 * y][2 * x + 2] = WALL_CHAR;
      canvas[2 * y + 1][2 * x + 2] = WALL_CHAR;
      canvas[2 * y + 2][2 * x + 2] = WALL_CHAR;
    }
    if (left) {
      canvas[2 * y][2 * x] = WALL_CHAR;
      canvas[2 * y + 1][2 * x] = WALL_CHAR;
      canvas[2 * y + 2][2 * x] = WALL_CHAR;
    }
    if (bottom) {
      canvas[2 * y + 2][2 * x] = WALL_CHAR;
      canvas[2 * y + 2][2 * x + 1] = WALL_CHAR;
      canvas[2 * y + 2][2 * x + 2] = WALL_CHAR;
    }
  }
  for (let row of canvas) {
    console.log(row.join(''));
  }
};

drawMaze();
process.exit(0);
