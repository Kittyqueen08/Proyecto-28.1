const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board1, board2;
var numberOfArrows = 10;

var score = 0;

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  boardimg= loadImage("assets/board.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, 500, 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

 
}

function draw() {
  background(backgroundImg);

  image(backgroundImg,width/2,height/2,width,height);
  imageMode(CENTER);
  image(boardimg,width-300,330,50,200);
  image(boardimg,width-550,600,50,200);
  
  Engine.update(engine);

  playerBase.display();
  player.display();
  playerArcher.display();

  

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();

      
      var posX = playerArrows[i].body.position.x;
      var posY = playerArrows[i].body.position.y;

     
      if((posX>width)|| posY>height){
        if (!playerArrows[i].isRemoved) {
          playerArrows[i].remove(i);
        } 
      }
  
      if ((posX > (width-300-50) && posX < (width-300+50) && posY>330-200 && posY<330+200)||(posX>(width-550-50)&&posX<(width-550+50) && posY>(600-50) &&posY<(600+100))) {
        if (!playerArrows[i].isRemoved) {
                  
            score+=5;

            //score=5;

            //score -=5; 

            //score ++5;

          playerArrows[i].remove(i);
        } else {
          playerArrows[i].trajectory = [];
        }
      }
    }
  }

  //Título
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("TIRO CON ARCO ÉPICO", width / 2, 100);

  //Puntuación
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Puntuación " + score, width - 200, 100);

  //Conteo de flechas
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Flechas restantes : " + numberOfArrows, 200, 100);

  /*if (numberOfArrows == 5) {
    gameOver();
  }*/

  if (numberOfArrows == 0) {
    gameOver();
  }

  /*if (numberOfArrows = 0) {
    gameOver();
  }*/

  /*if (numberOfArrows == 0) {
    gameOver;
  }*/

}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

      arrow.trajectory = [];
      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal(
    {
      title: `¡Fin del juego!`,
      text: "¡Gracias por jugar!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize: "150x150",
      confirmButtonText: "Jugar de nuevo"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}


