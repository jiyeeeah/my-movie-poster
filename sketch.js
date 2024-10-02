let stage;
let start = 0;
//사용자 canvas 좌표
let canX;
let canY;
let canW = 400;
let canH = 600;
//stage 0
let startTS = 100; //제목 텍스트 사이즈
let startTX = 480; //제목 텍스트 x좌표 (width/2-120)
let startTW = 350; //제목 텍스트 width
let startTA = 255; //제목 알파값
let startText;
let startZoomInCheck = false;
let stage0Start = false;
let opacity = 0;
let imageW = 1200;
let imageH = 800;
let rButton;
let lButton;
let movieNum = 0;
let movieSelect;
//stage1
let stage1Start = false;
let stillNum = 0;
let playbarDrag = false;
let cx = 100; //width/2-500
let cs = 30;
let barLX = 200; //width/2-400
let barRX = 1000; //width/2+400
let barY = 650; //height-150
let barN = 4;
let space = 800 / barN;
//stage2
let stage2Start = false;
let cutNum = 0;
let stillCutSelect;
//stage3
let stage3Start = false;
let stage3yourCanvas;
let icon;
let textSel;
//stage4
let stage4Start = false;
let effectNum = 3;
let stage4yourCanvas;
let effects;
//stage5
let djx;
let djy;
let dmx;
let dmy;
let dRatio = 0.7;
//영상 저장
let encoder;
const frate = 30; //frame rate
const numFrames = 100; //num of frames to record
let recording = false;
let recordedFrames = 0;
let count = 0;
//폰트
let font = [];
let mainFont;
let dotFont;
let titleFont;
//이미지
let theatre;
let theatreHallway;
let whiteArrow;
let stillImage = [];
let stillCutImage = [];
let iconImage = [];
let canBG = [];
let canBGButton = [];
//버튼
let binCloseImage;
let binOpenImage;
let buttonImage;
let buttonOkImage;
let playButton;
let backButtonImage;
let downJpgImage;
let downJpgNeonImage;
let downMp4Image;
let downMp4NeonImage;
let fontImage = [];
let filterImage = [];
let effectImage = [];
let posterImage = [];
//커서
let MdCursor;
let SoulCursor;
let MflCursor;
//음악
let bgms = [];
let current_bgm;

function preload() {
  //폰트
  mainFont = loadFont("assets/font/HSyuji.ttf");
  titleFont = loadFont("assets/font/나눔손글씨 손편지체.ttf");
  dotFont = loadFont("assets/font/dotfont.ttf");
  font[0] = loadFont("assets/font/kor_tajagi.ttf");
  font[1] = loadFont("assets/font/kor_songmyeong.otf");
  font[2] = loadFont("assets/font/kor_bumsom.ttf");
  font[3] = loadFont("assets/font/kor_bombaram.ttf");
  font[4] = loadFont("assets/font/kor_shin.ttf");
  //bgm
  soundFormats("mp3", "ogg");
  bgms[0] = loadSound("assets/bgm/moodIndigo_music.mp3");
  bgms[1] = loadSound("assets/bgm/in_the_mood_for_love_music.mp3");
  bgms[2] = loadSound("assets/bgm/soul_music.mp3");
  bgms[3] = loadSound("assets/bgm/Dulcinea-Steve_Adams.mp3");
  //이미지
  whiteArrow = loadImage("assets/white_arrow.png");
  theatreHallway = loadImage("assets/title.png");
  theatre = loadImage("assets/theatre.PNG");
  //쓰레기통 이미지
  binCloseImage = loadImage("assets/buttons/bin_close.png");
  binOpenImage = loadImage("assets/buttons/bin_open.png");
  //다음 버튼 이미지
  buttonImage = loadImage("assets/buttons/button_notyet.png");
  buttonOkImage = loadImage("assets/buttons/button_ok.png");
  //이전 버튼 이미지
  backButtonImage = loadImage("assets/buttons/back_sample.png");
  //효과 버튼 이미지
  effectImage[0] = loadImage("assets/buttons/effect_rain.png");
  effectImage[1] = loadImage("assets/buttons/effect_bubble.png");
  effectImage[2] = loadImage("assets/buttons/effect_purple.png");
  effectImage[3] = loadImage("assets/buttons/effect_none.png");
  //커서 이미지
  MdCursor = loadImage("assets/cursor/mood_indigo_cursor.png");
  MflCursor = loadImage("assets/cursor/in_the_mood_for_love_cursor.png");
  SoulCursor = loadImage("assets/cursor/soul_cursor.png");
  //폰트 버튼 이미지
  fontImage[0] = loadImage("assets/buttons/tajagi_button.png");
  fontImage[1] = loadImage("assets/buttons/songmyeong_button.png");
  fontImage[2] = loadImage("assets/buttons/bumson_button.png");
  fontImage[3] = loadImage("assets/buttons/bombaram_button.png");
  fontImage[4] = loadImage("assets/buttons/shin_button.png");
  //효과 버튼 이미지
  filterImage[0] = loadImage("assets/buttons/gray.png");
  filterImage[1] = loadImage("assets/buttons/blur.png");
  filterImage[2] = loadImage("assets/buttons/dilate.png");
  filterImage[3] = loadImage("assets/buttons/none.png");
  //stage0 버튼
  rButton = loadImage("assets/buttons/button_right.png");
  lButton = loadImage("assets/buttons/button_left.png");
  //포스터 이미지
  posterImage[0] = loadImage("assets/posters/mood_indigo_poster.jpg");
  posterImage[1] = loadImage("assets/posters/in_the_mood_for_love_poster.jpg");
  posterImage[2] = loadImage("assets/posters/soul_poster.jpg");
  //stage1 이미지
  playButton = loadImage("assets/buttons/play_stop_button.png");
  stillImageLoad();
  //stage2 이미지
  stillCutImageLoad();
  canBGButtonLoad();
  canBGLoad();
  //stage3 이미지
  iconImageLoad();
  //stage5 이미지
  downJpgImage = loadImage("assets/buttons/download_jpg.png");
  downJpgNeonImage = loadImage("assets/buttons/download_jpg_neon.png");
  downMp4Image = loadImage("assets/buttons/download_mp4.png");
  downMp4NeonImage = loadImage("assets/buttons/download_mp4_neon.png");
  //영상저장
  HME.createH264MP4Encoder().then((enc) => {
    encoder = enc;
    encoder.outputFilename = "test";
    encoder.width = canW;
    encoder.height = canH;
    encoder.frameRate = frate;
    encoder.kbps = 50000; // video quality
    encoder.groupOfPictures = 10; // lower if you have fast actions.
    encoder.initialize();
  });
}

function setup() {
  createCanvas(1200, 800);
  pixelDensity(1);
  frameRate(60);
  //bgm
  stage = 0;
  current_bgm = bgms[3];
  current_bgm.loop();
  //캔버스 좌표
  canX = width / 2;
  canY = height / 2 - 30;
  //stage0
  startText = new StartText();
  movieSelect = new MovieSelect();
  //stage2
  stillCutSelect = new StillCutSelect();
  //stage3
  stage3Setup();
  //stage4
  stage4Setup();
  //stage5
  stage5Setup();
  //stage6
}

function draw() {
  bgm_loop();
  switch (stage) {
    case 0:
      stage0Draw();
      break;
    case 1:
      stage1Draw();
      stageDisplay();
      movieCursor();
      break;
    case 2:
      stage2Draw();
      stageDisplay();
      movieCursor();
      break;
    case 3:
      stage3Draw();
      stageDisplay();
      movieCursor();
      break;
    case 4:
      stage4Draw();
      stageDisplay();
      movieCursor();
      break;
    case 5:
      stage5Draw();
      stageDisplay();
      movieCursor();
      break;
    default:
  }
}
function mousePressed() {
  switch (stage) {
    case 0:
      stage0Click();
      break;
    case 1:
      stage1Click();
      break;
    case 2:
      stage2Click();
      break;
    case 3:
      stage3Click();
      break;
    case 4:
      stage4Click();
      break;
    case 5:
      stage5Click();
      break;
    default:
  }
}
function mouseReleased() {
  switch (stage) {
    case 0:
      break;
    case 1:
      stage1Release();
      break;
    case 2:
      stage2Release();
      break;
    case 3:
      stage3Release();
      break;
    case 4:
      break;
    case 5:
      break;
    default:
  }
}
//bgm
function bgm_loop() {
  let bgm;
  if (stage == 0) {
    bgm = bgms[3];
  } else if (stage >= 1 && stage <= 5) {
    bgm = bgms[movieNum];
  }
  if (bgm) {
    if (bgm != current_bgm) {
      current_bgm.stop();
      current_bgm = bgm;
      current_bgm.loop();
    }
  }
}

//이미지 로드
function stillImageLoad() {
  for (let movie = 0; movie < 3; movie++) {
    stillImage[movie] = [];
    for (let still = 0; still < 4; still++) {
      if (movie == 0) {
        stillImage[0][still] = loadImage(
          "assets/still/mood_indigo" + still + ".jpg"
        ); //mood indigo 이미지 불러오기
      } else if (movie == 1) {
        stillImage[1][still] = loadImage(
          "assets/still/in_the_mood_for_love" + still + ".jpg"
        ); //화양연화 이미지 불러오기
      } else if (movie == 2) {
        stillImage[2][still] = loadImage("assets/still/soul" + still + ".jpg"); //soul 이미지 불러오기
      }
    }
  }
}
function stillCutImageLoad() {
  for (let movie = 0; movie < 3; movie++) {
    stillCutImage[movie] = [];
    for (let still = 0; still < 4; still++) {
      stillCutImage[movie][still] = [];
      // mflStillCutImage[still] = [];
      for (let cut = 0; cut < 3; cut++) {
        if (movie == 0) {
          stillCutImage[movie][still][cut] = loadImage(
            "assets/stillCut/mood_indigo_sn" + still + "_" + cut + ".png"
          );
        } else if (movie == 1) {
          stillCutImage[movie][still][cut] = loadImage(
            "assets/stillCut/in_the_mood_for_love_sn" +
              still +
              "_" +
              cut +
              ".png"
          );
        } else if (movie == 2) {
          stillCutImage[movie][still][cut] = loadImage(
            "assets/stillCut/soul_sn" + still + "_" + cut + ".png"
          );
        }
      }
    }
  }
}
//아이콘 불러오기
function iconImageLoad() {
  for (let movie = 0; movie < 3; movie++) {
    iconImage[movie] = new Array(5);
    for (let icon = 0; icon < 5; icon++) {
      let idx = icon + 1;
      if (movie == 0) {
        //무드인디고 아이콘
        iconImage[movie][icon] = loadImage(
          "assets/icon/mood_indigo_icon" + idx + ".png"
        );
      } else if (movie == 1) {
        //화양연화 아이콘
        iconImage[movie][0] = loadImage(
          "assets/icon/in_the_mood_for_love_chipao.png"
        );
        iconImage[movie][1] = loadImage(
          "assets/icon/in_the_mood_for_love_light.png"
        );
        iconImage[movie][2] = loadImage(
          "assets/icon/in_the_mood_for_love_lunchbox.png"
        );
        iconImage[movie][3] = loadImage(
          "assets/icon/in_the_mood_for_love_majak.png"
        );
        iconImage[movie][4] = loadImage(
          "assets/icon/in_the_mood_for_love_radio.png"
        );
      } else if (movie == 2) {
        //소울 아이콘
        iconImage[movie][0] = loadImage("assets/icon/soul_cat.png");
        iconImage[movie][1] = loadImage("assets/icon/soul_music_note.png");
        iconImage[movie][2] = loadImage("assets/icon/soul_piano.png");
        iconImage[movie][3] = loadImage("assets/icon/soul_souls.png");
        iconImage[movie][4] = loadImage("assets/icon/soul_trumpet.png");
      }
    }
  }
}

//포스터 배경 불러오기
function canBGLoad() {
  for (let movie = 0; movie < 3; movie++) {
    canBG[movie] = new Array(7);
    for (let bg = 0; bg < 7; bg++) {
      let idx = bg + 1;
      if (movie == 0) {
        canBG[0][bg] = loadImage(
          "assets/poster_bg/mood_indigo_poster_background" + idx + ".PNG"
        );
      } else if (movie == 1) {
        canBG[1][bg] = loadImage(
          "assets/poster_bg/in_the_mood_for_love_poster_background" +
            idx +
            ".png"
        );
      } else if (movie == 2) {
        canBG[2][bg] = loadImage(
          "assets/poster_bg/soul_poster_background" + idx + ".png"
        );
      }
    }
  }
}
//포스터 배경 버튼 불러오기
function canBGButtonLoad() {
  for (let movie = 0; movie < 3; movie++) {
    canBGButton[movie] = new Array(7);
    for (let bg = 0; bg < 7; bg++) {
      let idx = bg + 1;
      if (movie == 0) {
        canBGButton[0][bg] = loadImage(
          "assets/poster_bg/icon/mood_indigo_poster_background_icon" +
            idx +
            ".png"
        );
      } else if (movie == 1) {
        canBGButton[1][bg] = loadImage(
          "assets/poster_bg/icon/in_the_mood_for_love_poster_background_icon" +
            idx +
            ".png"
        );
      } else if (movie == 2) {
        canBGButton[2][bg] = loadImage(
          "assets/poster_bg/icon/soul_poster_background_icon" + idx + ".png"
        );
      }
    }
  }
}
//공통함수
//다음 스테이지 넘어가는 버튼
function nextButtonDisplay() {
  imageMode(CENTER);
  if (
    mouseX > width - 80 - (buttonImage.width * 0.7) / 2 &&
    mouseX < width - 80 + (buttonImage.width * 0.7) / 2 &&
    mouseY > height - 80 - (buttonImage.height * 0.7) / 2 &&
    mouseY < height - 80 + (buttonImage.height * 0.7) / 2
  ) {
    image(
      buttonOkImage,
      width - 80,
      height - 75,
      buttonOkImage.width * 0.75,
      buttonOkImage.height * 0.75
    );
  } else {
    image(
      buttonImage,
      width - 80,
      height - 80,
      buttonImage.width * 0.7,
      buttonImage.width * 0.7
    );
  }
}
function isInNextButton() {
  if (
    mouseX > width - 80 - (buttonOkImage.width * 0.75) / 2 &&
    mouseX < width - 80 + (buttonOkImage.width * 0.75) / 2 &&
    mouseY > height - 75 - (buttonOkImage.height * 0.75) / 2 &&
    mouseY < height - 75 + (buttonOkImage.height * 0.75) / 2
  ) {
    return true;
  } else {
    return false;
  }
}
//뒤로가기 버튼
function prevButtonDisplay() {
  imageMode(CENTER);
  if (
    mouseX > 80 - (backButtonImage.width * 0.08) / 2 &&
    mouseX < 80 + (backButtonImage.width * 0.08) / 2 &&
    mouseY > 50 - (backButtonImage.height * 0.08) / 2 &&
    mouseY < 50 + (backButtonImage.height * 0.08) / 2
  ) {
    image(
      backButtonImage,
      80 + 3,
      50 + 3,
      backButtonImage.width * 0.08,
      backButtonImage.height * 0.08
    );
  } else {
    image(
      backButtonImage,
      80,
      50,
      backButtonImage.width * 0.08,
      backButtonImage.width * 0.08
    );
  }
}
function isInPrevButton() {
  if (
    mouseX > 80 - (backButtonImage.width * 0.08) / 2 &&
    mouseX < 80 + (backButtonImage.width * 0.08) / 2 &&
    mouseY > 50 - (backButtonImage.height * 0.08) / 2 &&
    mouseY < 50 + (backButtonImage.height * 0.08) / 2
  ) {
    return true;
  } else {
    return false;
  }
}
//현재 스테이지 나타내기
function stageDisplay() {
  let space = 50;
  let cy = height - 50;
  let cs = 30;

  let ty = height - 40;
  for (let i = 0; i < 5; i++) {
    let stageN = i + 1;

    fill(255, 200);
    if (stageN == stage) {
      fill(211, 126, 66, 200);
    } else {
      fill(255, 200);
    }
    ellipse(width / 2 + space * (i - 1.5), cy, cs, cs);

    textAlign(CENTER);
    fill(0);
    if (stageN == stage) {
      fill(150, 32, 18);
    }
    textFont(mainFont);
    textSize(20);
    text(stageN, width / 2 + space * (i - 1.5), ty);
  }
}
//커서
function movieCursor() {
  if (movieNum == 0) {
    imageMode(CORNER);
    image(
      MdCursor,
      mouseX,
      mouseY,
      MdCursor.width * 0.03,
      MdCursor.height * 0.03
    );
  } else if (movieNum == 1) {
    imageMode(CORNER);
    image(
      MflCursor,
      mouseX,
      mouseY,
      MflCursor.width * 0.7,
      MflCursor.height * 0.7
    );
  } else if (movieNum == 2) {
    imageMode(CORNER);
    image(
      SoulCursor,
      mouseX,
      mouseY,
      SoulCursor.width * 0.25,
      SoulCursor.height * 0.25
    );
  }
}
// // stage0
function stage0Draw() {
  switch (start) {
    case 0:
      startText.display();

      imageMode(CENTER);
      image(theatreHallway, width / 2, height / 2, imageW, imageH); //타이틀 이미지
      //마우스 클릭하면 줌인
      if (startZoomInCheck) {
        startTS += 0.8;
        startTX -= 0.8;
        startTW += 2;
        startTA -= 4;
        let imageZoomOffset = 5.5;
        imageW += imageZoomOffset * 1.5;
        imageH += imageZoomOffset;
        //줌인 충분히 되면 다음 씬으로
        if (imageW > 2000) {
          start = 1;
        }
      }
      break;
    case 1:
      imageMode(CENTER);
      image(theatre, width/2, height/2, 1200,800);
      
      //플레이 설명
      let ty = 110
      noStroke();
      rectMode(CENTER);
      fill(34,6,3);
      rect(width/2,270,1050,480);
      
      textFont(titleFont);
      textSize(65);
      textAlign(LEFT);
      fill(203,198,1);
      text('내가 기억하는 장면으로, 내가 기억하는 대사로',130,ty);
      text('영화의 포스터를 완성해보세요',130,ty+75);
      text('비로소 나의 영화가 되는 순간을 만나보세요',130,ty+150);
      textSize(50);
      textAlign(CENTER);
      text('영화>장면>메인 이미지 및 배경>글과 그림>필터 및 효과>저장!',width/2,460);
      
            //슬레이트 설명 문구
      let ax = 1050;
      let ay = 660;
      push();
      translate(ax, ay);
      rotate((PI * 5) / 4);
      image(whiteArrow, 0, 0, 70, 70);
      pop();
      push();
      translate(ax + 15, ay - 10);
      rotate(radians(-20));
      fill(255, 200);
      textFont(mainFont);
      textSize(30);
      textAlign(LEFT);
      text("다음으로", 0, 0);
      pop();
      
      nextButtonDisplay();
      break;
    case 2:
      imageMode(CENTER);
      image(theatre, width / 2, height / 2, 1200, 800); //배경 그리기
      nextButtonDisplay();
      prevButtonDisplay();
      posterSelectButtonDisplay();
      movieSelect.posterDisplay(movieNum);

      //스테이지 설명
      noStroke();
      if (!stage0Start) {
        fill(255, opacity);
        rectMode(CORNER);
        rect(0, 0, 1200, 800);
        if (opacity >= 140) {
          opacity = 140;
        } else {
          opacity += 5;
        }
        textAlign(CENTER);
        fill(0);
        textFont(mainFont);
        textSize(50);
        text("영화를 선택해주세요", width / 2, height / 2);
      }
      //여기까지
      break;
    default:
  }
}

function stage0Click() {
  switch (start) {
    case 0:
      startZoomInCheck = true;
      break;
    case 1:
      if (isInNextButton()) start = 2;
      break;
    case 2:
      stage0Start = true;
      opacity = 0;

      if (isInNextButton()) stage = 1;
      if(isInPrevButton())  start=1;
      posterSelectButtonClick();
      break;
    default:
  }
}

//포스터 고르는 버튼
function posterSelectButtonDisplay() {
  let rbuttonX1 = width / 2 + 300 - rButton.width * 0.5;
  let rbuttonX2 = width / 2 + 300 + rButton.width * 0.5;
  let lbuttonX1 = width / 2 - 300 - lButton.width * 0.5;
  let lbuttonX2 = width / 2 - 300 + lButton.width * 0.5;
  let buttonY1 = height / 2 - 80 - rButton.height * 0.5;
  let buttonY2 = height / 2 - 80 + rButton.height * 0.5;
  if (
    mouseX > rbuttonX1 &&
    mouseX < rbuttonX2 &&
    mouseY > buttonY1 &&
    mouseY < buttonY2
  ) {
    if (mouseIsPressed) {
      image(rButton, width / 2 + 300 + 5, height / 2 - 80 + 5);
    } else {
      image(rButton, width / 2 + 300, height / 2 - 80);
    }
  } else {
    image(rButton, width / 2 + 300, height / 2 - 80);
  }
  if (
    mouseX > lbuttonX1 &&
    mouseX < lbuttonX2 &&
    mouseY > buttonY1 &&
    mouseY < buttonY2
  ) {
    if (mouseIsPressed) {
      image(lButton, width / 2 - 300 + 5, height / 2 - 80 + 5);
    } else {
      image(lButton, width / 2 - 300, height / 2 - 80);
    }
  } else {
    image(lButton, width / 2 - 300, height / 2 - 80);
  }
  //커서 모양(손, 화살표);
  if (
    (mouseX > rbuttonX1 &&
      mouseX < rbuttonX2 &&
      mouseY > buttonY1 &&
      mouseY < buttonY2) ||
    (mouseX > lbuttonX1 &&
      mouseX < lbuttonX2 &&
      mouseY > buttonY1 &&
      mouseY < buttonY2) ||
    isInNextButton()
  ) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}
function posterSelectButtonClick() {
  let rbuttonX1 = width / 2 + 300 - rButton.width * 0.5;
  let rbuttonX2 = width / 2 + 300 + rButton.width * 0.5;
  let lbuttonX1 = width / 2 - 300 - lButton.width * 0.5;
  let lbuttonX2 = width / 2 - 300 + lButton.width * 0.5;
  let buttonY1 = height / 2 - 80 - rButton.height * 0.5;
  let buttonY2 = height / 2 - 80 + rButton.height * 0.5;
  if (
    mouseX > rbuttonX1 &&
    mouseX < rbuttonX2 &&
    mouseY > buttonY1 &&
    mouseY < buttonY2
  ) {
    movieNum += 1;
    if (movieNum >= posterImage.length - 1) {
      movieNum = posterImage.length - 1;
    }
  }
  if (
    mouseX > lbuttonX1 &&
    mouseX < lbuttonX2 &&
    mouseY > buttonY1 &&
    mouseY < buttonY2
  ) {
    movieNum -= 1;
    if (movieNum < 0) {
      movieNum = 0;
    }
  }
}

// // stage1  - 명장면
function stage1Draw() {
  imageMode(CENTER);
  image(theatre, width / 2, height / 2, 1200, 800); //배경 그리기
  stillDisplay();
  playbarDisplay();
  nextButtonDisplay();
  prevButtonDisplay();

  //설명
  noStroke();
  if (!stage1Start) {
    fill(255, opacity);
    rectMode(CORNER);
    rect(0, 0, 1200, 800);
    if (opacity >= 140) {
      opacity = 140;
    } else {
      opacity += 5;
    }
    textAlign(CENTER);
    fill(0);
    textFont(mainFont);
    textSize(50);
    text("장면을 선택해주세요", width / 2, height / 2);
  }
  //여기까지
}

function stage1Click() {
  stage1Start = true;
  opacity = 0;

  playbarClick();
  if (isInNextButton()) {
    stage += 1;
  }
  if (isInPrevButton()) {
    movieNum = 0;
    stage -= 1;
  }
}
function stage1Release() {
  playbarDrag = false;
}

function playbarDisplay() {
  noStroke();
  fill(255);
  textAlign(LEFT);
  textSize(22);
  textFont(mainFont);
  text("choose", barLX - 100, barY + 3);
  for (let i = 0; i < 4; i++) {
    //playbar
    strokeWeight(8);
    stroke(255);
    line(barLX + i * space, barY, barLX + (i + 1) * space, barY);
    //구분선
    if (i > 0 && i <= 3) {
      noStroke();
      fill(255);
      let triX = barLX + i * space;
      triangle(triX, barY + 10, triX - 5, barY + 20, triX + 5, barY + 20);
    }
  }
  //마우스 포인터
  fill(201, 116, 56);
  stroke(255);
  strokeWeight(1);
  if (playbarDrag) {
    cx += mouseX - pmouseX;
  }
  if (cx <= barLX) {
    cx = barLX;
  } else if (cx >= barRX) {
    cx = barRX;
  }
  ellipse(cx, barY, cs, cs);

  //프리뷰
  for (let i = 0; i < 4; i++) {
    if (
      mouseX > barLX + i * space &&
      mouseX < barLX + (i + 1) * space &&
      mouseY > barY - 30 &&
      mouseY < barY + 30
    ) {
      let img = stillImage[movieNum][i];
      let imageW = img.width;
      let imageH = img.height;
      image(img, mouseX, barY - 80, imageW * 0.2, imageH * 0.2);
    }
  }
  //메인 장면 보여줌
  for (let i = 0; i < 4; i++) {
    strokeWeight(5);
    if (cx >= barLX + i * space && cx < barLX + (i + 1) * space) {
      stillNum = i;
    }
  }
  //커서 모양
  if (
    (mouseX > barLX &&
      mouseX < barRX &&
      mouseY > barY - 30 &&
      mouseY < barY + 30) ||
    isInNextButton() ||
    isInPrevButton()
  ) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function playbarClick() {
  if (dist(cx, barY, mouseX, mouseY) < cs / 2) {
    playbarDrag = true;
  }
  for (let i = 0; i < 4; i++) {
    strokeWeight(5);
    if (
      mouseX > barLX + i * space &&
      mouseX < barLX + (i + 1) * space &&
      mouseY > barY - 30 &&
      mouseY < barY + 30
    ) {
      cx = mouseX;
    }
  }
}

function stillDisplay() {
  imageMode(CENTER);
  image(stillImage[movieNum][stillNum], width / 2, height / 2 - 80);
}

// // stage 2  - 누끼 선택
function stage2Draw() {
  imageMode(CENTER);
  image(theatre, width / 2, height / 2, 1200, 800); //배경 그리기

  stillCutSelect.canvasDraw();
  stillCutSelect.colorSelectDisplay();
  stillCutSelect.sizeControl();
  stillCutSelect.display();
  stillCutSelect.cursor();
  nextButtonDisplay();
  prevButtonDisplay();
  //설명
  noStroke();
  if (!stage2Start) {
    fill(255, opacity);
    rectMode(CORNER);
    rect(0, 0, 1200, 800);
    if (opacity >= 140) {
      opacity = 140;
    } else {
      opacity += 5;
    }
    textAlign(CENTER);
    fill(0);
    textFont(mainFont);
    textSize(50);
    text("메인 이미지와 배경색을 골라주세요", width / 2, height / 2);
  }
  //여기까지
  //커서
  if (isInNextButton() || isInPrevButton()) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function stage2Click() {
  stage2Start = true;
  opacity = 0;

  stillCutSelect.stillCutClick();
  stillCutSelect.colorSelectClick();
  stillCutSelect.sizeControlClick();
  stillCutSelect.posControlClick();
  if (isInNextButton() && stillCutSelect.selection !== 3) {
    stage += 1;
  }
  if (isInPrevButton()) {
    stillNum = 0;
    cx = 100; //width/2-500
    cs = 20;
    barLX = 100; //width/2-500
    barRX = 1100; //width/2+500
    barY = 650; //height-150
    barN = 4;
    space = 1000 / barN;
    stage -= 1;
  }
}
function stage2Release() {
  stillCutSelect.sizeControlRelease();
  stillCutSelect.posControlRelease();
}

// // stage 3  - 아이콘 및 텍스트
function stage3Setup() {
  stage3yourCanvas = createGraphics(canW, canH);
  textSel = new TextSel();
  icon = new Icon();
}
function stage3Draw() {
  imageMode(CENTER);
  image(theatre, width / 2, height / 2, 1200, 800); //배경 그리기
  stage3yourCanvas.imageMode(CORNER);
  stage3yourCanvas.image(stillCutSelect.stillCanvas, 0, 0);

  //icon
  icon.canvasDraw();
  icon.canvasDisplay();
  icon.display();

  //text
  textSel.textinput();
  textSel.display();
  textSel.canvasDraw();
  textSel.canvasDisplay();
  image(stage3yourCanvas, canX, canY);

  nextButtonDisplay();
  prevButtonDisplay();

  //설명
  noStroke();
  if (!stage3Start) {
    fill(255, opacity);
    rectMode(CORNER);
    rect(0, 0, 1200, 800);
    if (opacity >= 140) {
      opacity = 140;
    } else {
      opacity += 5;
    }
    textAlign(CENTER);
    fill(0);
    textFont(mainFont);
    textSize(50);
    text("문구와 오브제를 골라주세요", width / 2, height / 2);
    textSize(30);
    fill(50);
    text(
      "오브제가 겹칠 시 떼어내기 힘들 수도 있습니다",
      width / 2,
      height / 2 + 50
    );
  }
  //여기까지
  //커서
  if (isInNextButton() || isInPrevButton()) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}
function stage3Click() {
  stage3Start = true;
  opacity = 0;

  icon.iconClick();
  textSel.textClick();
  if (isInNextButton()) {
    stage += 1;
  }
  if (isInPrevButton()) {
    cutNum = 0;
    stillCutSelect = new StillCutSelect();
    stage -= 1;
  }
}
function stage3Release() {
  icon.iconRelease();
  textSel.textRelease();
}

// // stage 4 - 효과
function stage4Setup() {
  stage4yourCanvas = createGraphics(canW, canH);
  effects = new Effects();
  filters = new Filter();
}
function stage4Draw() {
  imageMode(CENTER);
  image(theatre, width / 2, height / 2, 1200, 800); //배경 그리기

  stage4yourCanvas.imageMode(CORNER);
  stage4yourCanvas.image(stage3yourCanvas, 0, 0);

  effects.canvasDraw(effectNum);
  effects.buttonDisplay();

  filters.display();
  filters.canvasShow();

  image(stage4yourCanvas, canX - 200, canY);
  nextButtonDisplay();
  prevButtonDisplay();

  //설명
  noStroke();
  if (!stage4Start) {
    fill(255, opacity);
    rectMode(CORNER);
    rect(0, 0, 1200, 800);
    if (opacity >= 140) {
      opacity = 140;
    } else {
      opacity += 5;
    }
    textAlign(CENTER);
    fill(0);
    textFont(mainFont);
    textSize(50);
    text("필터와 효과를 골라주세요", width / 2, height / 2);
  }
  //여기까지
  //커서
  if (isInNextButton() || isInPrevButton()) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}
function stage4Click() {
  stage4Start = true;
  opacity = 0;

  effects.effectClick();
  filters.filterClick();

  if (isInNextButton()) {
    stage += 1;
  }
  if (isInPrevButton()) {
    effectNum = 3;
    stage3Setup();
    stage -= 1;
  }
}

// // stage 5 -
function stage5Setup() {
  stage4yourCanvas.frameRate(frate);
}
let endA = 0; //엔딩크레딧 투명도
let end = true;
let credit = 0;
let endX = 900;
let endY = 260;
let nameY = 340;

function stage5Draw() {
  background(0); //배경 그리기
  fill(255, 238, 0, 50);
  quad(
    canX - 200 - 150,
    0,
    canX - 200 + 150,
    0,
    canX - 200 + 350,
    height,
    canX - 200 - 350,
    height
  );
  //이전 캔버스 그리기
  stage4yourCanvas.imageMode(CORNER);
  stage4yourCanvas.image(stage3yourCanvas, 0, 0);
  effects.canvasDraw(effectNum);
  filters.canvasShow();
  imageMode(CENTER);
  image(stage4yourCanvas, canX - 200, canY);
  downImageDisplay();
  //뒤로가기 버튼 뒤에 동그라미
  fill(247, 218, 54);
  ellipse(85, 50, 110, 100);
  prevButtonDisplay();

  //엔딩크레딧
  fill(255, endA);
  textFont(mainFont);
  textAlign(CENTER);
  if (credit == 0) {
    textSize(50);
    text("당신의 기억을", endX, endY);
    text("저장하세요", endX, nameY - 20);
  } else if (credit == 1) {
    textSize(50);
    text("<만든사람>", endX, endY);
  } else if (credit == 2) {
    textSize(50);
    text("무드인디고 덕후", endX, endY);
    textSize(30);
    text("박민하", endX, nameY);
  } else if (credit == 3) {
    textSize(50);
    text("화양연화 덕후", endX, endY);
    textSize(30);
    text("손유빈", endX, nameY);
  } else if (credit == 4) {
    textSize(50);
    text("소울 덕후", endX, endY);
    textSize(30);
    text("박성범", endX, nameY);
  } else if (credit == 5) {
    textSize(50);
    text("그리고 코딩 덕후", endX, endY);
    textSize(30);
    text("이지예", endX, nameY);
  } else if (credit == 6) {
    textSize(50);
    text("감사합니다", endX, endY);
  }

  if (end) endA += 7;
  else endA -= 7;
  if (endA >= 255 || endA <= 0) end = !end;
  if (endA <= 0) credit++;
  if (credit > 6) {
    credit = 6;
  }

  //영상
  if (recording) {
    console.log("recording");
    encoder.addFrameRgba(
      drawingContext.getImageData(
        canX - 200 - canW / 2,
        canY - canH / 2,
        encoder.width,
        encoder.height
      ).data
    );
    recordedFrames++;
  }
  if (recordedFrames === numFrames) {
    recording = false;
    recordedFrames = 0;
    console.log("recording stopped");

    encoder.finalize();
    const uint8Array = encoder.FS.readFile(encoder.outputFilename);
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(
      new Blob([uint8Array], { type: "video/mp4" })
    );
    anchor.download = encoder.outputFilename;
    anchor.click();
    encoder.delete();

    preload();
  }
  //커서
  if (isInPrevButton()) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}
function stage5Click() {
  downImageClick();
  if (isInPrevButton()) {
    stage5Setup();
    stage -= 1;
  }
}

function downImageDisplay() {
  djx = width - 200;
  djy = height - 200;
  dmx = width - 400;
  dmy = height - 200;
  let cs = 120;
  //버튼 뒤에 동그라미
  fill(247, 218, 54);
  ellipse(djx, djy - 5, cs, cs);
  ellipse(dmx, dmy - 5, cs, cs);
  //버튼
  imageMode(CENTER);
  //사진
  if (
    mouseX > djx - (downJpgImage.width * dRatio) / 2 &&
    mouseX < djx + (downJpgImage.width * dRatio) / 2 &&
    mouseY > djy - (downJpgImage.height * dRatio) / 2 &&
    mouseY < djy + (downJpgImage.height * dRatio) / 2
  ) {
    image(
      downJpgNeonImage,
      djx,
      djy,
      downJpgNeonImage.width * dRatio,
      downJpgNeonImage.height * dRatio
    );
  } else {
    image(
      downJpgImage,
      djx,
      djy,
      downJpgImage.width * dRatio,
      downJpgImage.height * dRatio
    );
  }
  //영상
  if (
    mouseX > dmx - (downMp4Image.width * dRatio) / 2 &&
    mouseX < dmx + (downMp4Image.width * dRatio) / 2 &&
    mouseY > dmy - (downMp4Image.height * dRatio) / 2 &&
    mouseY < dmy + (downMp4Image.height * dRatio) / 2
  ) {
    image(
      downMp4NeonImage,
      dmx,
      dmy,
      downMp4NeonImage.width * dRatio,
      downMp4NeonImage.height * dRatio
    );
    //영상저장 안내
    let ax = 730;
    let ay = 520;
    push();
    translate(ax, ay);
    rotate((PI * 5) / 4);
    image(whiteArrow, 0, 0, 70, 70);
    pop();
    push();
    translate(ax + 15, ay - 10);
    rotate(radians(-20));
    fill(255, 200);
    textFont(mainFont);
    textSize(30);
    textAlign(LEFT);
    text("누르고 조금만 기다려 주세요!", 0, 0);
    pop();
  } else {
    image(
      downMp4Image,
      dmx,
      dmy,
      downMp4Image.width * dRatio,
      downMp4Image.height * dRatio
    );
  }
}
function downImageClick() {
  //사진 저장
  if (
    mouseX > djx - (downJpgImage.width * dRatio) / 2 &&
    mouseX < djx + (downJpgImage.width * dRatio) / 2 &&
    mouseY > djy - (downJpgImage.height * dRatio) / 2 &&
    mouseY < djy + (downJpgImage.height * dRatio) / 2
  ) {
    saveCanvas(stage4yourCanvas, "yourPoster", "jpg");
  }
  if (
    mouseX > dmx - (downMp4Image.width * dRatio) / 2 &&
    mouseX < dmx + (downMp4Image.width * dRatio) / 2 &&
    mouseY > dmy - (downMp4Image.height * dRatio) / 2 &&
    mouseY < dmy + (downMp4Image.height * dRatio) / 2
  ) {
    recording = true;
  }
}
