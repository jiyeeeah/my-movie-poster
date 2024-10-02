class MovieSelect {
  constructor() {
    this.movieNum = 0;
    this.movieSelect = 0;
  }

  posterDisplay(_movieNum) {
    this.movieNum = _movieNum;
    imageMode(CENTER);

    //포스터 변수
    let posterRatio = 0.7;
    let poster = posterImage[this.movieNum];
    let posterW = 600;
    let posterH = 900;
    let posterX1 = width / 2 - (posterW * posterRatio) / 2;
    let posterX2 = width / 2 + (posterW * posterRatio) / 2;
    let posterY1 = height / 2 - 60 - (posterH * posterRatio) / 2;
    let posterY2 = height / 2 - 60 + (posterH * posterRatio) / 2;

    //포스터 보이기
    image(
      posterImage[this.movieNum],
      width / 2,
      height / 2 - 60,
      posterW * posterRatio,
      posterH * posterRatio
    );
  }
}
