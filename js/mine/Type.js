
const types={
/**
 * o o o o
 */
HENGSIGE :'HENGSIGE',//|
  /**
   *  @see [o]
   *  @see [o]
   *  @see [o o]
   */
  ZUOSHUSANYOUYI :'ZUOSHUSANYOUYI',//|_
  /**
   *  @see [o o]
   *  @see [x o o]
   */
  ZUOSHANGERYOUXIAER :'ZUOSHANGERYOUXIAER',
  /**
   *  @see [x o]
   *  @see [x o]
   *  @see [o o]
   */
  ZUOYIYOUSAN :'ZUOYIYOUSAN',//|_
  /**
   *  @see [o]
   *  @see [o o]
   *  @see [x o]
   */
  ZUOERYOUER :'ZUOERYOUER',
  /**
   *  @see [o]
   *  @see [o o]
   *  @see [o]
   */
  ZUOSANYOUZHONGYI :'ZUOSANYOUZHONGYI',
  /**
   *  @see [o x]
   *  @see [o o]
   */
  YISANSI :'YISANSI',
  /**
   * @see [o]
   * @see [o]
   * @see [o]
   * @see [o]
   */
  SHUSIGE :'SHUSIGE',//____
  /**
   *  @see [x x o]
   *  @see [o o o]
   */
  HENGSANYOUSHANGYI :'HENGSANYOUSHANGYI',//___|
  /**
   *  @see [x o]
   *  @see [o o o]
   */
  SHANGYIXIASAN :'SHANGYIXIASAN',
  /**
   *  @see [o x x]
   *  @see [o o o]
   */
  XIASANZUOSHANGYI :'XIASANZUOSHANGYI',//___|
  /**
   *  @see [o o]
   *  @see [o ]
   */
  YIERSAN :'YIERSAN',
  /**
   *  @see [o o]
   *  @see [x o]
   *  @see [x o]
   */
  SHANGERYOUXIAER :'SHANGERYOUXIAER',//--|
  /**
   *  @see [x o]
   *  @see [o o]
   *  @see [x o]
   */
  ZUOZHONGYIYOUSAN :'ZUOZHONGYIYOUSAN',
  /**
   *  @see [o o]
   *  @see [x o]
   */
  YIERSI :'YIERSI',
  /**
   *  @see [o o]
   */
  HENGER :'HENGER',
  /**
   *  @see [o o o]
   *  @see [o x x]
   */
  SHANGSANZUOXIAYI :'SHANGSANZUOXIAYI',//|---
  /**
   *  @see [x o]
   *  @see [o o]
   *  @see [o x]
   */
  ZUOXIAERYOUSHANGER :'ZUOXIAERYOUSHANGER',
  /**
   *  @see [o o]
   *  @see [o o]
   */
  SIFANG :'SIFANG',
  /**
   *  @see [o o]
   *  @see [o x]
   *  @see [o x]
   */
  ZUOSANYOUYI :'ZUOSANYOUYI',//--|
  /**
   *  @see [o o o]
   *  @see [x x o]
   */
  SHANGSANXIAZUOYI :'SHANGSANXIAZUOYI',//|---
  /**
   *  @see [x o o]
   *  @see [o o]
   */
  XIAERSHANGER :'XIAERSHANGER',
  /**
   *  @see [o o o]
   *  @see [x o x]
   */
  SHANGSANXIAYI :'SHANGSANXIAYI',
  /**
   *  @see [x o]
   *  @see [o o]
   */
  ERSANSI :'ERSANSI',
  /**
   *  @see [o]
   *  @see [o]
   */
  SHUER :'SHUER'
}

const randomType = function(maxnum){
  var rn = parseInt(Math.random() * maxnum);
  var tp = types.HENGSIGE
  if (rn == 0) {
    tp = types.HENGSIGE;
  }else if(rn==1){
    tp = types.ZUOSHUSANYOUYI;
  } else if (rn == 2) {
    tp = types.ZUOSHANGERYOUXIAER;
  } else if (rn == 3) {
    tp = types.ZUOYIYOUSAN;
  } else if (rn == 4) {
    tp = types.ZUOERYOUER;
  } else if (rn == 5) {
    tp = types.ZUOSANYOUZHONGYI;
  } else if (rn == 6) {
    tp = types.YISANSI;
  } else if (rn == 7) {
    tp = types.SHUSIGE;
  } else if (rn == 8) {
    tp = types.HENGSANYOUSHANGYI;
  } else if (rn == 9) {
    tp = types.SHANGYIXIASAN;
  } else if (rn == 10) {
    tp = types.XIASANZUOSHANGYI;
  } else if (rn == 11) {
    tp = types.YIERSAN;
  } else if (rn == 12) {
    tp = types.SHANGERYOUXIAER;
  } else if (rn == 13) {
    tp = types.ZUOZHONGYIYOUSAN;
  } else if (rn == 14) {
    tp = types.YIERSI;
  } else if (rn == 15) {
    tp = types.HENGER;
  } else if (rn == 16) {
    tp = types.SHANGSANZUOXIAYI;
  } else if (rn == 17) {
    tp = types.ZUOXIAERYOUSHANGER;
  } else if (rn == 18) {
    tp = types.SIFANG;
  } else if (rn == 19) {
    tp = types.ZUOSANYOUYI;
  } else if (rn == 20) {
    tp = types.SHANGSANXIAZUOYI;
  } else if (rn == 21) {
    tp = types.XIAERSHANGER;
  } else if (rn == 22) {
    tp = types.SHANGSANXIAYI;
  } else if (rn == 23) {
    tp = types.ERSANSI;
  } else if (rn == 24) {
    tp = types.SHUER;
  }
  return tp;
}

module.exports = {
  Type: types,
  getRandomType: randomType
}