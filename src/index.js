import Maze from './classes/Maze.js';
import readline from 'readline-sync';

const WALL_CHAR = '▅';
const EMPTY_CHAR = ' ';
const PATH_CHAR = '.';

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

const getStart = () => {
  const arr = canvas[0];
  for (let i in arr) {
    if (arr[i] === 'S') {
      return [0, parseInt(i)];
    }
  }
};

const getEnd = () => {
  const arr = canvas[canvas.length - 1];
  for (let i in arr) {
    if (arr[i] === 'E') {
      return [canvas.length - 1, parseInt(i)];
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

const getPath = (position, end) => {
  const matrix = JSON.parse(JSON.stringify(canvas));
  const queue = [];
  matrix[position[0]][position[1]] = 1;
  queue.push([position]);
  while (queue.length > 0) {
    const path = queue.shift();
    const pos = path[path.length - 1];
    const direction = [
      [pos[0] + 1, pos[1]],
      [pos[0], pos[1] + 1],
      [pos[0] - 1, pos[1]],
      [pos[0], pos[1] - 1],
    ];
    for (var i = 0; i < direction.length; i++) {
      if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
        return path.concat([end]);
      }
      if (
        direction[i][0] < 0 ||
        direction[i][0] >= matrix[0].length ||
        direction[i][1] < 0 ||
        direction[i][1] >= matrix[0].length ||
        matrix[direction[i][0]][direction[i][1]] != EMPTY_CHAR
      ) {
        continue;
      }
      matrix[direction[i][0]][direction[i][1]] = 1;
      queue.push(path.concat([direction[i]]));
    }
  }
};

const solveMaze = () => {
  const path = getPath(getStart(), getEnd());
  for (let i = 1; i < path.length - 1; i++) {
    const [y, x] = path[i];
    canvas[y][x] = PATH_CHAR;
  }
};

const drawMaze = () => {
  console.clear();
  for (let row of canvas) {
    console.log(row.join(''));
  }
};

const main = () => {
  const rows = parseInt(getUserInput('Enter number of rows:\n'));
  const cols = parseInt(getUserInput('Enter number of collumns:\n'));
  maze = new Maze({ rows: rows || 3, cols: cols || 3 });
  canvas = getCanvas();
  fillMaze();
  solveMaze();
  drawMaze();
  process.exit(0);
};

main();
