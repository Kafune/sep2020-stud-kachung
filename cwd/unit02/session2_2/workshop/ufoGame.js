const ufoImageUrl = "https://images2.imgbox.com/90/61/bP8foIzS_o.png";
const bullitImageUrl = "https://images2.imgbox.com/6b/32/GELVjZiO_o.png";
const rocketImageUrl = "https://images2.imgbox.com/a9/ee/3de7UGDe_o.png";

class Ufo extends BouncingSprite {
  constructor(x, y, xSpeed, ySpeed) {
    super(ufoImageUrl, x, y, xSpeed, ySpeed);

    // met een CSS-filter kunnen we deze versie een andere kleur geven
    this.element.style.filter = `hue-rotate( ${Math.random() * 360}deg )`;
  }
}


let player; // Deze variabele moet globaal zijn. Waarom? -> Heeft met scoping te maken. De functie createGameSprites maakt de speler aan, maar andere functies zouden hier geen toegang op krijgen.

class Player extends Sprite {
  constructor() {
    const x = 0;
    const y = 400;
    const xSpeed = 0;
    const ySpeed = 0;
    super(rocketImageUrl, x, y, xSpeed, ySpeed);
  }

  update() {
    super.update();
    if(this.x < 0 || this.x > 700) {
      this.xSpeed = 0;
    }

    this.x += this.xSpeed;
  }
}

class Bullit extends CollidingSprite {
  constructor(x, y) {
    const xSpeed = 0;
    const ySpeed = -8;
    super(bullitImageUrl, x, y, xSpeed, ySpeed);
    this.x = x;
    this.y = y;

  }
  update() {
    super.update();
    if(this.y < 0 + this.height) {
      this.remove();
    }
    this.y += this.ySpeed;
  }

  isCollision(otherSprite) {
    return (
      this.x >= otherSprite.x &&
      this.x <= otherSprite.x + otherSprite.width &&
      this.y >= otherSprite.y &&
      this.y <= otherSprite.y + otherSprite.height
    );
  }

  handleCollisionWith(otherSprite) {
    if(otherSprite instanceof Ufo) {
      otherSprite.remove();
    }
    super.remove();
  }
}

function createGameSprites() {
  const allUfos = [
    [350, 225, 1, 2],
    [350, 225, -2, 1],
    [350, 225, 2, -1],
    [350, 225, -1, -2],
    [350, 225, 2, 1],
    [350, 225, -1, 2],
    [350, 225, 1, -2],
    [350, 225, -2, -1]
  ].map(ufoData => new Ufo(...ufoData));
  // de variabele "allUfos" bevat nu een lijst met instanties
  // van de Ufo-klasse, maar met die lijsten hoeven we niets
  // te doen, want de Sprite-klasse houdt nu ook zelf een lijst
  // bij, en gebruikt die lijst om alle Sprites periodiek een
  // update() te laten doen.

  player = new Player();
}

function installKeyboardHandler() {
  // Het "keydown" event kan je gebruiken om alle toetsaanslagen
  // te detecteren, ook van pijltjestoetsen, functietoetsen, shift, ctrl
  // etc.
  // `event.code` zal dan een string bevatten die de ingedrukte toets
  // beschijft. Gebruik http://keycode.info/ om achter de codenamen van
  // toetsen te komen.
  document.addEventListener("keydown", event => {
    let moveSpeed = 3;
    if(event.code == "ArrowRight" ) {
      moveLeft(moveSpeed);
    }
    if(event.code == "ArrowLeft") {
      moveRight(moveSpeed);
    }
    if (event.code == "Space") {
      // normaal zal een browser de pagina scrollen als je op de spatiebalk
      // drukt. preventDefault() voorkomt dat.
      event.preventDefault();
      let playerMiddlePoint = player.x + player.width / 2;

      new Bullit( playerMiddlePoint, player.y );
    }
  });
}

function moveLeft(moveSpeed) {
  player.xSpeed = moveSpeed;

}

function moveRight(moveSpeed) {
  player.xSpeed = -moveSpeed;
}

const startButton = document.getElementById("startButton");
const titleImg = document.getElementById("titleImage");
const animationDiv = document.getElementById("animationDiv");

startButton.addEventListener("click", () => {
  animationDiv.removeChild(startButton);
  animationDiv.removeChild(titleImage);

  createGameSprites();
  Sprite.startEngine();
  installKeyboardHandler();
});
