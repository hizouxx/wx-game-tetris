
const Direction = require('./Direction.js').Direction

export default class Triangle{

  constructor(cx, cy, w, h, direction) {
    var x1 = cx + w / 2;
    var y1 = cy - h / 2;
    var x2 = cx + w / 2;
    var y2 = cy + h / 2;
    var x3 = cx - w / 2;
    var y3 = cy;
    if (direction == Direction.RIGHT) {
      x1 = cx - w / 2;
      y1 = cy - h / 2;
      x2 = cx - w / 2;
      y2 = cy + h / 2;
      x3 = cx + w / 2;
      y3 = cy;
    } else if (direction == Direction.UP) {
      x1 = cx - h / 2;
      y1 = cy + w / 2;
      x2 = cx + h / 2;
      y2 = cy + w / 2;
      x3 = cx;
      y3 = cy - w / 2;
    } if (direction == Direction.DOWN) {
      x1 = cx - h / 2;
      y1 = cy - w / 2;
      x2 = cx + h / 2;
      y2 = cy - w / 2;
      x3 = cx;
      y3 = cy + w / 2;
    }
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }

  drawSelf(canvas){
    canvas.beginPath();
    canvas.moveTo(this.x1, this.y1);
    canvas.lineTo(this.x2, this.y2);
    canvas.lineTo(this.x3, this.y3);
    canvas.closePath();
    canvas.fill();
  }
}