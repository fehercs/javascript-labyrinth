import Maze from './classes/Maze.js';
import readline from 'readline-sync';
import MazeSolver from './classes/MazeSolver.js';

const WALL_CHAR = '▅';
const EMPTY_CHAR = ' ';
let maze, canvas;

const getUserInput = (question) => {
  let input = readline.question(question);
  return input;
};

const getCanvas = () => {
  const { cols, rows } = maze.getSize();
  let arr = new Array(2 * rows + 1);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(2 * cols + 1).fill(EMPTY_CHAR);
  }
  return arr;
};

const fillEmpty = (arr, char) => {
  for (let i in arr) {
    if (arr[i] === EMPTY_CHAR) {
      arr[i] = char;
    }
  }
};

const fillMaze = () => {
  const grid = maze.getGrid();
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
  fillEmpty(canvas[0], 'S');
  fillEmpty(canvas[canvas.length - 1], 'E');
};

const drawMaze = () => {
  console.clear();
  for (let row of canvas) {
    console.log(row.join(''));
  }
};

const main = () => {
  const rows = Math.abs(parseInt(getUserInput('Enter number of rows:\n')));
  const cols = Math.abs(parseInt(getUserInput('Enter number of collumns:\n')));
  maze = new Maze({ rows: rows || 3, cols: cols || 3 });
  canvas = getCanvas();
  fillMaze();
  const mazeSolver = new MazeSolver();
  mazeSolver.solve(canvas);
  drawMaze();
  process.exit(0);
};

main();
