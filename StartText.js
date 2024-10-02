class StartText {
  constructor() {
    this.tx = width/2+35;
    this.ty = 124;
    this.rx = 0;
    this.ry = 0;
    this.rw = 1200;
    this.rh = 800;

    this.ts = 100;
  }

  display() {
    background(0);
    noStroke();
    if (frameCount % 50 > 25) {
      fill(255, 204, 18,200);
    } else {
      fill(0);
    }
    //줌인 될 때
    if(startZoomInCheck){
      fill(255,204,18,200);
    }
    rectMode(CORNER);
    rect(this.rx, this.ry, this.rw, this.rh);

    textSize(this.ts);
    textFont(dotFont);
    textAlign(CENTER);
    if (frameCount % 50 > 25) {
      fill(0);
    } else {
      fill(255);
    }
    if(startZoomInCheck){
      fill(0);
      this.ts+=1;
      this.ty-=1.8;
    }
    text("START", this.tx, this.ty);
  }
}
