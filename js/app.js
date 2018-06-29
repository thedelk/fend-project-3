///////////////////////////////////////////////////////////////////////////////
//
//                              Enemy stuff
//
///////////////////////////////////////////////////////////////////////////////

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};





///////////////////////////////////////////////////////////////////////////////
//
//                              Player stuff
//
///////////////////////////////////////////////////////////////////////////////

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


const Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    "use strict";
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
            if (this.y < 300) {
                this.y += 41.5;
            }
            break;
    }
};



///////////////////////////////////////////////////////////////////////////////
//
//                              Instantiation
//
///////////////////////////////////////////////////////////////////////////////

let player = new Player(200, 380, 50);
let allEnemies = [];
// var enemy;

// enemyPosition.forEach(function(posY) {
//     enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
//     allEnemies.push(enemy);
// });

// Instantiate enemies
for (var i = 0; i < 3; i++) {
    //startSpeed is a random number from 1-10 times speedMultiplier
    var startSpeed = 5 * Math.floor(Math.random() * 10 + 1);
    //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}







///////////////////////////////////////////////////////////////////////////////
//
//                              Other stuff
//
///////////////////////////////////////////////////////////////////////////////

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// But I modified it so that the player moves on 'keydown' instead of 'keyup'.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
