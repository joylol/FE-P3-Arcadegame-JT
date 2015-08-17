/**
 * App.js
 * Author1: Udacity 
 * Author2: Joy Thomas (joythomas@outlook.com)
 * Date: August 2015
 * 
 * Description: This file uses the template provided by Udacity and codes 
 * functions that allow users of the software to play Frogger where a
 * player has to avoid enemies and get to the river. The player can choose
 * a gamepiece character and can earn points by collecting keys and reaching
 * the river. Colliding with an enemy results in loss of points. Enemy speed
 * increases as player increases in the number of keys collected and points
 * scored.
 */
'use strict';

/** 
 * Enemies the player must avoid.
 * Parameter: y, position y given as each new enemy is created.
 */
var Enemy = function (y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = y;
    this.speed = Math.floor((Math.random() * 400) + 100);
};

/**
 * Updates the enemy's position.
 * Parameter: dt, a time delta between ticks.
 */
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = -101;
        this.speed = Math.floor((Math.random() * (400 + scorePoints)) + (100 +
            keysCollected));
    }
};

// Draws the enemy on the screen. 
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Creates player.
var Player = function () {
    this.sprite = 'images/Selector.png';
    this.x = 202;
    this.y = 383;
    this.speedY = 83;
    this.speedX = 101;
};

// Allows user to pick a game piece character for the player.
Player.prototype.pickCharacter = function () {
    var characterChoices = document.getElementById('characterChoices');
    var resetButton = document.getElementById('resetButton');
    var characterImages = document.getElementsByTagName('img');
    var imgsLength = characterImages.length;
    var self = this;

    characterChoices.style.display = 'block';

    function chooseImage(event) {
        var image = event.target;
        self.sprite = image.getAttribute('src');
        characterChoices.style.display = 'none';
        resetButton.style.display = 'block';
    }

    for (var i = 0; i < imgsLength; ++i) {
        characterImages[i].addEventListener('click', chooseImage);
    }
};

// Updates score and moves player back to beginning position upon reaching the river.
Player.prototype.update = function () {
    if (this.y <= 0) {
        ++scorePoints;
        this.reset();
    }
};

// Draws the player on the canvas.
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Moves player on canvas.
Player.prototype.handleInput = function (direction) {
    if (direction === 'left' && this.x > 100) {
        this.x -= this.speedX;
    }
    if (direction === 'up' && this.y > 50) {
        this.y -= this.speedY;
    }
    if (direction === 'right' && this.x < 304) {
        this.x += this.speedX;
    }
    if (direction === 'down' && this.y < 301) {
        this.y += this.speedY;
    }
};

// Sends player back to original position.
Player.prototype.reset = function () {
    this.x = 202;
    this.y = 383;
};

// Establishs the key class with image and resets key to a randomized position.
var Key = function () {
    this.sprite = 'images/Key.png';
    this.reset();
};

// Draws the key on canvas.
Key.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Updates scoreboard.
Key.prototype.update = function () {
    if (
        player.x <= (key.x + 15) && key.x <= (player.x + 15) && player.y <= (key.y +
            15) && key.y <= (player.y + 15)
    ) {
        ++keysCollected;
        ++scorePoints;
        this.reset();
    }
};

// Resets key to a random position.
Key.prototype.reset = function () {
    var xPositions = [0, 101, 202, 303, 404];
    var yPositions = [51, 134, 217];
    this.x = randomize(xPositions);
    this.y = randomize(yPositions);
};

var allEnemies = [new Enemy(63), new Enemy(145), new Enemy(229)];

var player = new Player();

var key = new Key();

var scorePoints = 0;

var keysCollected = 0;

// Listens for key presses and sends the keys to your Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Randomizes an array. 
function randomize(array) {
    return array[Math.floor(Math.random() * array.length)];
}