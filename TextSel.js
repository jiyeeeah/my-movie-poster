class TextSel {
  constructor() {
    this.Thetext = [];

    this.cx = 200;
    this.cy = 380;
    this.cs = 20;
    this.circledragging = false;

    this.text = [];
    //포스터 내의 텍스트
    this.myText = "";
    //위치
    this.myTextX = stage3yourCanvas.width / 2;
    this.myTextY = stage3yourCanvas.height / 2;
    this.myTextDrag = false;
    this.myTextW = 200;
    this.myTextH = 50;
    this.myTextsize = 20;
    this.myTextColor = 0;

    //Text
    this.space = 50;
    this.textX = [];
    this.textY = [];
    this.textX[0] = 50;
    this.textX[1] = 50;
    this.textX[2] = 50;
    this.textX[3] = 50;
    this.textX[4] = 50;
    this.textY[0] = height / 2 - 300;
    this.textY[1] = height / 2 - 300 + this.space;
    this.textY[2] = height / 2 - 300 + this.space * 2;
    this.textY[3] = height / 2 - 300 + this.space * 3;
    this.textY[4] = height / 2 - 300 + this.space * 4;

    //폰트버튼
    this.TX = 80;
    this.TY = 550;
    this.TS = 70;
    this.textfont = font[movieNum];
    //색상 버튼
    this.bx = this.TX + this.TS / 2;
    this.gx = this.TX + this.TS / 2 + 100;
    this.wx = this.TX + this.TS / 2 + 200;
    this.cBY = 465;
    this.cBS = 50;

    //휴지통
    this.space = 200;
    this.binX = width / 2 + 300 + this.space;
    this.binY = height / 2 - 300 + this.space * 2 + 50;
  }

  //텍스트
  textinput() {
    for (let i = 0; i < 5; i++) {
      this.Thetext[i] = new Array(3);
    }
    this.Thetext[0][0] = "Mood Indigo";
    this.Thetext[0][1] = "당신의 사랑은 어떤 색인가요?";
    this.Thetext[0][2] = "인생 동안 계속 시도하는거야";
    this.Thetext[0][3] = "비글무아 춤을 춰요";
    this.Thetext[0][4] = "The Rest Of My Life";
    this.Thetext[1][0] = "화양연화";
    this.Thetext[1][1] = "In The Mood For Love";
    this.Thetext[1][2] = "미리 이별 연습을 해봅시다";
    this.Thetext[1][3] = "울지 말아요, 연습인데";
    this.Thetext[1][4] = "내게 자리가 있다면 내게로 올 건가요?";
    this.Thetext[2][0] = "SOUL";
    this.Thetext[2][1] = "It's alright";
    this.Thetext[2][2] = "Enjoy your minute!";
    this.Thetext[2][3] = "나는 매 순간순간을 살 거야";
    this.Thetext[2][4] = "당신의 불꽃은 당신의 목적이 아니에요";
  }

  display() {
    noStroke();
    fill(255);
    textFont(mainFont);
    textSize(22);
    textAlign(LEFT);
    text("line", 62, 110);
    text("size", 62, this.cy - 20);
    text("font", 62, this.TY - 20);
    text("color", 62, this.cBY - 35);
    //폰트버튼
    imageMode(CORNER);
    image(fontImage[0], this.TX, this.TY, this.TS, this.TS);
    image(fontImage[1], this.TX + 100, this.TY, this.TS, this.TS);
    image(fontImage[2], this.TX + 200, this.TY, this.TS, this.TS);
    image(fontImage[3], this.TX + 50, this.TY + 90, this.TS, this.TS);
    image(fontImage[4], this.TX + 150, this.TY + 90, this.TS, this.TS);
    //색상버튼
    fill(0);
    circle(this.bx, this.cBY, this.cBS);
    fill(125);
    circle(this.gx, this.cBY, this.cBS);
    fill(255);
    circle(this.wx, this.cBY, this.cBS);

    imageMode(CENTER);
    //텍스트 (캔버스 밖에) 보여줌
    for (let i = 0; i < 5; i++) {
      fill(200);
      textAlign(CENTER);
      textFont(font[movieNum]);
      textSize(25);
      text(this.Thetext[movieNum][i], this.textX[i], this.textY[i], 350, 300);
    }
    //크기 조절 바
    stroke(255);
    strokeWeight(3);
    line(60, this.cy, 360, this.cy);
    strokeWeight(1);
    fill(201, 116, 56);
    circle(this.cx, this.cy, this.cs);
    if (this.circledragging) {
      this.cx = this.cx + (mouseX - pmouseX);
    }
    if (this.cx <= 60) this.cx = 60;
    if (this.cx >= 350) this.cx = 350;
  }

  canvasDraw() {
    //캔버스 내 아이콘 위치 조절
    if (this.myTextDrag) {
      this.myTextX += mouseX - pmouseX;
      this.myTextY += mouseY - pmouseY;
    }
  }

  canvasDisplay() {
    for (let i = 0; i < this.myText.length; i++) {
      textAlign(CENTER);
      stage3yourCanvas.noStroke();
      stage3yourCanvas.textAlign(CENTER);
      stage3yourCanvas.textSize(this.cx / 5);
      stage3yourCanvas.fill(this.myTextColor);
      stage3yourCanvas.textFont(this.textfont);
      stage3yourCanvas.text(this.myText, this.myTextX, this.myTextY);
    }
  }

  textClick() {
    //캔버스 밖의 텍스트 클릭
    for (let i = 0; i < 5; i++) {
      if (
        mouseX > this.textX[i] &&
        mouseX < this.textX[i] + 300 &&
        mouseY > this.textY[i] &&
        mouseY < this.textY[i] + 40
      ) {
        this.myText = this.Thetext[movieNum][i];
      }
      rectMode(CORNER);
      //캔버스 안의 아이콘 클릭 -> 위치 조
      if (
        mouseX > canX - canW / 2 + this.myTextX - this.myTextW &&
        mouseX < canX - canW / 2 + this.myTextX + this.myTextW &&
        mouseY > canY - canH / 2 + this.myTextY - this.myTextH &&
        mouseY < canY - canH / 2 + this.myTextY + this.myTextH
      ) {
        this.myTextDrag = true;
      }
    }
    //사이즈 조절
    if (dist(mouseX, mouseY, this.cx, this.cy) < this.cs / 2) {
      this.circledragging = true;
    }

    if (
      mouseX > this.TX &&
      mouseX < this.TX + this.TS &&
      (mouseY < this.TY + this.TS) & (mouseY > this.TY)
    ) {
      this.textfont = font[0];
    }
    if (
      mouseX > this.TX + 100 &&
      mouseX < this.TX + this.TS + 100 &&
      (mouseY < this.TY + this.TS) & (mouseY > this.TY)
    ) {
      this.textfont = font[1];
    }
    if (
      mouseX > this.TX + 200 &&
      mouseX < this.TX + this.TS + 200 &&
      (mouseY < this.TY + this.TS) & (mouseY > this.TY)
    ) {
      this.textfont = font[2];
    }
    if (
      mouseX > this.TX + 50 &&
      mouseX < this.TX + this.TS + 50 &&
      (mouseY < this.TY + this.TS + 90) & (mouseY > this.TY + 90)
    ) {
      this.textfont = font[3];
    }
    if (
      mouseX > this.TX + 150 &&
      mouseX < this.TX + this.TS + 150 &&
      (mouseY < this.TY + this.TS + 90) & (mouseY > this.TY + 90)
    ) {
      this.textfont = font[4];
    }
    //색상
    if (dist(mouseX, mouseY, this.bx, this.cBY) < this.cBS / 2) {
      this.myTextColor = 0;
    }
    if (dist(mouseX, mouseY, this.gx, this.cBY) < this.cBS / 2) {
      this.myTextColor = 125;
    }
    if (dist(mouseX, mouseY, this.wx, this.cBY) < this.cBS / 2) {
      this.myTextColor = 255;
    }

    //휴지통
    if (
      mouseX > this.binX - (binCloseImage.width * 0.5) / 2 &&
      mouseX < this.binX + (binCloseImage.width * 0.5) / 2 &&
      mouseY > this.binY - (binCloseImage.height * 0.5) / 2 &&
      mouseY < this.binY + (binCloseImage.height * 0.5) / 2
    ) {
      this.myText = "";
      this.myTextX = stage3yourCanvas.width / 2;
      this.myTextY = stage3yourCanvas.height / 2;
      this.myTextDrag = false;
      this.myTextW = 200;
      this.myTextH = 50;
      this.myTextsize = 20;
    }
  }

  textRelease() {
    this.myTextDrag = false;
    this.circledragging = false;
  }
  cursor() {
    for (let i = 0; i < 5; i++) {
      if (
        mouseX > this.textX[i] &&
        mouseX < this.textX[i] + 300 &&
        mouseY > this.textY[i] &&
        mouseY < this.textY[i] + 40
      ) {
        cursor(HAND);
      }
    }
    if (
      dist(mouseX, mouseY, this.cx, this.cy) < this.cs / 2 ||
      (mouseX > this.TX &&
        mouseX < this.TX + this.TS &&
        (mouseY < this.TY + this.TS) & (mouseY > this.TY)) ||
      (mouseX > this.TX + 100 &&
        mouseX < this.TX + this.TS + 100 &&
        (mouseY < this.TY + this.TS) & (mouseY > this.TY)) ||
      (mouseX > this.TX + 200 &&
        mouseX < this.TX + this.TS + 200 &&
        (mouseY < this.TY + this.TS) & (mouseY > this.TY)) ||
      (mouseX > this.TX + 50 &&
        mouseX < this.TX + this.TS + 50 &&
        (mouseY < this.TY + this.TS + 90) & (mouseY > this.TY + 90)) ||
      (mouseX > this.TX + 150 &&
        mouseX < this.TX + this.TS + 150 &&
        (mouseY < this.TY + this.TS + 90) & (mouseY > this.TY + 90)) ||
      dist(mouseX, mouseY, this.bx, this.cBY) < this.cBS / 2 ||
      dist(mouseX, mouseY, this.gx, this.cBY) < this.cBS / 2 ||
      dist(mouseX, mouseY, this.wx, this.cBY) < this.cBS / 2
    ) {
      cursor(HAND);
    }
  }
}
