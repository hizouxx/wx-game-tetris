export default class Circle {

  constructor(cx, cy, radius, bitmap) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.bitmap = bitmap;
  }

  drawSelf(canvas){
    canvas.fillStyle='#000000';
    canvas.arc(this.cx, this.cy, this.radius, 0,Math.PI*2);
    if (this.bitmap) {
      canvas.drawImage(this.bitmap, this.cx - this.radius, this.cy - this.radius, this.radius * 2, this.radius*2);
    }
  }
    
  drawColorSelf(canvas){
    canvas.fillStyle =this.color;
    canvas.beginPath();
    canvas.arc(this.cx, this.cy, this.radius, 0, Math.PI * 2);
    canvas.closePath();
    canvas.fill();
  }
    
  getCx(){
    return this.cx;
  }
    
  getCy(){
    return this.cy;
  }
    
  getRadius(){
    return this.radius;
  }
    
  setColor(color){
    this.color = color;
  }
    
  contains(cx, cy) {
    return this.getDistence(this.cx, this.cy, cx, cy) <= this.radius;
  }
    
  getDistence(x, y, cx, cy){
    var xLength = Math.abs(x - cx);
    var yLength = Math.abs(y - cy);
    var r = Math.sqrt(xLength * xLength + yLength * yLength);
    return r;
  }
}