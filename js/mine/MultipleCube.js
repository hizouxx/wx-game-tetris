import Cube from './Cube'
const Type = require('./Type.js').Type
const getRandomType = require('./Type.js').getRandomType
const Direction = require('./Direction.js').Direction
const Contant = require('./Contant.js').Contant

// let width = canvas.width;
// let height = canvas.height;
export default class MultipleCube{

  // Type type= Type.HENGSIGE,nextType = null;
  // float x,y,preX,preY;
  // List<Cube> list;
  // List<Cube> pre;
  // int nextNumber;
  // Direction direction = Direction.DOWN;
  // int color,nextColor;
  constructor(typ = Type.HENGSIGE, x, y, tetris) {
    this.type = typ;
    this.x = x;
    this.y = y;
    this.tetris = tetris;
    this.preX = this.tetris.panelWidth + this.tetris.cell * 2;
    this.preY = this.tetris.panelPadding + this.tetris.cell * 8;
    this.setColor(this.getColor(this.type));
    this.nextNumber = this.getNumber(this.type);
    this.list = [];
    this.pre = [];
    for (let i = 0; i < this.nextNumber;i++){
      this.list[this.list.length] = new Cube(x, y, this.color, this.tetris);
    }
    this.setTypeStyle(this.list, this.type, true, false, false);

    this.nextType = this.getRandomType();
    this.nextColor = this.getColor(this.nextType);
    this.nextNumber = this.getNumber(this.nextType);
    this.direction = Direction.DOWN;
    for (let i = 0; i < this.nextNumber;i++){
      this.pre[this.pre.length] = new Cube(this.x, this.y, this.nextColor, this.tetris);
    }
    this.setTypeStyle(this.pre, this.nextType, false, false, true);
  }

  getRandomType() {
    return getRandomType(25);
  }

  restart() {
    this.tetris.pan.clearCubes();
    this.list=[];
    this.tetris.invalidate();
    this.reCreateCube();
  }

  setDirection(direction){
    this.direction = direction;
    this.upDatePosition();
    this.tetris.invalidate();
    this.direction = Direction.DOWN;
  }

      //类型相关
  upDatePosition(){
    var isupdate = true;
    let direction = this.direction;
    let panelPadding = this.tetris.panelPadding;
    let cell = this.tetris.cell;
    let clowns = this.tetris.clowns;
    if (direction == Direction.LEFT) {
      this.x = this.x - cell;
      if (this.x < panelPadding) {
        this.x = panelPadding;
        isupdate = false;
      }
    } else if (direction == Direction.RIGHT) {
      this.x = this.x + cell;
      if (this.type == Type.HENGSIGE) {
        if (this.x > panelPadding + (clowns - 4) * cell) {
          this.x = panelPadding + (clowns - 4) * cell;
          isupdate = false;
        }
      } else if (this.type == Type.SHUSIGE) {
        if (this.x > panelPadding + (clowns - 1) * cell) {
          this.x = panelPadding + (clowns - 1) * cell;
          isupdate = false;
        }
      } else if (this.type == Type.ZUOSHUSANYOUYI) {
        if (this.x > panelPadding + (clowns - 2) * cell) {
          this.x = panelPadding + (clowns - 2) * cell;
          isupdate = false;
        }
      } else if (this.type == Type.HENGSANYOUSHANGYI) {
        if (this.x > panelPadding + (clowns - 3) * cell) {
          this.x = panelPadding + (clowns - 3) * cell;
          isupdate = false;
        }
      } else if (this.type == Type.ZUOSHUSANYOUYI) {
        if (this.x > panelPadding + (clowns - 2) * cell) {
          this.x = panelPadding + (clowns - 2) * cell;
          isupdate = false;
        }
      } else if (this.type == Type.SHANGSANZUOXIAYI) {
        if (this.x > panelPadding + (clowns - 3) * cell) {
          this.x = panelPadding + (clowns - 3) * cell;
          isupdate = false;
        }
      } else if (this.type == Type.ZUOSHANGERYOUXIAER) {
        if (this.x > panelPadding + (clowns - 3) * cell) {
          this.x = panelPadding + (clowns - 3) * cell;
          isupdate = false;
        }
      } else if (this.type == Type.ZUOERYOUER) {
        if (this.x > panelPadding + (clowns - 2) * cell) {
          this.x = panelPadding + (clowns - 2) * cell;
          isupdate = false;
        }
      } else if (this.type == Type.SIFANG) {
        if (this.x > panelPadding + (clowns - 2) * cell) {
          this.x = panelPadding + (clowns - 2) * cell;
          isupdate = false;
        }
      } else if (this.type == Type.ZUOERYOUER) {
        if (this.x > panelPadding + (clowns - 2) * cell) {
          this.x = panelPadding + (clowns - 2) * cell;
          isupdate = false;
        }
      } else if (this.type == Type.XIAERSHANGER) {
        if (this.x > panelPadding + (clowns - 3) * cell) {
          this.x = panelPadding + (clowns - 3) * cell;
          isupdate = false;
        }
      } else if (this.type == Type.YISANSI) {
        if (this.x > panelPadding + (clowns - 2) * cell) {  // o
          this.x = panelPadding + (clowns - 2) * cell;// o o
        }
      } else if (this.type == Type.YIERSAN) {
        if (this.x > panelPadding + (clowns - 2) * cell) {  // o o
          this.x = panelPadding + (clowns - 2) * cell;// o
        }
      } else if (this.type == Type.YIERSI) {
        if (this.x > panelPadding + (clowns - 2) * cell) {  // o o
          this.x = panelPadding + (clowns - 2) * cell;//   o
        }
      } else if (this.type == Type.ERSANSI) {
        if (this.x > panelPadding + (clowns - 2) * cell) {  //    o 
          this.x = panelPadding + (clowns - 2) * cell;//  o o
        }
      } else if (this.type == Type.HENGER) {
        if (this.x > panelPadding + (clowns - 1) * cell) {
          this.x = panelPadding + (clowns - 1) * cell;//  o o
        }
      } else if (this.type == Type.SHUER) {
        if (this.x > panelPadding + (clowns - 1) * cell) {  //  o 
          this.x = panelPadding + (clowns - 1) * cell;//  o
        }
      }
    } else if (direction == Direction.UP) {
      this.y = this.y - cell;
    } else if (direction == Direction.DOWN) {
      this.y = this.y + cell;
    }
    if (isupdate) {
      let canUpdate = true;
      for (var i = 0; i < this.list.length;i++){
        var cube = this.list[i];
        let ca = true;
        if (cube.y > panelPadding) {
          ca = cube.canUpdate(direction);
        }
        if (!ca) {
          canUpdate = false;
        }
      }
      if (canUpdate) {
        for (var j = 0; j < this.list.length; j++) {
          var cube = this.list[j];
          cube.setPositionByDirection(direction);
        }
      }
    }
    for (var k = 0; k < this.list.length; k++){
      var cube = this.list[k];
      let cn = this.tetris.pan.canDraw(cube.x, cube.y);
      if (cn==false) {
        if (cube.y <= panelPadding) {
          this.tetris.over = true;
          this.tetris.removeMessages(100);
          this.tetris.palyGameSound(Contant.TETRIS_GAMEOVER);
          // if (this.tetris.pan.scoreI > 0) {
          //   context.showDialog(pan.scoreI);
          // }
        } else {
          this.tetris.pan.addCubes(this.list);
          this.reCreateCube();
        }
        break;
      }
    }
  }
      
  getRect(){
    return [0, 0, 0, 0];
  }

  类型相关
  setType(){
    if (this.type == Type.HENGSIGE) {
      this.setTypeStyle(this.list, Type.SHUSIGE, true, true, false);
    } else if (this.type == Type.SHUSIGE) {
      this.setTypeStyle(this.list, Type.HENGSIGE, true, true, false);
    } else if (this.type == Type.ZUOSHUSANYOUYI) {
      this.setTypeStyle(this.list, Type.HENGSANYOUSHANGYI, true, true, false);
    } else if (this.type == Type.HENGSANYOUSHANGYI) {
      this.setTypeStyle(this.list, Type.SHANGERYOUXIAER, true, true, false);
    } else if (this.type == Type.SHANGERYOUXIAER) {
      this.setTypeStyle(this.list, Type.SHANGSANZUOXIAYI, true, true, false);
    } else if (this.type == Type.SHANGSANZUOXIAYI) {
      this.setTypeStyle(this.list, Type.ZUOSHUSANYOUYI, true, true, false);
    } else if (this.type == Type.ZUOSHANGERYOUXIAER) {
      this.setTypeStyle(this.list, Type.ZUOXIAERYOUSHANGER, true, true, false);
    } else if (this.type == Type.ZUOXIAERYOUSHANGER) {
      this.setTypeStyle(this.list, Type.ZUOSHANGERYOUXIAER, true, true, false);
    } else if (this.type == Type.SIFANG) {
    } else if (this.type == Type.ZUOYIYOUSAN) {				            //   o
      this.setTypeStyle(this.list, Type.XIASANZUOSHANGYI, true, true, false);	//   o
    } else if (this.type == Type.XIASANZUOSHANGYI) {			            // o o
      this.setTypeStyle(this.list, Type.ZUOSANYOUYI, true, true, false);
    } else if (this.type == Type.ZUOSANYOUYI) {
      this.setTypeStyle(this.list, Type.SHANGSANXIAZUOYI, true, true, false);
    } else if (this.type == Type.SHANGSANXIAZUOYI) {
      this.setTypeStyle(this.list, Type.ZUOYIYOUSAN, true, true, false);
    } else if (this.type == Type.ZUOYIYOUSAN) {
      this.setTypeStyle(this.list, Type.ZUOYIYOUSAN, true, true, false);
    } else if (this.type == Type.ZUOERYOUER) {
      this.setTypeStyle(this.list, Type.XIAERSHANGER, true, true, false);
    } else if (this.type == Type.XIAERSHANGER) {
      this.setTypeStyle(this.list, Type.ZUOERYOUER, true, true, false);
    } else if (this.type == Type.ZUOSANYOUZHONGYI) {
      this.setTypeStyle(this.list, Type.SHANGYIXIASAN, true, true, false);
    } else if (this.type == Type.SHANGYIXIASAN) {
      this.setTypeStyle(this.list, Type.ZUOZHONGYIYOUSAN, true, true, false);
    } else if (this.type == Type.ZUOZHONGYIYOUSAN) {
      this.setTypeStyle(this.list, Type.SHANGSANXIAYI, true, true, false);
    } else if (this.type == Type.SHANGSANXIAYI) {
      this.setTypeStyle(this.list, Type.ZUOSANYOUZHONGYI, true, true, false);
    } else if (this.type == Type.YISANSI) {
      this.setTypeStyle(this.list, Type.YIERSAN, true, true, false);
    } else if (this.type == Type.YIERSAN) {
      this.setTypeStyle(this.list, Type.YIERSI, true, true, false);
    } else if (this.type == Type.YIERSI) {
      this.setTypeStyle(this.list, Type.ERSANSI, true, true, false);
    } else if (this.type == Type.ERSANSI) {
      this.setTypeStyle(this.list, Type.YISANSI, true, true, false);
    } else if (this.type == Type.HENGER) {
      this.setTypeStyle(this.list, Type.SHUER, true, true, false);
    } else if (this.type == Type.SHUER) {
      this.setTypeStyle(this.list, Type.HENGER, true, true, false);
    }
  }

  cannotChangeShape(x, y) {
    return !this.tetris.pan.canUpdate(x, y);
  }

      //类型相关
  setTypeStyle(list, typ, limited, changeShape, pre){
    var x = this.x, y = this.y;
    if (pre) {
      x = this.preX;
      y = this.preY;
    }
    let panelPadding = this.tetris.panelPadding;
    let clowns = this.tetris.clowns;
    let cell = this.tetris.cell;
    if (typ == Type.HENGSIGE) {//o o o o 
      if (limited) {
        if (x > panelPadding + (clowns - 4) * cell) {
          x = panelPadding + (clowns - 4) * cell;
        }
      }
      if (changeShape) {
        for (var i= 0; i < list.length;i++){
          if (y >= panelPadding && this.cannotChangeShape(x + cell * i, y)) {
            return;
          }
        }
      }
      for (var i = 0; i < list.length;i++){
        list[i].setPosition(x + cell * i, y);
      }
    } else if (typ == Type.SHUSIGE) {
      if (changeShape) {
        for (var i = 0; i < list.length;i++){
          if (y - cell * i >= panelPadding && this.cannotChangeShape(x, y - cell * i)) {
            return;
          }
        }
      }										                        // o
      for (var i = 0; i < list.length;i++){			  // o
        list[i].setPosition(x, y - cell * i);     // o
      }										                        // o
    } else if (typ == Type.ZUOSHUSANYOUYI) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {
          x = panelPadding + (clowns - 2) * cell;
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
        if (y - cell * 2 >= panelPadding && this.cannotChangeShape(x, y - cell * 2)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
      }
      list[0].setPosition(x, y);            // o
      list[1].setPosition(x, y - cell);     // o
      list[2].setPosition(x, y - cell * 2); // o
      list[3].setPosition(x + cell, y);     // o o
    } else if (typ == Type.HENGSANYOUSHANGYI) {
      if (limited) {
        if (x > panelPadding + (clowns - 3) * cell) {
          x = panelPadding + (clowns - 3) * cell;
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell * 2, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell * 2, y - cell)) return;
      }
      list[0].setPosition(x, y);
      list[1].setPosition(x + cell, y);
      list[2].setPosition(x + cell * 2, y);
      list[3].setPosition(x + cell * 2, y - cell);
    } else if (typ == Type.SHANGERYOUXIAER) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {
          x = panelPadding + (clowns - 2) * cell;
        }
      }
      if (changeShape) {
        if (y - cell * 2 >= panelPadding && this.cannotChangeShape(x, y - cell * 2)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
        if (y - cell * 2 >= panelPadding && this.cannotChangeShape(x + cell, y - cell * 2)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
      }
      list[0].setPosition(x, y - cell * 2);
      list[1].setPosition(x + cell, y - cell);
      list[2].setPosition(x + cell, y - cell * 2);
      list[3].setPosition(x + cell, y);
    } else if (typ == Type.SHANGSANZUOXIAYI) {
      if (limited) {
        if (x > panelPadding + (clowns - 3) * cell) {
          x = panelPadding + (clowns - 3) * cell;
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell * 2, y - cell)) return;
      }
      list[0].setPosition(x, y);
      list[1].setPosition(x, y - cell);
      list[2].setPosition(x + cell, y - cell);
      list[3].setPosition(x + cell * 2, y - cell);
    } else if (typ == Type.ZUOSHANGERYOUXIAER) {
      if (limited) {
        if (x > panelPadding + (clowns - 3) * cell) {
          x = panelPadding + (clowns - 3) * cell;
        }
      }
      if (changeShape) {
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell * 2, y)) return;
      }
      list[0].setPosition(x, y - cell);      // o o
      list[1].setPosition(x + cell, y - cell); //   o o
      list[2].setPosition(x + cell, y);      //
      list[3].setPosition(x + cell * 2, y);
    } else if (typ == Type.ZUOXIAERYOUSHANGER) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {
          x = panelPadding + (clowns - 2) * cell;
        }
      }
      if (changeShape) {
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
        if (y - cell * 2 >= panelPadding && this.cannotChangeShape(x + cell, y - cell * 2)) return;
      }
      list[0].setPosition(x, y - cell);
      list[1].setPosition(x, y);
      list[2].setPosition(x + cell, y - cell);
      list[3].setPosition(x + cell, y - cell * 2);
    } else if (typ == Type.SIFANG) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {
          x = panelPadding + (clowns - 2) * cell;
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
      }
      list[1].setPosition(x, y);
      list[2].setPosition(x + cell, y); // o o
      list[0].setPosition(x, y - cell); // o o
      list[3].setPosition(x + cell, y - cell);
    } else if (typ == Type.ZUOYIYOUSAN) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {
          x = panelPadding + (clowns - 2) * cell;
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
        if (y - cell * 2 >= panelPadding && this.cannotChangeShape(x + cell, y - cell * 2)) return;
      }
      list[0].setPosition(x, y);            //    o
      list[1].setPosition(x + cell, y);       //    o
      list[2].setPosition(x + cell, y - cell);  //  o o
      list[3].setPosition(x + cell, y - cell * 2);
    } else if (typ == Type.XIASANZUOSHANGYI) {
      if (limited) {
        if (x > panelPadding + (clowns - 3) * cell) {
          x = panelPadding + (clowns - 3) * cell;
        }
      }
      if (changeShape) {
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell * 2, y)) return;
      }
      list[0].setPosition(x, y - cell);
      list[1].setPosition(x, y);
      list[2].setPosition(x + cell, y);
      list[3].setPosition(x + cell * 2, y);
    } else if (typ == Type.ZUOSANYOUYI) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {
          x = panelPadding + (clowns - 2) * cell;
        }
      }
      if (changeShape) {
        if (y - cell * 2 >= panelPadding && this.cannotChangeShape(x, y - cell * 2)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y - cell * 2 >= panelPadding && this.cannotChangeShape(x + cell, y - 2 * cell)) return;
      }
      list[0].setPosition(x, y - cell * 2);
      list[1].setPosition(x, y - cell);
      list[2].setPosition(x, y);
      list[3].setPosition(x + cell, y - 2 * cell);
    } if (typ == Type.SHANGSANXIAZUOYI) {
      if (limited) {
        if (x > panelPadding + (clowns - 3) * cell) {
          x = panelPadding + (clowns - 3) * cell;
        }
      }
      if (changeShape) {
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + 2 * cell, y - cell)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell * 2, y)) return;
      }
      list[0].setPosition(x, y - cell);
      list[1].setPosition(x + cell, y - cell);
      list[2].setPosition(x + 2 * cell, y - cell);
      list[3].setPosition(x + cell * 2, y);
    } else if (typ == Type.ZUOERYOUER) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {
          x = panelPadding + (clowns - 2) * cell;
        }
      }
      if (changeShape) {
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
        if (y - cell * 2 >= panelPadding && this.cannotChangeShape(x, y - 2 * cell)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
      }
      list[1].setPosition(x, y - cell);   // o
      list[2].setPosition(x, y - 2 * cell); // o o
      list[0].setPosition(x + cell, y);   //   o
      list[3].setPosition(x + cell, y - cell);
    } else if (typ == Type.XIAERSHANGER) {
      if (limited) {
        if (x > panelPadding + (clowns - 3) * cell) {
          x = panelPadding + (clowns - 3) * cell;
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + 2 * cell, y - cell)) return;
      }
      list[1].setPosition(x, y);
      list[2].setPosition(x + cell, y);
      list[0].setPosition(x + cell, y - cell);
      list[3].setPosition(x + 2 * cell, y - cell);
    } else if (typ == Type.ZUOSANYOUZHONGYI) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {  // o
          x = panelPadding + (clowns - 2) * cell;// o o
        }									 // o
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
        if (y - cell * 2 >= panelPadding && this.cannotChangeShape(x, y - cell * 2)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
      }
      list[1].setPosition(x, y);
      list[2].setPosition(x, y - cell);
      list[0].setPosition(x, y - cell * 2);
      list[3].setPosition(x + cell, y - cell);
    } else if (typ == Type.SHANGYIXIASAN) {
      if (limited) {
        if (x > panelPadding + (clowns - 3) * cell) {  //   o
          x = panelPadding + (clowns - 3) * cell;// o o o
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell * 2, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
      }
      list[1].setPosition(x, y);
      list[2].setPosition(x + cell, y);
      list[0].setPosition(x + cell * 2, y);
      list[3].setPosition(x + cell, y - cell);
    } else if (typ == Type.ZUOZHONGYIYOUSAN) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {  //   o
          x = panelPadding + (clowns - 2) * cell;// o o
        }									 //   o
      }
      if (changeShape) {
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
        if (y - cell * 2 >= panelPadding && this.cannotChangeShape(x + cell, y - 2 * cell)) return;
      }
      list[1].setPosition(x, y - cell);
      list[2].setPosition(x + cell, y);
      list[0].setPosition(x + cell, y - cell);
      list[3].setPosition(x + cell, y - 2 * cell);
    } else if (typ == Type.SHANGSANXIAYI) {
      if (limited) {
        if (x > panelPadding + (clowns - 3) * cell) {  // o o o
          x = panelPadding + (clowns - 3) * cell;//   o
        }
      }
      if (changeShape) {
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + 2 * cell, y - cell)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
      }
      list[1].setPosition(x, y - cell);
      list[2].setPosition(x + cell, y - cell);
      list[0].setPosition(x + 2 * cell, y - cell);
      list[3].setPosition(x + cell, y);
    } else if (typ == Type.YISANSI) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {  // o
          x = panelPadding + (clowns - 2) * cell;// o o
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
      }
      list[0].setPosition(x, y);
      list[1].setPosition(x + cell, y);
      list[2].setPosition(x, y - cell);
    } else if (typ == Type.YIERSAN) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {  // o o
          x = panelPadding + (clowns - 2) * cell;// o
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
      }
      list[0].setPosition(x, y);
      list[1].setPosition(x + cell, y - cell);
      list[2].setPosition(x, y - cell);
    } else if (typ == Type.YIERSI) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {  // o o
          x = panelPadding + (clowns - 2) * cell;//   o
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
      }
      list[0].setPosition(x + cell, y);
      list[1].setPosition(x + cell, y - cell);
      list[2].setPosition(x, y - cell);
    } else if (typ == Type.ERSANSI) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {  //    o 
          x = panelPadding + (clowns - 2) * cell;      //  o o
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x + cell, y - cell)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
      }
      list[0].setPosition(x, y);
      list[1].setPosition(x + cell, y - cell);
      list[2].setPosition(x + cell, y);
    } else if (typ == Type.HENGER) {
      if (limited) {
        if (x > panelPadding + (clowns - 2) * cell) {
          x = panelPadding + (clowns - 2) * cell;//  o o
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y >= panelPadding && this.cannotChangeShape(x + cell, y)) return;
      }
      list[0].setPosition(x, y);
      list[1].setPosition(x + cell, y);
    } else if (typ == Type.SHUER) {
      if (limited) {
        if (x > panelPadding + (clowns - 1) * cell) {  //  o 
          x = panelPadding + (clowns - 1) * cell;//  o
        }
      }
      if (changeShape) {
        if (y >= panelPadding && this.cannotChangeShape(x, y)) return;
        if (y - cell >= panelPadding && this.cannotChangeShape(x, y - cell)) return;
      }
      list[0].setPosition(x, y);
      list[1].setPosition(x, y - cell);
    }
    if (!pre) {
      this.type = typ;
    }
    // invalidate();
  }
      
  drawSelf(canvas){
    for (var i=0;i<this.list.length;i++){
      var cube = this.list[i];
      cube.drawSelf(canvas);
    }
    this.drawPreview(canvas);
  }
      
  drawPreview(canvas){
    for (var i = 0; i < this.pre.length; i++){
      var cube = this.pre[i];
      cube.drawPriview(canvas);
    }
  }

  reCreateCube() {
    this.list = [];
    this.pre = [];
    this.x = this.tetris.panelPadding + this.tetris.cell * 2;
    this.y = this.tetris.panelPadding;
    this.setColor(this.nextColor);
    for (let i = 0; i < this.nextNumber; i++) {
      this.list[this.list.length] = new Cube(this.x, this.y, this.color, this.tetris);
    }
    this.setTypeStyle(this.list, this.nextType, true, false, false);
    this.nextType = this.getRandomType();
    this.nextColor = this.getColor(this.nextType);
    this.nextNumber = this.getNumber(this.nextType);

    for (let i = 0; i < this.nextNumber; i++) {
      this.pre[this.pre.length] = new Cube(this.x, this.y, this.nextColor, this.tetris);
    }
    this.setTypeStyle(this.pre, this.nextType, false, false, true);
  }
      
  getNumber(typ) {
    if (typ == Type.HENGSIGE || typ == Type.SHUSIGE) {
      return 4;
    } else if (typ == Type.ZUOSHUSANYOUYI
      || typ == Type.HENGSANYOUSHANGYI
      || typ == Type.SHANGERYOUXIAER
      || typ == Type.SHANGSANZUOXIAYI) {
      return 4;
    } else if (typ == Type.ZUOSHANGERYOUXIAER
      || typ == Type.ZUOXIAERYOUSHANGER) {
      return 4;
    } else if (typ == Type.SIFANG) {
      return 4;
    } else if (typ == Type.ZUOYIYOUSAN
      || typ == Type.XIASANZUOSHANGYI
      || typ == Type.ZUOSANYOUYI
      || typ == Type.SHANGSANXIAZUOYI) {
      return 4;
    } else if (typ == Type.ZUOERYOUER || typ == Type.XIAERSHANGER) {
      return 4;
    } else if (typ == Type.ZUOSANYOUZHONGYI
      || typ == Type.SHANGYIXIASAN
      || typ == Type.ZUOZHONGYIYOUSAN
      || typ == Type.SHANGSANXIAYI) {
      return 4;
    } else if (typ == Type.YISANSI
      || typ == Type.YIERSAN
      || typ == Type.YIERSI
      || typ == Type.ERSANSI) {
      return 3;
    } else if (typ == Type.HENGER
      || typ == Type.SHUER) {
      return 2;
    }
    return 0;
  }

  setColor(color) {
    this.color = color;
  }

  getColor(typ) {
    // if (typ == Type.HENGSIGE 
    //   || typ == Type.SHUSIGE) {
    //   return '#93069c';
    // } else if (typ == Type.ZUOSHUSANYOUYI
    //   || typ == Type.HENGSANYOUSHANGYI
    //   || typ == Type.SHANGERYOUXIAER
    //   || typ == Type.SHANGSANZUOXIAYI) {
    //   return '#045d02';
    // } else if (typ == Type.ZUOSHANGERYOUXIAER
    //   || typ == Type.ZUOXIAERYOUSHANGER) {
    //   return '#01616c';
    // } else if (typ == Type.SIFANG) {
    //   return '#01186e';
    // } else if (typ == Type.ZUOYIYOUSAN
    //   || typ == Type.XIASANZUOSHANGYI
    //   || typ == Type.ZUOSANYOUYI
    //   || typ == Type.SHANGSANXIAZUOYI) {
    //   return '#58016e';
    // } else if (typ == Type.ZUOERYOUER 
    //   || typ == Type.XIAERSHANGER) {
    //   return '#6d0312';
    // } else if (typ == Type.ZUOSANYOUZHONGYI
    //   || typ == Type.SHANGYIXIASAN
    //   || typ == Type.ZUOZHONGYIYOUSAN
    //   || typ == Type.SHANGSANXIAYI) {
    //   return '#4c3602';
    // } else if (typ == Type.YISANSI
    //   || typ == Type.YIERSAN
    //   || typ == Type.YIERSI
    //   || typ == Type.ERSANSI) {
    //   return '#fcf60f';
    // } else if (typ == Type.HENGER
    //   || typ == Type.SHUER) {
    //   return '#fc36f4';
    // }
    return '#000000';
  }

}