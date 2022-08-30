
export default class TetrisTime {
  constructor(x, y, size, num, width, cell) {
    this.w = 0;
    this.h = 0;
    this.ratio = 1;
    this.number = num;
    this.size = size;
    this.updateSize();
    this.x = x;
    this.y = y;
    this.width = width;
    this.cell = cell;
  }

  updatePosition(x, y){
    this.x = x;
    this.y = y;
  }
    
  updateNumber(num){
    this.number = num;
    this.updateSize();
    // this.x = this.width - this.cell * 2 - this.w;
  }
    
  updateSize(){
    this.w = this.length() * this.size;
    this.h = this.size * 2;
  }
    
  length(){
    return this.number.toString().length;
  }
    
  drawSelf(canvas){
    var len = this.length();
    for (var i= 1; i <= len;i++){
      var num = parseInt((this.number % Math.pow(10, i)) / (Math.pow(10, i) / 10));
      this.drawSelfNumber(canvas, num, this.x + this.size * (len - i), this.y);
    }
  }

  drawLine(x1, y1, x2, y2, canvas){
    canvas.beginPath();
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2, y2)
    canvas.closePath();
    canvas.stroke();
  }
    
  drawSelfNumber(canvas, num, x, y) {
    let ratio = this.ratio;
    let size = this.size;
    switch (num) {
      case 0:
        this.drawLine(x + ratio * 2, y - ratio, x + size - ratio * 2, y - ratio, canvas);                       //-
        this.drawLine(x + ratio * 2, y - size * 2 + ratio, x + size - ratio * 2, y - size * 2 + ratio, canvas); //_
        this.drawLine(x + ratio, y - ratio * 2, x + ratio, y - size + ratio, canvas);				                   //|
        this.drawLine(x + ratio, y - size - ratio, x + ratio, y - size * 2 + ratio, canvas);			               //|
        this.drawLine(x + size - ratio, y - ratio * 2, x + size - ratio, y - size + ratio, canvas);	           //  |
        this.drawLine(x + size - ratio, y - size - ratio, x + size - ratio, y - size * 2 + ratio, canvas);      //  |
        break;
      case 1:
        this.drawLine(x + ratio, y - ratio * 2, x + ratio, y - size + ratio, canvas);				                    //|
        this.drawLine(x + ratio, y - size - ratio, x + ratio, y - size * 2 + ratio, canvas);			                //|
        break;
      case 2:
        this.drawLine(x + ratio * 2, y - ratio, x + size - ratio * 2, y - ratio, canvas);                        //-
        this.drawLine(x + ratio * 2, y - size, x + size - ratio * 2, y - size, canvas);				                  //-
        this.drawLine(x + ratio * 2, y - size * 2 + ratio, x + size - ratio * 2, y - size * 2 + ratio, canvas);  //_
        this.drawLine(x + ratio, y - ratio * 2, x + ratio, y - size + ratio, canvas);				                    //|
        this.drawLine(x + size - ratio, y - size - ratio, x + size - ratio, y - size * 2 + ratio, canvas);       //  |
        break;
      case 3:
        this.drawLine(x + ratio * 2, y - ratio, x + size - ratio * 2, y - ratio, canvas);               //-
        this.drawLine(x + ratio * 2, y - size, x + size - ratio * 2, y - size, canvas);				   //-
        this.drawLine(x + ratio * 2, y - size * 2 + ratio, x + size - ratio * 2, y - size * 2 + ratio, canvas); //_
        this.drawLine(x + size - ratio, y - ratio * 2, x + size - ratio, y - size + ratio, canvas);	   //  |
        this.drawLine(x + size - ratio, y - size - ratio, x + size - ratio, y - size * 2 + ratio, canvas);  //  |
        break;
      case 4:
        this.drawLine(x + ratio * 2, y - size, x + size - ratio * 2, y - size, canvas);				   //-
        this.drawLine(x + ratio, y - size - ratio, x + ratio, y - size * 2 + ratio, canvas);			   //|
        this.drawLine(x + size - ratio, y - size - ratio, x + size - ratio, y - size * 2 + ratio, canvas);  //  |
        this.drawLine(x + size - ratio, y - ratio * 2, x + size - ratio, y - size + ratio, canvas);	   //  |
        break;
      case 5:
        this.drawLine(x + ratio * 2, y - ratio, x + size - ratio * 2, y - ratio, canvas);               //-
        this.drawLine(x + ratio * 2, y - size, x + size - ratio * 2, y - size, canvas);				   //-
        this.drawLine(x + ratio * 2, y - size * 2 + ratio, x + size - ratio * 2, y - size * 2 + ratio, canvas); //_
        this.drawLine(x + ratio, y - size - ratio, x + ratio, y - size * 2 + ratio, canvas);			   //|
        this.drawLine(x + size - ratio, y - ratio * 2, x + size - ratio, y - size + ratio, canvas);	   //  |
        break;
      case 6:
        this.drawLine(x + ratio * 2, y - ratio, x + size - ratio * 2, y - ratio, canvas);               //-
        this.drawLine(x + ratio * 2, y - size, x + size - ratio * 2, y - size, canvas);				   //-
        this.drawLine(x + ratio * 2, y - size * 2 + ratio, x + size - ratio * 2, y - size * 2 + ratio, canvas); //_
        this.drawLine(x + ratio, y - size - ratio, x + ratio, y - size * 2 + ratio, canvas);			   //|
        this.drawLine(x + ratio, y - ratio * 2, x + ratio, y - size + ratio, canvas);				   //|
        this.drawLine(x + size - ratio, y - ratio * 2, x + size - ratio, y - size + ratio, canvas);	   //  |
        break;
      case 7:
        this.drawLine(x + ratio * 2, y - size * 2 + ratio, x + size - ratio * 2, y - size * 2 + ratio, canvas); //_
        this.drawLine(x + size - ratio, y - size - ratio, x + size - ratio, y - size * 2 + ratio, canvas);  //  |
        this.drawLine(x + size - ratio, y - ratio * 2, x + size - ratio, y - size + ratio, canvas);	   //  |
        break;
      case 8:
        this.drawLine(x + ratio * 2, y - size * 2 + ratio, x + size - ratio * 2, y - size * 2 + ratio, canvas); //_
        this.drawLine(x + ratio * 2, y - size, x + size - ratio * 2, y - size, canvas);				   //-
        this.drawLine(x + ratio * 2, y - ratio, x + size - ratio * 2, y - ratio, canvas);               //-
        this.drawLine(x + ratio, y - size - ratio, x + ratio, y - size * 2 + ratio, canvas);			   //|
        this.drawLine(x + ratio, y - ratio * 2, x + ratio, y - size + ratio, canvas);				   //|
        this.drawLine(x + size - ratio, y - size - ratio, x + size - ratio, y - size * 2 + ratio, canvas);  //  |
        this.drawLine(x + size - ratio, y - ratio * 2, x + size - ratio, y - size + ratio, canvas);	   //  |
        break;
      case 9:
        this.drawLine(x + ratio * 2, y - size * 2 + ratio, x + size - ratio * 2, y - size * 2 + ratio, canvas); //_
        this.drawLine(x + ratio * 2, y - size, x + size - ratio * 2, y - size, canvas);				   //-
        this.drawLine(x + ratio * 2, y - ratio, x + size - ratio * 2, y - ratio, canvas);               //-
        this.drawLine(x + ratio, y - size - ratio, x + ratio, y - size * 2 + ratio, canvas);			   //|
        this.drawLine(x + size - ratio, y - size - ratio, x + size - ratio, y - size * 2 + ratio, canvas);  //  |
        this.drawLine(x + size - ratio, y - ratio * 2, x + size - ratio, y - size + ratio, canvas);	   //  |
        break;
      default:
        break;
    }
  }

}