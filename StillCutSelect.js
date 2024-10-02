class StillCutSelect {
  constructor() {
    //캔버스
    this.stillCanvas = createGraphics(400, 600);
    this.canvasX = width / 2;
    this.canvasY = height / 2 - 60;
    //사진 좌표
    this.stillRatio = 0.3;
    this.stillCutX = [];
    this.stillCutY = [];
    this.stillSpace = 200;
    this.stillCutRatio = [];
    for (let i = 0; i < 3; i++) {
      this.stillCutX[i] = this.stillSpace + 20;
      this.stillCutY[i] = this.stillSpace * (i + 1);
      this.stillCutRatio[i] = 0.3;
    }
    //사진 선택
    this.selection = 4;

    //사진 크기 변경
    this.sizeDrag = false;
    this.cx = width / 2 + 30;
    this.cs = 25;
    this.lineLength = 300;
    this.lineY = height / 2 + 280;

    //사진 위치 변경
    this.posDrag = false;
    this.stillX = this.stillCanvas.width / 2;
    this.stillY = this.stillCanvas.height / 2;

    //배경색
    this.cN = 4;
    this.backGC = [];
    for (let movie = 0; movie < 3; movie++) {
      this.backGC[movie] = new Array(4);
    }
    //mood indigo color
    this.backGC[0][0] = color(255, 123, 71);
    this.backGC[0][1] = color(255, 25, 125);
    this.backGC[0][2] = color(0, 57, 71);
    this.backGC[0][3] = color(0, 0, 0); //검정
    this.backGC[0][4] = color(255, 255, 255); //하양
    //mood for love color
    this.backGC[1][0] = color(186, 33, 24);
    this.backGC[1][1] = color(232, 150, 31);
    this.backGC[1][2] = color(61, 32, 37);
    this.backGC[1][3] = color(0, 0, 0); //검정
    this.backGC[1][4] = color(255, 255, 255); //하양
    //soul color
    this.backGC[2][0] = color(71, 157, 237);
    this.backGC[2][1] = color(248, 196, 255);
    this.backGC[2][2] = color(121, 5, 245);
    this.backGC[2][3] = color(0, 0, 0); //검정
    this.backGC[2][4] = color(255, 255, 255); //하양
    //images
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 7; i++) {
        this.backGC[j][i + 5] = canBG[j][i];
      }
    }

    //색바꾸는 버튼
    this.space = 100;
    this.bx = 1000;
    this.bS = 50;
    //배경 이미지 바꾸는
    this.pbx = 900;
  }
  canvasDraw() {
    this.posControl();
    imageMode(CENTER);
    this.stillCanvas.imageMode(CORNER);
    this.stillCanvas.background(this.backGC[movieNum][this.cN]);
    this.stillCanvas.imageMode(CENTER);
    if (this.selection <= 3) {
      let stillImg = stillCutImage[movieNum][stillNum][this.selection];
      this.stillCanvas.image(
        stillImg,
        this.stillX,
        this.stillY,
        stillImg.width * this.stillCutRatio[this.selection],
        stillImg.height * this.stillCutRatio[this.selection]
      );
    }
  }
  display() {
    //캔버스 보여주기
    image(this.stillCanvas, this.canvasX, this.canvasY);

    //3개 사진 보여주기
    for (let i = 0; i < 3; i++) {
      imageMode(CENTER);
      let stillImg = stillCutImage[movieNum][stillNum][i];
      image(
        stillImg,
        this.stillCutX[i],
        this.stillCutY[i],
        stillImg.width * this.stillRatio,
        stillImg.height * this.stillRatio
      );
    }
    textAlign(CENTER);
    textFont(mainFont);
    textSize(30);
    fill(255);
    noStroke();
    text("main image", this.stillCutX[0], this.stillCutY[0] - 120);
  }
  stillCutClick() {
    //캔버스에 올릴 사진 선택
    for (let i = 0; i < 3; i++) {
      let stillImg = stillCutImage[movieNum][stillNum][i];
      if (
        mouseX > this.stillCutX[i] - (stillImg.width / 2) * this.stillRatio &&
        mouseX < this.stillCutX[i] + (stillImg.width / 2) * this.stillRatio &&
        mouseY > this.stillCutY[i] - (stillImg.height / 2) * this.stillRatio &&
        mouseY < this.stillCutY[i] + (stillImg.height / 2) * this.stillRatio
      ) {
        this.selection = i;
      }
    }
  }

  sizeControl() {
    let lineX = width / 2 + 30;
    textFont(mainFont);
    textSize(30);
    textAlign(LEFT);
    fill(255);
    noStroke();
    text("size", width / 2 - canW / 2, this.lineY);

    strokeWeight(5);
    stroke(255);
    line(
      lineX - this.lineLength / 2,
      this.lineY,
      lineX + this.lineLength / 2,
      this.lineY
    );
    if (this.sizeDrag) {
      this.cx += mouseX - pmouseX;
    }
    if (this.cx <= lineX - this.lineLength / 2) {
      this.cx = lineX - this.lineLength / 2;
    } else if (this.cx >= lineX + this.lineLength / 2) {
      this.cx = lineX + this.lineLength / 2;
    }
    this.stillCutRatio[this.selection] = map(
      this.cx,
      lineX - this.lineLength / 2,
      lineX + this.lineLength / 2,
      0,
      1
    );
    fill(201, 116, 56);
    stroke(255);
    strokeWeight(1);
    ellipse(this.cx, this.lineY, this.cs, this.cs);
  }
  //클릭했을때 사이즈,위치 조절할 수 있게!
  sizeControlClick() {
    if (dist(this.cx, this.lineY, mouseX, mouseY) < this.cs / 2) {
      this.sizeDrag = true;
    }
  }
  sizeControlRelease() {
    this.sizeDrag = false;
  }
  posControl() {
    if (this.posDrag) {
      this.stillX += mouseX - pmouseX;
      this.stillY += mouseY - pmouseY;
    }
  }
  posControlClick() {
    if (
      mouseX > canX - canW / 2 + this.stillX - this.stillCanvas.width / 2 &&
      mouseX < canX - canW / 2 + this.stillX + this.stillCanvas.width / 2 &&
      mouseY > canY - canH / 2 + this.stillY - this.stillCanvas.height / 2 &&
      mouseY < canY - canH / 2 + this.stillY + this.stillCanvas.height / 2
    ) {
      this.posDrag = true;
    }
  }
  posControlRelease() {
    this.posDrag = false;
  }

  colorSelectDisplay() {
    textFont(mainFont);
    fill(255);
    noStroke();
    textSize(30);
    textAlign(CENTER);
    text("background", (this.bx + this.pbx) / 2, this.space - 50);
    //색 5개 버튼
    for (let i = 0; i < 5; i++) {
      noStroke();
      fill(this.backGC[movieNum][i]);
      ellipse(this.bx, this.space * (i + 1), this.bS, this.bS);
      if (dist(this.bx, this.space * (i + 1), mouseX, mouseY) <= this.bS / 2) {
        cursor(HAND);
      } else {
        cursor(ARROW);
      }
    }
    //배경 이미지 6개
    for (let i = 0; i < 6; i++) {
      imageMode(CENTER);
      image(
        canBGButton[movieNum][i],
        this.pbx,
        this.space * (i + 1),
        this.bS,
        this.bS
      );
    }
    //배경 이미지 한개 (색 버튼 아래로)
    imageMode(CENTER);
    image(canBGButton[movieNum][6], this.bx, this.space * 6, this.bS, this.bS);
  }
  colorSelectClick() {
    for (let i = 0; i < 5; i++) {
      if (dist(this.bx, this.space * (i + 1), mouseX, mouseY) <= this.bS / 2) {
        this.cN = i;
      }
    }
    for (let i = 0; i < 6; i++) {
      if (dist(this.pbx, this.space * (i + 1), mouseX, mouseY) <= this.bS / 2) {
        this.cN = i + 5;
      }
    }
    if (dist(this.bx, this.space * 6, mouseX, mouseY) <= this.bS / 2) {
      this.cN = 11;
    }
  }
  cursor() {
    for (let i = 0; i < 3; i++) {
      let stillImg = stillCutImage[movieNum][stillNum][i];
      if (
        mouseX > this.stillCutX[i] - (stillImg.width / 2) * this.stillRatio &&
        mouseX < this.stillCutX[i] + (stillImg.width / 2) * this.stillRatio &&
        mouseY > this.stillCutY[i] - (stillImg.height / 2) * this.stillRatio &&
        mouseY < this.stillCutY[i] + (stillImg.height / 2) * this.stillRatio
      ) {
        cursor(HAND);
      }
    }
    if (dist(this.cx, this.lineY, mouseX, mouseY) < this.cs / 2) {
      cursor(HAND);
    }
    for (let i = 0; i < 5; i++) {
      if (
        dist(this.bx, this.space * (i + 1), mouseX, mouseY) <= this.bS / 2 ||
        dist(this.pbx, this.space * (i + 1), mouseX, mouseY) <= this.bS / 2 ||
        dist(this.bx, this.space * 6, mouseX, mouseY) <= this.bS / 2
      ) {
        cursor(HAND);
      }
    }
  }
}
