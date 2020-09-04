export default class Cell {
  constructor(pos) {
    const { x, y } = pos;
    (this.walls = {
      [this._nameIt(x, y - 1)]: true,
      [this._nameIt(x + 1, y)]: true,
      [this._nameIt(x, y + 1)]: true,
      [this._nameIt(x - 1, y)]: true,
    }),
      (this.pos = pos),
      (this.visited = false);
  }
  _nameIt(x, y) {
    return `${x}${y}`;
  }
  getName() {
    const { x, y } = this.pos;
    return this._nameIt(x, y);
  }
  getWalls() {
    const { x, y } = this.pos;
    return {
      top: this.walls[this._nameIt(x, y - 1)],
      right: this.walls[this._nameIt(x + 1, y)],
      bottom: this.walls[this._nameIt(x, y + 1)],
      left: this.walls[this._nameIt(x - 1, y)],
    };
  }
  getPos() {
    return this.pos;
  }
  removeTopWall() {
    const { x, y } = this.pos;
    this.setWalls({ [this._nameIt(x, y - 1)]: false });
  }
  removeBottomWall() {
    const { x, y } = this.pos;
    this.setWalls({ [this._nameIt(x, y + 1)]: false });
  }
  setWalls(change) {
    this.walls = Object.assign(this.walls, change);
  }
  setVisited() {
    this.visited = true;
  }
  isVisited() {
    return this.visited;
  }
}
