let lostScore = 0;
let wonScore = 0;
const scoreWonText = document.querySelector('.score__won');
const scoreLostText = document.querySelector('.score__lost');


function scoreUpdate(win, lose) {
    wonScore += win;
    lostScore += lose;
    scoreWonText.textContent = `Won: ${wonScore}`;
    scoreLostText.textContent = `Lost: ${lostScore}`;
    player.y = 400;
    player.x = 200;
}



// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 96;
    this.height = 68;
    // actual enemy image X/Y-coordinates start (for more precise collision)
    this.topLeftX = 3;
    this.topLeftY = 77;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 530) {
        this.x = -130
        this.speed = 150 + Math.floor(Math.random() * 200);
    }
    if (this.x + this.topLeftX > player.x + player.topLeftX + player.width ||
        this.x + this.topLeftX + this.width < player.x + player.topLeftX ||
        this.y + this.topLeftY > player.y + player.topLeftY + player.height ||
        this.y + this.topLeftY + this.height < player.y + player.topLeftY
        ){
            // no collision
        } else {
            scoreUpdate(0, 1);
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.width = 68;
    this.height = 76;
    // actual player image X/Y-coordinates start (for more precise collision)
    this.topLeftX = 17;
    this.topLeftY = 63;
}

Player.prototype.update = function() {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'up' && this.y > 0) {
        this.y -= 84; 
    }
    if (keyCode === 'down' && this.y < 400) {
        this.y += 84; 
    }
    if (keyCode === 'left' && this.x > 0) {
        this.x -= 100; 
    }
    if (keyCode === 'right' && this.x < 400) {
        this.x += 100; 
    }
    if (this.y < -19) {
        scoreUpdate(1, 0);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(-90, 60, 150);
const enemy2 = new Enemy(-90, 140, 250);
const enemy3 = new Enemy(-90, 220, 200);
const allEnemies = [
    enemy1,
    enemy2,
    enemy3
];

const player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
