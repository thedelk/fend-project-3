///////////////////////////////////////////////////////////////////////////////
//  MASTER JS
//
//
//
//  INFORMATION
//  Project.................Classic Arcade Game
//  Purpose.................Udacity Front-End Nanodegree Program
//                          Project 3
//  Creator.................Ryan Delk
//  Last Change.............July 10, 2018
//
//
//
//  CONTENTS
//  1. Constructors
//  2. Instantiation
//
//
//
///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////
//  1. Constructors
///////////////////////////////////////

// Default sprite constructor
class Sprite {

  // Pass in parameters to control sprite speed and location
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = '';
  }

  // Draw the sprite on the canvas
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Sprite subclass for enemies
class SpriteEnemy extends Sprite {

  // Take same parameters as parent class, but use specific sprite
  constructor(x, y, speed) {
    super(x, y, speed);
    this.sprite = 'images/enemy-bug.png';
  }

  // Control changes to the enemy when stuff happens
  update(dt) {
    this.x += this.speed * dt;

    // Reset enemy positions and speed when they reach the edge
    if (this.x > 550) {
      this.x = -100;
      this.speed = speedUp + Math.floor(Math.random() * 512);
    }

    // Collision detection
    if (player.x < this.x + 60 &&
      player.x + 37 > this.x &&
      player.y < this.y + 25 &&
      30 + player.y > this.y) {
      player.x = 200;
      player.y = 380;
    }
  }
}

// Sprite subclass for player
class SpritePlayer extends Sprite {

  // Take same parameters as parent class, but use specific sprite
  constructor(x, y, speed) {
    super(x, y, speed);
    this.sprite = 'images/char-boy.png';
  }

  // Default function for updating
  update() {}

  // When the player reaches the water, speed up enemies
  greatSuccess() {
    speedUp += 25;
    this.resetPlayer();
  }

  // Start over once the player reaches the water
  resetPlayer() {
    this.startingX = 200;
    this.startingY = 380;
    this.x = this.startingX;
    this.y = this.startingY;
  }

  // Player controls
  handleInput(allowedKeys) {
    switch (allowedKeys) {

      // Left arrow key pressed
      case "left":
        // Don't allow movement past left edge
        if (this.x > 0) {
          this.x -= 101;
        }
        break;

      // Right arrow key pressed
      case "right":
        // Don't allow movement past right edge
        if (this.x < 402) {
          this.x += 101;
        }
        break;

      // Up arrow key pressed
      case "up":
        // Don't allow movement past top edge
        if (this.y < 0) {
          this.greatSuccess();
        } else {
          this.y -= 83;
        }
        break;

      // Down arrow key pressed
      case "down":
        // Don't allow movement past bottom edge
        if (this.y < 350) {
          this.y += 83;
        }
        break;
    }
  }
}



///////////////////////////////////////
//  2. Instantiation
///////////////////////////////////////

// Create a new player sprite
let player = new SpritePlayer(200, 380, 50);

// Speed variable; increases each time the player makes it across
let speedUp = 25;

// Initialize empty array to hold enemies
let allEnemies = [];

// Creating enemies
for (var i = 0; i < 3; i++) {

  // Set speed at which enemies will travel
  const startSpeed = speedUp * Math.floor(Math.random() * 10 + 1);

  // Push each new enemy to the array
  allEnemies.push(new SpriteEnemy(-100, 60 + (85 * i), startSpeed));
}

// Listen for keypress to control character
document.addEventListener('keydown', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});