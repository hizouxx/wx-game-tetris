import MultipleCube from './MultipleCube'
import Pan from './Pan'
import Circle from './Circle'
// import Triangle from './Triangle'
import Music from '../runtime/music'
const Contant = require('./Contant.js').Contant
const Type = require('./Type.js').Type
const Direction = require('./Direction.js').Direction
const continueC = '#00ff00';
const darkC = '#2b2b2b';
const stopC = '#ff0000';
const pauseC = '#ffff00';

const ctx = canvas.getContext('2d')
let width = canvas.width;
let height = canvas.height;
const btnimgpath = "images/game_btn.png"

export default class Tetris{
  constructor(){
    this.CustomHeight = 0
    wx.getSystemInfo({
      success: e => {
        let custom = wx.getMenuButtonBoundingClientRect();
        this.CustomHeight = custom.bottom + custom.top;
        console.log('this.CustomHeight', this.CustomHeight)
      }
    })
    this.panelWidth = 0;
    this.panelHeight=0;
    this.panelPadding = 5;
    this.numEct = 0;
    this.btnimg = new Image();
    this.btnimg.src = btnimgpath;
    this.cell = 80;
    this.controlSize = 100;
    this.bg;
    this.press = false;
    this.rows = 20, this.clowns = 10;
    this.pause = false;
    this.over = false;
    this.canStart = false;
    // this.musicBtm, this.btn, this.playBtm, this.soundBtm;
    this.multipleCube;
    this.pan;
    this.timeWidth;
    this.soundOnOff = true;
    this.animal = true;
    this.updataTimeDruing = 500;
    this.render = true;
    this.timer;
    this.music = new Music();
    this.init();
    this.initTouchEvent();
  }

  init(context) {
    this.panelWidth = width * 3 / 7;
    this.cell = parseInt((this.panelWidth - this.panelPadding * 2) / 10);
    this.panelHeight = this.cell * 20 + this.panelPadding * 2;
    this.timeWidth = (width - this.panelWidth - this.panelPadding * 2) / 16;

    this.controlSize = parseInt((height - this.panelHeight - this.cell * 2) / 3);

    this.bg = [0, 0, width, height];

    this.initControl();

    this.pan = new Pan(this);
    this.multipleCube = new MultipleCube(Type.ERSANSI, this.panelPadding + this.cell * 2, this.panelPadding,this);
    this.updateUI();
    // this.requestAnimation();
  }

  palyGameSound(typ){
    if (this.soundOnOff) {
      this.music.playSound(typ);
    }
  }

  initControl() {
    this.leftC = new Circle(width * 0.2, (height - this.CustomHeight - this.panelHeight) / 2 + this.CustomHeight + this.panelHeight, width*0.1, this.btnimg);
    // this.leftT = new Triangle(width * 0.2, (height - this.CustomHeight - this.panelHeight) / 2 + this.CustomHeight + this.panelHeight, width*0.02, width*0.03, Direction.LEFT);
    
    this.rightC = new Circle(width * 0.5, (height - this.CustomHeight - this.panelHeight) / 2 + this.CustomHeight + this.panelHeight, width*0.1, this.btnimg);
    // this.rightT = new Triangle(width * 0.5, (height - this.CustomHeight - this.panelHeight) / 2 + this.CustomHeight + this.panelHeight, width*0.02, width*0.03, Direction.RIGHT);

    this.upC = new Circle(width * 0.35, (height - this.CustomHeight - this.panelHeight) / 2 + this.CustomHeight + this.panelHeight - width*0.15, width*0.1, this.btnimg);
    // this.upT = new Circle(width * 0.35, (height - this.CustomHeight - this.panelHeight) / 2 + this.CustomHeight + this.panelHeight - width*0.15, width*0.02, undefined);

    this.downC = new Circle(width * 0.35, (height - this.CustomHeight - this.panelHeight) / 2 + this.CustomHeight + this.panelHeight + width*0.15, width*0.1, this.btnimg);
    // this.downT = new Triangle(width * 0.35, (height - this.CustomHeight - this.panelHeight) / 2 + this.CustomHeight + this.panelHeight + width*0.15, width*0.02, width*0.03, Direction.DOWN);

    this.palyC = new Circle(width * 0.8, (height - this.CustomHeight - this.panelHeight) / 2 + this.CustomHeight + this.panelHeight + width*0.1, width*0.05, this.btnimg);

    this.etc1 = new Circle(width*0.7, this.CustomHeight + this.panelHeight + (height - this.panelHeight - this.CustomHeight) * 0.1, width*0.015, undefined);
    this.etc1.setColor("#2b2b2b");

    this.etc2 = new Circle(width*0.75, this.CustomHeight + this.panelHeight + (height - this.panelHeight - this.CustomHeight) * 0.1, width*0.015, undefined);
    this.etc2.setColor("#2b2b2b");

    this.etc3 = new Circle(width*0.8, this.CustomHeight + this.panelHeight + (height - this.panelHeight - this.CustomHeight) * 0.1, width*0.015, undefined);
    this.etc3.setColor("#2b2b2b");

    this.etc4 = new Circle(width*0.85, this.CustomHeight + this.panelHeight + (height - this.panelHeight - this.CustomHeight) * 0.1, width*0.015, undefined);
    this.etc4.setColor("#2b2b2b");

    this.etc5 = new Circle(width*0.9, this.CustomHeight + this.panelHeight + (height - this.panelHeight - this.CustomHeight) * 0.1, width*0.015, undefined);
    this.etc5.setColor("#2b2b2b");

    this.soundC = new Circle(width * 0.8, (height - this.CustomHeight - this.panelHeight) / 2 + this.CustomHeight + this.panelHeight - width*0.1, width*0.05, this.btnimg);
  }

  loop(fun, time) {
    setTimeout(function () {
      fun();
      if (tetris.over == false && tetris.render==true) {
        tetris.loop(fun, time);
      }
    }, time);
  }

  requestAnimation() {
    if (this.animal) {
      window.requestAnimationFrame(
        this.onDraw.bind(this),
        canvas
      )
    }
  }

  invalidate(){
    this.onDraw();
  }

  onDraw() {
    this.drawBackground();
    this.drawCube();
    this.drawPan(ctx);
    this.drawControl();
    this.drawMultipleCube();

    this.drawLeftAndRight()
  }

  drawLeftAndRight () {
    let padli = 3
    let padwai = 4;
    ctx.fillStyle='#000';
    ctx.strokeStyle = '#000';
    let ax1 = padwai / 2;
    let ax2 = padwai / 2 + padli;
    let ay1 = padwai / 2 + this.CustomHeight;
    let ay2 = padwai / 2 + padli + this.CustomHeight;
    let w1 = this.cell - padwai;
    let w2 = this.cell - padwai - padli * 2;
    let h1 = this.cell - padwai;
    let h2 = this.cell - padwai - padli * 2;
    let cell = this.cell
    let cell2 = this.cell * 2
    let cell3 = this.cell * 3
    let cell4 = this.cell * 4
    let cell5 = this.cell * 5
    let cell6 = this.cell * 6
    let cell7 = this.cell * 7
    let cell8 = this.cell * 8
    let cell9 = this.cell * 9
    let cell10 = this.cell * 10
    let cell11 = this.cell * 11
    let cell12 = this.cell * 12
    let cell13 = this.cell * 13
    let cell14 = this.cell * 14
    let cell15 = this.cell * 15
    let cell16 = this.cell * 16
    let cell17 = this.cell * 17
    let cell18 = this.cell * 18
    let cell19 = this.cell * 19
    let cell20 = this.cell * 20

    ctx.strokeRect(ax1 + cell, ay1 + cell, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell3, w1, h1);
    ctx.fillRect(ax2 + cell, ay2 + cell3, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell2, w1, h1);
    ctx.fillRect(ax2 + cell, ay2 + cell2, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell2, w1, h1);
    ctx.fillRect(ax2 + cell2, ay2 + cell2, w2, h2);

    ctx.strokeRect(ax1 + cell2, ay1+ cell5, w1, h1);
    ctx.fillRect(ax2+ cell2, ay2+ cell5, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell7, w1, h1);
    ctx.fillRect(ax2 + cell, ay2 + cell7, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell6, w1, h1);
    ctx.fillRect(ax2 + cell, ay2 + cell6, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell6, w1, h1);
    ctx.fillRect(ax2 + cell2, ay2 + cell6, w2, h2);

    ctx.strokeRect(ax1 + cell, ay1 + cell9, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell9, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell11, w1, h1);
    ctx.fillRect(ax2 + cell, ay2 + cell11, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell10, w1, h1);
    ctx.fillRect(ax2 + cell, ay2 + cell10, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell9, w1, h1);
    ctx.fillRect(ax2 + cell2, ay2 + cell9, w2, h2);

    ctx.strokeRect(ax1 + cell, ay1 + cell13, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell13, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell14, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell14, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell16, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell16, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell16, w1, h1);
    ctx.fillRect(ax2+ cell2, ay2 + cell16, w2, h2);

    ctx.strokeRect(ax1 + cell, ay1 + cell18, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell18, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell19, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell19, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell18, w1, h1);
    ctx.fillRect(ax2+ cell2, ay2 + cell18, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell19, w1, h1);
    ctx.fillRect(ax2+ cell2, ay2 + cell19, w2, h2);



    ax1 = width - padwai / 2 - cell4;
    ax2 = width - padwai / 2 + padli - cell4;

    ctx.strokeRect(ax1 + cell2, ay1, w1, h1);
    ctx.fillRect(ax2 + cell2, ay2, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell2, w1, h1);
    ctx.fillRect(ax2 + cell2, ay2 + cell2, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell3, w1, h1);
    ctx.fillRect(ax2 + cell2, ay2 + cell3, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell, w1, h1);
    ctx.fillRect(ax2 + cell2, ay2 + cell, w2, h2);

    ctx.strokeRect(ax1 + cell2, ay1+ cell5, w1, h1);
    ctx.fillRect(ax2+ cell2, ay2+ cell5, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell6, w1, h1);
    ctx.fillRect(ax2 + cell, ay2 + cell6, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell6, w1, h1);
    ctx.fillRect(ax2 + cell2, ay2 + cell6, w2, h2);

    ctx.strokeRect(ax1 + cell, ay1 + cell9, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell9, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell8, w1, h1);
    ctx.fillRect(ax2 + cell, ay2 + cell8, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell9, w1, h1);
    ctx.fillRect(ax2 + cell2, ay2 + cell9, w2, h2);

    ctx.strokeRect(ax1 + cell, ay1 + cell11, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell11, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell11, w1, h1);
    ctx.fillRect(ax2+ cell2, ay2 + cell11, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell12, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell12, w2, h2);

    ctx.strokeRect(ax1 + cell, ay1 + cell14, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell14, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell14, w1, h1);
    ctx.fillRect(ax2+ cell2, ay2 + cell14, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell15, w1, h1);
    ctx.fillRect(ax2+ cell2, ay2 + cell15, w2, h2);


    ctx.strokeRect(ax1 + cell, ay1 + cell17, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell17, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell18, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell18, w2, h2);
    ctx.strokeRect(ax1 + cell, ay1 + cell19, w1, h1);
    ctx.fillRect(ax2+ cell, ay2 + cell19, w2, h2);
    ctx.strokeRect(ax1 + cell2, ay1 + cell19, w1, h1);
    ctx.fillRect(ax2+ cell2, ay2 + cell19, w2, h2);
  }

  drawBackground() {
    // ctx.fillStyle = Contant.TETRIS_BG;
    ctx.fillStyle = '#efcc19';
    let bgarr = this.bg;
    ctx.fillRect(bgarr[0], bgarr[1], bgarr[2], bgarr[3]);
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#9ead86';
    ctx.fillRect(width / 7, this.CustomHeight, width * 5 / 7, this.panelHeight);
  }

  drawCube(canvas) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    let padding = width / 7

    ctx.beginPath();
    //up
    ctx.moveTo(padding, 0 + this.CustomHeight);
    ctx.lineTo(width - padding, 0 + this.CustomHeight);
    ctx.stroke();

    //down
    ctx.moveTo(padding, this.panelHeight + this.CustomHeight);
    ctx.lineTo(width - padding, this.panelHeight + this.CustomHeight);
    ctx.stroke();

    //left
    ctx.moveTo(padding, 0 + this.CustomHeight);
    ctx.lineTo(padding, this.panelHeight + this.CustomHeight);
    ctx.stroke();

    //right
    ctx.moveTo(width - padding, 0 + this.CustomHeight);
    ctx.lineTo(width - padding, this.panelHeight + this.CustomHeight);
    ctx.stroke();

    //middle
    ctx.moveTo(this.panelWidth - this.panelPadding / 2 + padding, 0 + this.CustomHeight);
    ctx.lineTo(this.panelWidth - this.panelPadding / 2 + padding, this.panelHeight + this.CustomHeight);
    ctx.stroke();
    ctx.closePath();
  }

  drawControl() {
    // ctx.fillStyle='#efcc19';
    // ctx.fillRect(0, parseInt(this.panelHeight) + this.CustomHeight, width, height - parseInt(this.panelHeight) - this.CustomHeight);
    // ctx.fillRect(0, 0, width, this.CustomHeight);
    // ctx.fillRect(0, this.CustomHeight, 20, this.panelHeight);
    // ctx.fillRect(width - 20, this.CustomHeight, 20, this.panelHeight);

    this.leftC.drawSelf(ctx);
    this.rightC.drawSelf(ctx);
    this.upC.drawSelf(ctx);
    this.downC.drawSelf(ctx);
    this.palyC.drawSelf(ctx);
    this.soundC.drawSelf(ctx);

    ctx.fillStyle='#000000';
    // this.leftT.drawSelf(ctx);
    // this.rightT.drawSelf(ctx);
    // this.upT.drawSelf(ctx);
    // this.downT.drawSelf(ctx);

    var fontsize = 15;
    ctx.font = fontsize+"px 楷体";
    ctx.fillText("开始/暂停", this.palyC.getCx() - fontsize * 2.1, this.palyC.getCy() + this.palyC.getRadius() + fontsize);
    ctx.fillText("声音", this.soundC.getCx() - fontsize, this.soundC.getCy() + this.soundC.getRadius() + fontsize);

    this.etc1.drawColorSelf(ctx);
    this.etc2.drawColorSelf(ctx);
    this.etc3.drawColorSelf(ctx);
    this.etc4.drawColorSelf(ctx);
    this.etc5.drawColorSelf(ctx);
  } 

  initTouchEvent(){
    wx.onTouchStart(function (event) {
      tetris.press = true;
      var e = event.touches[0];
      var cx = e.screenX;
      var cy = e.screenY;
      var x = e.pageX;
      var y = e.pageY;
      tetris.control(x, y);
    });
    wx.onTouchMove(function (event) {

    });
    wx.onTouchEnd(function (event) {

    });
  }
  
  // onTouchEvent(event) {
  //   var cx = event.getX();
  //   var cy = event.getY();
  //   if (event.getAction() == MotionEvent.ACTION_DOWN) {
  //   } else if (event.getAction() == MotionEvent.ACTION_MOVE) {
  //     if (press) {
  //       this.controlMove(cx, cy);
  //     }
  //   } else if (event.getAction() == MotionEvent.ACTION_UP) {
  //     press = false;
  //     this.controlUp(cx, cy);
  //   } else if (event.getAction() == MotionEvent.ACTION_CANCEL) {
  //     press = false;
  //     this.controlUp(cx, cy);
  //   }
  //   return true;
  // } 
  
  // private long lastTime;

  // controlMove(cx, cy) {
  //   if (System.currentTimeMillis() - lastTime < 100) {
  //     return;
  //   }
  //   if (leftC.contains(cx, cy)) {
  //     //			multipleCube.setDirection(Direction.LEFT);
  //   } else if (upC.contains(cx, cy)) {
  //   } else if (rightC.contains(cx, cy)) {
  //     //			multipleCube.setDirection(Direction.RIGHT);
  //   } else if (downC.contains(cx, cy)) {
  //     if (!(over || pause)) {
  //       multipleCube.setDirection(Direction.DOWN);
  //     }
  //   }
  //   lastTime = System.currentTimeMillis();
  // }

  control(cx, cy) {
    if (this.leftC.contains(cx, cy)) {
      if (!(this.over || this.pause)) {
        this.palyGameSound(Contant.TETRIS_MOVE);
        this.multipleCube.setDirection(Direction.LEFT);
      }
    } else if (this.upC.contains(cx, cy)) {
      if (!(this.over || this.pause)) {
        this.palyGameSound(Contant.TETRIS_ROTATE);
        this.multipleCube.setType();
      }
    } else if (this.rightC.contains(cx, cy)) {
      if (!(this.over || this.pause)) {
        this.palyGameSound(Contant.TETRIS_MOVE);
        this.multipleCube.setDirection(Direction.RIGHT);
      }
    } else if (this.downC.contains(cx, cy)) {
      if (!(this.over || this.pause)) {
        this.palyGameSound(Contant.TETRIS_MOVE);
        this.multipleCube.setDirection(Direction.DOWN);
      }
    } else if (this.soundC.contains(cx, cy)) {
      this.soundOnOff = !this.soundOnOff;
      if (this.pause) {
        return
      }
      if (this.soundOnOff) {
        this.music.playBgm()
      } else {
        this.music.stopBgm()
      }
      
    } else if (this.palyC.contains(cx, cy)) {
      if (this.over) {
        this.over = false;
        this.pan.scoreI = 0;
        this.pan.score.updateNumber(this.pan.scoreI);
        this.canStart = false;
        this.removeMessages(100);
        this.multipleCube.restart();
        this.updateUI();
        this.palyGameSound(Contant.TETRIS_PLAY);
      } else {
        this.pause = !this.pause;
        if (!this.pause) {
          this.removeMessages(100);
          this.updateUI();
        }
      }
    } else {

    }
  }

  updateUI() {
    if (this.over) {
      this.sendEmptyMessageDelayed(200, 1000);
      this.setEtcColor("stop");
      this.invalidate();
      return;
    } else {
      if (!this.pause) {
        this.multipleCube.upDatePosition();
        this.sendEmptyMessageDelayed(100, this.updataTimeDruing);
      } else {
        this.setEtcColor("pause");
        this.invalidate();
        return;
      }
    }
    this.setEtcColor("");
    this.numEct++;
    if (this.numEct > 4) {
      this.numEct = 0;
    }
    this.invalidate();
  }
  setEtcColor(stop) {
    if ("stop"==stop) {
      this.etc1.setColor(stopC);
      this.etc2.setColor(stopC);
      this.etc3.setColor(stopC);
      this.etc4.setColor(stopC);
      this.etc5.setColor(stopC);
    } else if ("pause"==stop) {
      this.etc1.setColor(pauseC);
      this.etc2.setColor(pauseC);
      this.etc3.setColor(pauseC);
      this.etc4.setColor(pauseC);
      this.etc5.setColor(pauseC);
    } else if (this.numEct == 0) {
      this.etc1.setColor(continueC);
      this.etc2.setColor(darkC);
      this.etc3.setColor(darkC);
      this.etc4.setColor(darkC);
      this.etc5.setColor(darkC);
    } else if (this.numEct == 1) {
      this.etc1.setColor(darkC);
      this.etc2.setColor(continueC);
      this.etc3.setColor(darkC);
      this.etc4.setColor(darkC);
      this.etc5.setColor(darkC);
    } else if (this.numEct == 2) {
      this.etc1.setColor(darkC);
      this.etc2.setColor(darkC);
      this.etc3.setColor(continueC);
      this.etc4.setColor(darkC);
      this.etc5.setColor(darkC);
    } else if (this.numEct == 3) {
      this.etc1.setColor(darkC);
      this.etc2.setColor(darkC);
      this.etc3.setColor(darkC);
      this.etc4.setColor(continueC);
      this.etc5.setColor(darkC);
    } else if (this.numEct == 4) {
      this.etc1.setColor(darkC);
      this.etc2.setColor(darkC);
      this.etc3.setColor(darkC);
      this.etc4.setColor(darkC);
      this.etc5.setColor(continueC);
    }
  }

  drawPan() {
    ctx.lineWidth=2;
    ctx.fillStyle='#f00000';
    this.pan.drawSelf(ctx);
  } 

  sendEmptyMessageDelayed(what, delayMillis){
    let that = this;
    this.timer = setTimeout(function(){
      var msg = { what: what,obj:""};
      that.handleMessage(msg);
    }, delayMillis);
  }

  removeMessages(what){
    clearTimeout(this.timer);
  }
  
  handleMessage(msg) {
    switch (msg.what) {
      case 100:
        this.updateUI();
        break;
      case 200:
        this.canStart = true;
        break;
      case 300:
        if (this.multipleCube) {
          this.multipleCube.setDirection(Direction.DOWN);
        }
      case 400:
        this.pan.check();
        break;
      default:
        break;
    }
  }

  drawMultipleCube() {
    canvas.lineWidth=2;
    canvas.fillStyle='#000000';
    this.multipleCube.drawSelf(ctx);
  }

  onResume(sco, method) {
  //   if (pan != null) {
  //     pan.highestScoreI = sco;
  //     pan.highestScore.updateNumber(sco);
  //     if ("continue".equals(method)) {
  //       // List < com.example.dadishu.demo.Cube > cubes = ListDataSave.getDataList(context, "pan_cubes");
  //       if (cubes != null) {
  //         pan.cubes.clear();
  //         // for (com.example.dadishu.demo.Cube cube : cubes){
  //         //   pan.cubes.add(new Cube(cube.getX(), cube.getY(), Contant.BLACK));
  //         // }
  //         pan.re = ListDataSave.getDataArray(context, "pan_re");
  //         pan.scoreI = SharedPreferencesUtils.getLong(context, "pan_scorei", pan.scoreI);
  //         pan.score.updateNumber(pan.scoreI);
  //         pan.speedI = SharedPreferencesUtils.getInt(context, "pan_speedi", pan.speedI);
  //         pan.speed.updateNumber(pan.speedI);
  //         pan.checkPointI = SharedPreferencesUtils.getInt(context, "pan_checkpointi", pan.checkPointI);
  //         pan.checkPoint.updateNumber(pan.checkPointI);
  //         pan.reNum = SharedPreferencesUtils.getInt(context, "pan_renum", pan.reNum);
  //       }
  //     }
  //   }
  }

  onPause() {
    this.removeMessages(100);
  //   if (pan != null && (!over)) {
  //     // List < com.example.dadishu.demo.Cube > cubes = new ArrayList<com.example.dadishu.demo.Cube>();
  //     // for (Cube cube : pan.cubes){
  //     //   com.example.dadishu.demo.Cube cube2 = new com.example.dadishu.demo.Cube();
  //     //   cube2.setX(cube.x);
  //     //   cube2.setY(cube.y);
  //     //   cubes.add(cube2);
  //     // }
  //     if (ListDataSave.setDataList(context, "pan_cubes", cubes)) {
  //       ListDataSave.setDataArray(context, "pan_re", pan.re);
  //       SharedPreferencesUtils.putLong(context, "pan_scorei", pan.scoreI);
  //       SharedPreferencesUtils.putInt(context, "pan_speedi", pan.speedI);
  //       SharedPreferencesUtils.putInt(context, "pan_checkpointi", pan.checkPointI);
  //       SharedPreferencesUtils.putInt(context, "pan_renum", pan.reNum);
  //     }
  //   }
  }
}
let tetris = new Tetris();
window.tetris = tetris;