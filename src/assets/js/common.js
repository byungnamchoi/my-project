class Tetris {
  constructor(ctx) {
    this.ctx = canvas.getContext('2d');
    this.canvasOffsetTop = canvas.clientTop
    this.canvasOffsetRight = canvas.clientLeft + canvas.width
    this.canvasOffsetBottom = canvas.clientTop + canvas.height
    this.canvasOffsetLeft = canvas.clientLeft
    this.shapes = [
      {name: 'I', color: 'red'},
      {name: 'L', color: 'green'},
      {name: 'J', color: 'blue'},
      {name: 'T', color: 'yellow'},
      {name: 'O', color: 'skyblue'},
      {name: 'S', color: 'gray'},
      {name: 'Z', color: 'purple'}
    ];
    this.nowShape;
    this.beginX = 30;
    this.beginY = 50;
    this.speed = 30;

    window.onkeydown = (e) => {
      if (e.which == 37) { // left
        this.nowShape = this.drawShape(this.nowShape = this.x - this.speed, this.nowShape = this.y);
      } else if (e.which == 38) { // up
        this.nowShape = this.drawShape(this.nowShape = this.x, this.nowShape = this.y - this.speed);
      } else if (e.which == 39) { // right
        this.nowShape = this.drawShape(this.nowShape = this.x + this.speed, this.nowShape = this.y);
      } else if (e.which == 40) { // bottom
        this.nowShape = this.drawShape(this.nowShape = this.x, this.nowShape = this.y + this.speed);
      }
    }

    this.drawNewShape(2);
    this.draw();
  }

  /*
    로직
    - canvas 테두리 그리기.
    - canvas shape 타입 및 위치 세팅하여 그리기.
    - 키보드 방향키로 shape 이동 시키기.
    - 아래 방향으로 shape 5초 간격으로 이동 시키기.
    - shape 가 canvas 좌/우, 하단 도달했을 경우 체크하여 처리하기.
  */
  drawNewShape(shapesIndex) {
    this.nowShape = this.shape(shapesIndex, this.beginX, this.beginY);
    this.nowShape = this.drawShape(this.beginX, this.beginY);
    return this.nowShape;
  }

  shape(shapesIndex, x, y) {
    console.log(shapesIndex, x, y);
    // 모양 타입
    this.type = this.shapes[shapesIndex];
    // 위치
    this.x = x;
    this.y = y;
    this.ctx.fillStyle = this.type.color;

    // 모양 그리기
    this.drawShape = (nowX, nowY) => {
      console.log(nowX, nowY);
      // 기존 모양 지우기
      this.ctx.clearRect(this.x, this.y, 50, 50);
      this.x = nowX;
      this.y = nowY;
      // 새로운 위치로 모양 그리기
      this.ctx.fillRect(nowX, nowY, 50, 50);
      // this.canvasOffsetTop, this.canvasOffsetRight, this.canvasOffsetBottom, this.canvasOffsetLeft
      // shape 가 canvas 좌/우에 도달했을 경우
      if (this.x >= this.canvasOffsetRight - 50) {
        console.log('right');
        this.x = this.canvasOffsetRight;
      } else if (this.x <= this.canvasOffsetLeft) {
        console.log('left');
        this.x = this.canvasOffsetLeft;
      }
    }
  }

  draw() {
    // canvas 테두리
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(0, 0, this.ctx.canvas.width - 1, this.ctx.canvas.height - 1);
    this.ctx.stroke();
  }
}

const canvas = document.getElementById('canvas');
const tetris = new Tetris(canvas);

/*
  초기화

  블럭 7개,
  마지막 단계(last), 최소 속도(min), 최대 속도(max)
  점수,
  블럭 미리보기,
*/
