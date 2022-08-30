let instance
const Contant = require('../mine/Contant.js').Contant

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.bgmAudio = new Audio()
    this.bgmAudio.loop = true
    this.bgmAudio.src  = 'audio/bgm.mp3'

    this.gameover     = new Audio()
    this.gameover.src = 'audio/gameover.wav'

    this.tetrismatch = new Audio()
    this.tetrismatch.src = 'audio/tetrismatch.wav'

    this.tetrismove = new Audio()
    this.tetrismove.src = 'audio/tetrismove.wav'

    this.tetrisplay = new Audio()
    this.tetrisplay.src = 'audio/tetrisplay.wav'

    this.tetrisrotate = new Audio()
    this.tetrisrotate.src = 'audio/tetrisrotate.wav'

    this.playBgm()
  }

  playBgm() {
    this.bgmAudio.play()
  }

  stopBgm() {
    this.bgmAudio.currentTime = 0
    this.bgmAudio.pause()
  }

  playGameover() {
    this.gameover.currentTime = 0
    this.gameover.play()
  }

  playTetrismatch() {
    this.tetrismatch.currentTime = 0
    this.tetrismatch.play()
  }

  playTetrismove() {
    this.tetrismove.currentTime = 0
    this.tetrismove.play()
  }

  playTetrisplay() {
    this.tetrisplay.currentTime = 0
    this.tetrisplay.play()
  }

  playTetrisrotate() {
    this.tetrisrotate.currentTime = 0
    this.tetrisrotate.play()
  }

  playSound(typ){
    switch(typ){
      case Contant.TETRIS_GAMEOVER:
        this.playGameover();
        break;
      case Contant.TETRIS_MATCH:
        this.playTetrismatch();
        break;
      case Contant.TETRIS_MOVE:
        this.playTetrismove();
        break;
      case Contant.TETRIS_PLAY:
        this.playTetrisplay();
        break;
      case Contant.TETRIS_ROTATE:
        this.playTetrisrotate();
        break;
      default:
        break;
    }
  }
}
