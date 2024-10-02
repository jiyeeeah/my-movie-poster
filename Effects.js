class Effects {
  constructor() {

    //rain
    this.rainX = [];
    this.rainY = [];
    this.rainL = [];
    this.rainSpeed = [];
    for (let i = 0; i < 10; i++) {
      this.rainX[i] = random(0, canW);
      this.rainY[i] = random(0, 50);
      this.rainL[i] = random(20, 40);
      this.rainSpeed[i] = random(5, 7);
    }

    //bubble
    this.bubbleX = [];
    this.bubbleY = [];
    this.bubbleW = [];
    this.bubbleSpeed = [];
    this.bubbleC = [];
    for (let i = 0; i < 5; i++) {
      this.bubbleX[i] = random(0, canW);
      this.bubbleY[i] = canH;
      this.bubbleW[i] = 8;
      this.bubbleSpeed[i] = random(1, 2);
      this.bubbleC[i] = 255;
    }

    //light
    this.lightX = [];
    this.lightY = [];
    this.lightW = [];
    this.lightXspeed = [];
    this.lightYspeed = [];
    this.lightR = [];
    this.lightG = [];
    this.lightB = [];
    this.lightA = [];
    for (let i = 0; i < 50; i++) {
      this.lightX[i] = random(0, canW);
      this.lightY[i] = random(canH - 50, canH);
      this.lightW[i] = random(5, 8);
      this.lightXspeed[i] = random(0.01, 0.2);
      this.lightYspeed[i] = random(0.1, 2);
      this.lightR[i] = random(200, 256);
      this.lightG[i] = random(256);
      this.lightB[i] = random(200, 256);
      this.lightA[i] = random(80, 180);
    }

    //button
    this.space = 200;
    this.effectBX = [];
    this.effectBY = [];
    this.effectBX[0] = width / 2 + 250;
    this.effectBX[1] = width / 2 + 250;
    this.effectBX[2] = width / 2 + 250 + this.space;
    this.effectBX[3] = width / 2 + 250 + this.space;
    this.effectBY[0] = height / 2 - 100;
    this.effectBY[1] = height / 2 - 100 + this.space;
    this.effectBY[2] = height / 2 - 100;
    this.effectBY[3] = height / 2 - 100 + this.space;
  }

  canvasDraw(_effectNum) {
    let effectN = _effectNum;
    if (effectN == 0) {
      //캔버스에 raindrop
      //첫 실행 +a
      if (frameCount % 10 == 0 && this.rainX.length < 100) {
        this.rainX.push(random(0, canW));
        this.rainY.push(random(0, 50));
        this.rainL.push(random(20, 40));
        this.rainSpeed.push(random(5, 7));
      }
      for (let i = 0; i < this.rainX.length; i++) {
        //move
        this.rainY[i] += this.rainSpeed[i];
        if (this.rainY[i] > canY + canH / 2) {
          this.rainY[i] = 0;
        }
        //display
        stage4yourCanvas.strokeWeight(2);
        stage4yourCanvas.stroke(255,100);
        stage4yourCanvas.line(
          this.rainX[i],
          this.rainY[i],
          this.rainX[i],
          this.rainY[i] + this.rainL[i]
        );
      }
    } else if (effectN == 1) {
      //캔버스에 bubble
      //첫실행 +a
      if (frameCount % 20 == 0 && this.bubbleX.length < 20) {
        this.bubbleX.push(random(0, canW));
        this.bubbleY.push(canH);
        this.bubbleW.push(8);
        this.bubbleSpeed.push(random(1, 2));
        this.bubbleC.push(255);
      }
      for (let i = 0; i < this.bubbleX.length; i++) {
        //move
        this.bubbleW[i] += 0.06;
        this.bubbleY[i] -= this.bubbleSpeed[i];
        if (this.bubbleY[i] < 0) {
          this.bubbleY[i] = canH;
          this.bubbleW[i] = 8;
          this.bubbleSpeed[i] = random(1, 2);
        }
        //display
        stage4yourCanvas.noStroke();
        stage4yourCanvas.fill(74, 216, 255, 2);
        stage4yourCanvas.rectMode(CORNER);
        stage4yourCanvas.rect(0, 0, canW, canH);
        stage4yourCanvas.fill(this.bubbleC[i]);
        stage4yourCanvas.ellipse(
          this.bubbleX[i],
          this.bubbleY[i],
          this.bubbleW[i],
          this.bubbleW[i]
        );
      }
    } else if (effectN == 2) {
      //캔버스에 light
      //첫실행 +a
      if (frameCount % 5 == 0 && this.lightX.length < 100) {
        this.lightX.push(random(0, canW));
        this.lightY.push(random(canH - 50, canH));
        this.lightW.push(random(5, 8));
        this.lightXspeed.push(random(0.01, 0.2));
        this.lightYspeed.push(random(0.1, 2));
        this.lightR.push(random(200, 256));
        this.lightG.push(random(256));
        this.lightB.push(random(200, 256));
        this.lightA.push(random(80, 180));
      }
      for (let i = 0; i < this.lightX.length; i++) {
        //move
        this.lightX[i] += this.lightXspeed[i];
        this.lightY[i] = this.lightY[i] - this.lightYspeed[i];
        if (this.lightY[i] < 0) {
          this.lightY[i] = random(canH - 50, canH);
          this.lightXspeed[i] = 0;
          this.lightYspeed[i] = random(0.1, 2);
        }
        //display
        stage4yourCanvas.noStroke();
        stage4yourCanvas.fill(
          this.lightR[i],
          this.lightG[i],
          this.lightB[i],
          this.lightA[i]
        );
        stage4yourCanvas.ellipse(
          this.lightX[i],
          this.lightY[i],
          this.lightW[i],
          this.lightW[i]
        );
      }
    } else if (effectN == 3) {
      stage4yourCanvas.imageMode(CORNER);
      stage4yourCanvas.image(stage3yourCanvas, 0, 0);
    }
  }

  buttonDisplay() {
    for (let i = 0; i < 4; i++) {
      imageMode(CENTER);
      image(effectImage[i], this.effectBX[i], this.effectBY[i]);
    }
  }
  effectClick() {
    for (let i = 0; i < 4; i++) {
      if (
        dist(this.effectBX[i], this.effectBY[i], mouseX, mouseY) <
        effectImage[i].width/2
      ) {
        effectNum = i;
      }
    }
  }
}
