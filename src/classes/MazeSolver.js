const PATH_CHAR = '.';
const EMPTY_CHAR = ' ';

export default class MazeSolver {
  constructor(grid) {
    this.matrix = [];
  }

  _getStart = () => {
    const arr = this.matrix[0];
    for (let i in arr) {
      if (arr[i] === 'S') {
        return [0, parseInt(i)];
      }
    }
  };

  _getEnd = () => {
    const arr = this.matrix[this.matrix.length - 1];
    for (let i in arr) {
      if (arr[i] === 'E') {
        return [this.matrix.length - 1, parseInt(i)];
      }
    }
  };

  _getPath = (position, end) => {
    const queue = [];
    this.matrix[position[0]][position[1]] = 1;
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
      for (let i = 0; i < direction.length; i++) {
        if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
          return path.concat([end]);
        }
        if (
          direction[i][0] < 0 ||
          direction[i][0] >= this.matrix[0].length ||
          direction[i][1] < 0 ||
          direction[i][1] >= this.matrix[0].length ||
          this.matrix[direction[i][0]][direction[i][1]] != EMPTY_CHAR
        ) {
          continue;
        }
        this.matrix[direction[i][0]][direction[i][1]] = 1;
        queue.push(path.concat([direction[i]]));
      }
    }
  };

  solve = (grid) => {
    this.matrix = JSON.parse(JSON.stringify(grid));
    const path = this._getPath(this._getStart(), this._getEnd());
    for (let i = 1; i < path.length - 1; i++) {
      const [y, x] = path[i];
      grid[y][x] = PATH_CHAR;
    }
  };
}
