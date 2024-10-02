class Icon {
  constructor() {
    //포스터 내의 아이콘
    this.myIcon = [];
    //위치
    this.myIconX = [];
    this.myIconY = [];
    this.myIconDrag = [];
    //크기
    this.myIconRatio = [];
    this.myIconSizeDrag = [];
    this.cy = [];
    this.cs = 20;
    this.lineLength = [];
    this.lineX = [];

    //포스터 밖의 아이콘
    this.space = 200;
    this.iconX = [];
    this.iconY = [];
    this.iconX[0] = width / 2 + 300;
    this.iconX[1] = width / 2 + 300;
    this.iconX[2] = width / 2 + 300 + this.space;
    this.iconX[3] = width / 2 + 300 + this.space;
    this.iconX[4] = width / 2 + 300;
    this.iconY[0] = height / 2 - 250;
    this.iconY[1] = height / 2 - 250 + this.space;
    this.iconY[2] = height / 2 - 250;
    this.iconY[3] = height / 2 - 250 + this.space;
    this.iconY[4] = height / 2 - 250 + this.space * 2;
    //쓰레기통
    this.binX = width / 2 + 300 + this.space;
    this.binY = height / 2 - 300 + this.space * 2 + 50;
  }

  display() {
    //아이콘 (캔버스 밖에) 보여줌
    for (let i = 0; i < 5; i++) {
      imageMode(CENTER);
      image(
        iconImage[movieNum][i],
        this.iconX[i],
        this.iconY[i],
        iconImage[movieNum][i].width * 0.3,
        iconImage[movieNum][i].height * 0.3
      );
    }
    //쓰레기통 (캔버스 밖에)
    imageMode(CENTER);
    if (
      mouseX > this.binX - binCloseImage.width / 2 &&
      mouseX < this.binX + binCloseImage.width / 2 &&
      mouseY > this.binY - binCloseImage.height / 2 &&
      mouseY < this.binY + binCloseImage.height / 2
    ) {
      image(
        binOpenImage,
        this.binX,
        this.binY,
        binOpenImage.width,
        binOpenImage.height
      );
    } else {
      image(
        binCloseImage,
        this.binX,
        this.binY,
        binCloseImage.width,
        binCloseImage.height
      );
    }
  }

  canvasDraw() {
    for (let i = 0; i < this.myIcon.length; i++) {
      //캔버스에 마우스 올리면 사이즈 조절 버튼 보임
      if (
        mouseX > canX - canW / 2 &&
        mouseX < canX + canW / 2 &&
        mouseY > canY - canH / 2 &&
        mouseY < canY + canH / 2
      ) {
        //사이즈 조절 막대
        stage3yourCanvas.strokeWeight(3);
        stage3yourCanvas.stroke(201, 116, 56);
        stage3yourCanvas.line(
          this.lineX[i] - 25,
          this.myIconY[i],
          this.lineX[i] - 25,
          this.myIconY[i] + this.lineLength[i]
        );
        //사이즈 조절 동그라미
        stage3yourCanvas.noStroke();
        stage3yourCanvas.fill(89, 9, 0);
        stage3yourCanvas.ellipse(
          this.lineX[i] - 25,
          this.cy[i],
          this.cs,
          this.cs
        );
        //회색 네모 선
        for (let i = 0; i < this.myIcon.length; i++) {
          stage3yourCanvas.noFill();
          stage3yourCanvas.stroke(200);
          stage3yourCanvas.strokeWeight(2);
          stage3yourCanvas.rectMode(CORNER);
          stage3yourCanvas.rect(
            this.myIconX[i],
            this.myIconY[i],
            this.myIcon[i].width * this.myIconRatio[i],
            this.myIcon[i].height * this.myIconRatio[i]
          );
        }
      }
      //캔버스 내 아이콘 위치 조절
      if (this.myIconDrag[i]) {
        this.myIconX[i] += mouseX - pmouseX;
        this.myIconY[i] += mouseY - pmouseY;
        this.cy[i] += mouseY - pmouseY;
        this.lineX[i] += mouseX - pmouseX;
      }
      //캔버스 내 사이즈 조절
      if (this.myIconSizeDrag[i]) {
        this.cy[i] += mouseY - pmouseY;
      }
      this.myIconRatio[i] = map(
        canY - canH / 2 + this.cy[i],
        canY - canH / 2 + this.myIconY[i] + this.lineLength[i],
        canY - canH / 2 + this.myIconY[i],
        0,
        1
      );
      if (this.cy[i] <= this.myIconY[i]) {
        this.cy[i] = this.myIconY[i];
      }
      if (this.cy[i] >= this.myIconY[i] + this.lineLength[i]) {
        this.cy[i] = this.myIconY[i] + this.lineLength[i];
      }
    }
  }
  canvasDisplay() {
    for (let i = 0; i < this.myIcon.length; i++) {
      //아이콘 캔버스에 그림
      stage3yourCanvas.imageMode(CORNER);
      stage3yourCanvas.image(
        this.myIcon[i],
        this.myIconX[i],
        this.myIconY[i],
        this.myIcon[i].width * this.myIconRatio[i],
        this.myIcon[i].height * this.myIconRatio[i]
      );
    }
  }

  iconClick() {
    //캔버스 밖의 아이콘 클릭
    for (let i = 0; i < 5; i++) {
      let iconW = iconImage[movieNum][i].width;
      let iconH = iconImage[movieNum][i].height;
      if (
        mouseX > this.iconX[i] - (iconW * 0.3) / 2 &&
        mouseX < this.iconX[i] + (iconW * 0.3) / 2 &&
        mouseY > this.iconY[i] - (iconH * 0.3) / 2 &&
        mouseY < this.iconY[i] + (iconH * 0.3) / 2
      ) {
        this.myIcon.push(iconImage[movieNum][i]);
        this.myIconX.push(stage3yourCanvas.width / 2);
        this.myIconY.push(stage3yourCanvas.height / 2);
        this.myIconDrag.push(false);

        this.cy.push(stage3yourCanvas.height / 2 + 100);
        this.lineX.push(stage3yourCanvas.width / 2);
        this.lineLength.push(200);

        this.myIconRatio.push(0.5);
        this.myIconSizeDrag.push(false);
      }
    }
    //캔버스 밖의 쓰레기통 클릭
    if (
      mouseX > this.binX - binCloseImage.width / 2 &&
      mouseX < this.binX + binCloseImage.width / 2 &&
      mouseY > this.binY - binCloseImage.height / 2 &&
      mouseY < this.binY + binCloseImage.height / 2
    ) {
      this.myIcon = [];
      this.myIconX = [];
      this.myIconY = [];
      this.myIconDrag = [];

      this.cy = [];
      this.lineX = [];
      this.lineLength = [];

      this.myIconRatio = [];
      this.myIconSizeDrag = [];
    }
    //캔버스 안의 아이콘 클릭 -> 위치 조절
    for (let i = 0; i < this.myIcon.length; i++) {
      if (
        mouseX > canX - canW / 2 + this.myIconX[i] &&
        mouseX <
          canX -
            canW / 2 +
            this.myIconX[i] +
            this.myIcon[i].width * this.myIconRatio[i] &&
        mouseY > canY - canH / 2 + this.myIconY[i] &&
        mouseY <
          canY -
            canH / 2 +
            this.myIconY[i] +
            this.myIcon[i].height * this.myIconRatio[i]
      ) {
        this.myIconDrag[i] = true;
      }
      //캔버스 안의 사이즈 조절 동그라미 클릭
      if (
        dist(
          canX - canW / 2 + this.lineX[i] - 25,
          canY - canH / 2 + this.cy[i],
          mouseX,
          mouseY
        ) <
        this.cs / 2
      ) {
        this.myIconSizeDrag[i] = true;
      }
    }
  }

  iconRelease() {
    for (let i = 0; i < this.myIconDrag.length; i++) {
      this.myIconDrag[i] = false;
      this.myIconSizeDrag[i] = false;
    }
  }
}
