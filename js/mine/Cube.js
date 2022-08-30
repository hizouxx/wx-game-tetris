
const Direction = require('./Direction.js').Direction
let cw = canvas.width;
// let ch = canvas.height;
export default class Cube {

  constructor(x, y, color, tetris) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.padli = 3
    this.padwai = 4;
    this.tetris = tetris;
  }

  setPosition(x, y){
    this.x = x;
    this.y = y;
  }
      
  getX() {
    return this.x;
  }

  setX(x) {
    this.x = x;
  }

  getY() {
    return this.y;
  }

  setY(y) {
    this.y = y;
  }

  drawSelf(canvas){
    if (this.x >= 0 && this.x < this.tetris.clowns * this.tetris.cell && this.y >= 0) {
      canvas.fillStyle=this.color;
      canvas.fillRect(this.x + this.padwai / 2 + this.padli + cw / 7, this.y + this.padwai / 2 + this.padli + this.tetris.CustomHeight, this.tetris.cell - this.padwai - this.padli * 2, this.tetris.cell - this.padwai - this.padli*2);
      canvas.strokeStyle = this.color;
      canvas.strokeRect(this.x + this.padwai/2 + cw / 7, this.y + this.padwai/2 + this.tetris.CustomHeight, this.tetris.cell - this.padwai, this.tetris.cell - this.padwai);
    }
  }
      
  drawPriview(canvas){
    canvas.fillStyle='#000';
    canvas.strokeStyle = '#000';
    let cell = this.tetris.cell;
    canvas.strokeRect(this.x + this.padwai / 2 + cw / 7, this.y + this.padwai / 2 + this.tetris.CustomHeight, this.tetris.cell - this.padwai, this.tetris.cell - this.padwai);
    canvas.fillRect(this.x + this.padwai / 2 + cw / 7 + this.padli, this.y + this.padwai / 2 + this.padli + this.tetris.CustomHeight, this.tetris.cell - this.padwai - this.padli * 2, this.tetris.cell - this.padwai - this.padli * 2);
  }

  canUpdate(direction) {
    let cell = this.tetris.cell;
    if (direction == Direction.LEFT) {
      return this.tetris.pan.canUpdate(this.x - cell, this.y);
    } else if (direction == Direction.RIGHT) {
      return this.tetris.pan.canUpdate(this.x + cell, this.y);
    } else if (direction == Direction.UP) {
      return this.tetris.pan.canUpdate(this.x, this.y - cell);
    } else if (direction == Direction.DOWN) {
      return this.tetris.pan.canUpdate(this.x, this.y + cell);
    }
    return true;
  }

  setPositionByDirection(direction) {
    let cell = this.tetris.cell;
    if (direction == Direction.LEFT) {
      this.x = this.x - cell;
    } else if (direction == Direction.RIGHT) {
      this.x = this.x + cell;
    } else if (direction == Direction.UP) {
      this.y = this.y - cell;
    } else if (direction == Direction.DOWN) {
      this.y = this.y + cell;
    }
  }
}