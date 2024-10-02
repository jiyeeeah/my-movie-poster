class Filter {
  constructor() {
    this.filterCX = 750;
    this.filterCY = 120;
    this.filterCS = 80;
    this.button = 1;
  }

  display() {
    fill(255);
    textFont(mainFont);
    textSize(22);
    textAlign(LEFT);
    text("filter", 700, 80);
    text("effect", 700, 230);
    image(
      filterImage[3],
      this.filterCX,
      this.filterCY,
      this.filterCS,
      this.filterCS
    );
    image(
      filterImage[2],
      this.filterCX + 120,
      this.filterCY,
      this.filterCS,
      this.filterCS
    );
    image(
      filterImage[1],
      this.filterCX + 240,
      this.filterCY,
      this.filterCS,
      this.filterCS
    );
    image(
      filterImage[0],
      this.filterCX + 360,
      this.filterCY,
      this.filterCS,
      this.filterCS
    );
  }
  canvasShow() {
    switch (this.button) {
      case 0:
        break;
      case 1:
        stage4yourCanvas.filter(BLUR, 0);
        break;
      case 2:
        stage4yourCanvas.filter(ERODE);
        break;
      case 3:
        stage4yourCanvas.filter(DILATE);
        break;
      case 4:
        stage4yourCanvas.filter(GRAY);
        break;
      default:
    }
  }

  filterClick() {
    if (
      dist(this.filterCX, this.filterCY, mouseX, mouseY) <
      this.filterCS / 2
    ) {
      this.button = 1;
    }
    if (
      dist(this.filterCX + 120, this.filterCY, mouseX, mouseY) <
      this.filterCS / 2
    ) {
      this.button = 2;
    }
    if (
      dist(this.filterCX + 240, this.filterCY, mouseX, mouseY) <
      this.filterCS / 2
    ) {
      this.button = 3;
    }
    if (
      dist(this.filterCX + 360, this.filterCY, mouseX, mouseY) <
      this.filterCS / 2
    ) {
      this.button = 4;
    }
  }
}
