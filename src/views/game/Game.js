import React, { Component } from 'react';
import bgImg from './img/game_bg_top.png';

require('./css/game.css')

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dogPosition: 1, // (狗狗的位置，默认在1中间 0左边 2右边)
      pisitionName: 'center',
      index: 1, // 狗狗的帧动画,
      top: 0, // 背景高度
      img: null
    }
    this.drawBg = this.drawBg.bind(this)
    this.drawDog = this.drawDog.bind(this)
    this.leftClick = this.leftClick.bind(this)
    this.rightClick = this.rightClick.bind(this)
  }

  componentDidMount() {
    // this.drawBg()
    // this.drawDog()
    let img = new Image()
    img.src = require('./img/game_bg_bottom.png')
    img.onload = () => {
      this.setState({ img: img })
      requestAnimationFrame(this.drawBg)
    }

    requestAnimationFrame(t => this.drawDog(t, 0))
  }

  componentWillUnmount() {
    console.log(222)
  }

  render() {
    let surfaceWidth = window.innerWidth;
    let surfaceHeight = window.innerHeight;
    return (
      <div className="container">
        <div className="bg-container">
          <canvas
            className="canvas-container"
            ref='canvasRef'
          />
          <canvas
            className="canvas-container"
            ref='canvasRef2'
          />
        </div>
        <canvas
          width="75px"
          height="100px"
          className={this.state.pisitionName}
          ref='canvasDog'
        />
        <div className="leftclick" onClick={this.leftClick}></div>
        <div className="rightclick" onClick={this.rightClick}></div>
      </div>
    );
  }

  // 画背景
  // timestamp: 时间戳 elapsed: 已经过去的时间
  drawBg(timestamp = 0, elapsed = 1000 / 1 + 1) {
    let surfaceWidth = window.innerWidth;
    let surfaceHeight = window.innerHeight;
    let top = this.state.top;
    let lay = elapsed;
    let img = this.state.img;

    let bgC = this.refs.canvasRef
    bgC.width = surfaceWidth
    bgC.height = surfaceHeight
    let bgCtx = bgC.getContext("2d")

    // 第二个画背景的canvas
    let bgC2 = this.refs.canvasRef2
    bgC2.width = surfaceWidth
    bgC2.height = surfaceHeight
    let bgCtx2 = bgC2.getContext("2d")


    // let img = new Image()
    // timer = setInterval(() => {
    // img.src = require('./img/game_bg_top.png')
    if (lay > 1000 / 61) {
      if (top >= surfaceHeight) {
        top = 0;
        this.setState({ top: 0 })
      }
      this.clear(bgCtx, surfaceWidth, surfaceHeight)
      this.clear(bgCtx2, surfaceWidth, surfaceHeight)
      bgCtx.fillStyle = '#000';
      bgCtx.fillRect(0, 0, surfaceWidth, surfaceHeight)
      bgCtx.drawImage(img, 0, top, surfaceWidth, surfaceHeight)
      bgCtx2.drawImage(img, 0, -(surfaceHeight - top), surfaceWidth, surfaceHeight)
      top++;
      lay = 0;
      console.log(top)
      this.setState({ top: top })
    }
    requestAnimationFrame(t => this.drawBg(t, lay + t - timestamp))

    // this.clea(bgCtx, surfaceWidth, surfaceHeight)
  }

  // 画狗
  // timestamp: 时间戳 elapsed: 已经过去的时间
  drawDog(timestamp, elapsed) {
    let lay = elapsed;
    let dogC = this.refs.canvasDog
    let ctx = dogC.getContext("2d")
    let img = new Image();
    let index = this.state.index;
    let nowI = this.state.index % 6;
    // 帧动画结束回到初始化状态
    if (lay > 1000 / 6) {
      lay = 0;
      index++;
      this.setState({ index: index })
    }
    if (this.state.index === 6) this.state.index = 1;
    img.src = require('./img/dog/' + nowI + '.png')
    // 绘图
    img.onload = () => {
      this.clear(ctx, 75, 100)
      ctx.drawImage(img, 0, 0, 75, 100)
      requestAnimationFrame(t => this.drawDog(t, lay + t - timestamp))
    }
  }

  // 清空画布
  clear(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
  }

  // 点击屏幕左侧
  leftClick() {
    let nowPosition = this.state.dogPosition
    let nextPosition = null
    let nowpisitionName = null
    switch (nowPosition) {
      case 0:
        nextPosition = 0
        nowpisitionName = 'left'
        console.log('不能再往右边了')
        break;
      case 1:
        nextPosition = 0
        nowpisitionName = 'left'
        break;
      case 2:
        nextPosition = 1
        nowpisitionName = 'center'
        break;
      default: return
    }
    this.setState({
      dogPosition: nextPosition,
      pisitionName: nowpisitionName
    })
    console.log(this.state.dogPosition)
  }

  // 点击屏幕右侧
  rightClick() {
    let nowPosition = this.state.dogPosition
    let nextPosition = null
    let nowpisitionName = null
    switch (nowPosition) {
      case 0:
        nextPosition = 1
        nowpisitionName = 'center'
        break;
      case 1:
        nextPosition = 2
        nowpisitionName = 'right'
        break;
      case 2:
        nextPosition = 2
        nowpisitionName = 'right'
        console.log('不能再往右边了')
        break;
      default: return
    }
    this.setState({
      dogPosition: nextPosition,
      pisitionName: nowpisitionName
    })
    console.log(this.state.dogPosition)
  }
}

export default Game;