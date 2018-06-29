class Sprite {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = '';
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};

class SpriteEnemy extends Sprite {
  constructor(x, y, speed) {
    super(x, y, speed);
    this.sprite = 'images/enemy-bug.png';
  };

  update(dt) {
    this.x += this.speed * dt;

    // Reset enemy positions and speed
    if (this.x > 550) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // Collision detection
    if (player.x < this.x + 60 &&
      player.x + 37 > this.x &&
      player.y < this.y + 25 &&
      30 + player.y > this.y) {
      player.x = 200;
      player.y = 380;
    }
  };
};

class SpritePlayer extends Sprite {
  constructor(x, y, speed) {
    super(x, y, speed);
    this.sprite = 'images/char-boy.png';
  };

  update() {};

  handleInput(allowedKeys) {
    switch (allowedKeys) {
      case "left":
        //check for wall, otherwise move left
        if (this.x > 0) {
          this.x -= 51;
        }
        break;
      case "right":
        //check for wall, otherwise move right
        if (this.x < 402) {
          this.x += 51;
        }
        break;
      case "up":
        //check if player reached top of water, if so call success function,
        // otherwise move up
        if (this.y < 0) {
          this.success();
        } else {
          this.y -= 41.5;
        }
        break;
      case "down":
        //check for bottom, otherwise move down
        if (this.y < 350) {
          this.y += 41.5;
        }
        break;
    }
  }
};

let player = new SpritePlayer(200, 380, 50);
let allEnemies = [];

for (var i = 0; i < 3; i++) {
  const startSpeed = 20 * Math.floor(Math.random() * 10 + 1);
  //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
  allEnemies.push(new SpriteEnemy(-100, 60 + (85 * i), startSpeed));
}

document.addEventListener('keydown', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});