let scoreLost = 0;
let scoreWon = 0;
const scoreWonText = document.querySelector('.score__won');
const scoreLostText = document.querySelector('.score__lost');

function scoreUpdate(win, lose) {
    scoreWon += win;
    scoreLost += lose;
    scoreWonText.textContent = `Won: ${scoreWon}`;
    scoreLostText.textContent = `Lost: ${scoreLost}`;
    player.y = 400;
    player.x = 200;
}

var Enemy = function(x, y, speed) {
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

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 530) {
        this.x = -130
        this.speed = 150 + Math.floor(Math.random() * 200); //Enemy random speed
    }
    this.checkCollision();
};

Enemy.prototype.checkCollision = function() {
    if (this.x + this.topLeftX > player.x + player.topLeftX + player.width ||
        this.x + this.topLeftX + this.width < player.x + player.topLeftX ||
        this.y + this.topLeftY > player.y + player.topLeftY + player.height ||
        this.y + this.topLeftY + this.height < player.y + player.topLeftY
        ){
            // no collision
        } else {
            scoreUpdate(0, 1);
        }
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
    if (this.y < 0) {
        scoreUpdate(1, 0);
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key === 'up' && this.y > 0) {
        this.y -= 84; 
    }
    if (key === 'down' && this.y < 400) {
        this.y += 84; 
    }
    if (key === 'left' && this.x > 0) {
        this.x -= 100; 
    }
    if (key === 'right' && this.x < 400) {
        this.x += 100; 
    }
}

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
