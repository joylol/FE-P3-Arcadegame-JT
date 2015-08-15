// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here.

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images.
    // x and y defines the enemy's initial location and speed is 
    // randomized.
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = y;
    this.speed = Math.floor((Math.random() * 400) + 100);

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Enemy speed increases as scorePoints and keysCollected increase.
    this.x += this.speed * dt;
    if(this.x >= 505) {
        this.x = -101;
        this.speed = Math.floor((Math.random() * (400 + scorePoints)) + (100 + keysCollected));
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// This establishes the player class and sets initial player image holder, 
// player's position, and player's speed.
var Player = function() {
    this.sprite = 'images/Selector.png';
    this.x = 202;
    this.y = 383;
    this.speedY = 83;
    this.speedX = 101;
}

// This function allows the user to pick a character to be the player. 
// Once the character is selected, the choose your character display
// disappears and is replaced by a reset game button, which allows the 
// user to restart the game.
Player.prototype.pickCharacter = function() {
    var characterChoices = document.getElementById('characterChoices');
    var resetButton = document.getElementById('resetButton');
    var characterImages = document.getElementsByTagName('img');
    var imgsLength = characterImages.length;

    characterChoices.style.display = 'block';

    function chooseImage(event) {
        var image = event.target;
        player.sprite = image.getAttribute('src');
        characterChoices.style.display = 'none';
        resetButton.style.display = 'block';
    }

    for(var i = 0; i < imgsLength; ++i) {
        characterImages[i].addEventListener('click', chooseImage);
    }
}

// Update score and moves player back to beginning position 
// when player reaches the river.
Player.prototype.update = function() {
    if (this.y <= 0) {
        ++ scorePoints;
        this.reset();
    }
}

// Draws the player on the canvas.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Describes how player should move based on the keys entered.
Player.prototype.handleInput = function(direction) {
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
}

// Sends player back to original position.
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 383;
}

// Established the key class with image and resets key to a randomized position.
var Key = function() {
    this.sprite = 'images/Key.png';
    this.reset();
}

// Draws the key on canvas.
Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Adds point to keysCollected and scorePoints when player
// collects a key. Key position is reset.
Key.prototype.update = function() {
   if(
        player.x <= (key.x + 15)
        && key.x <= (player.x + 15)
        && player.y <= (key.y + 15)
        && key.y <= (player.y + 15)
    ) {
        ++ keysCollected;
        ++ scorePoints;
        this.reset();
    }
}

//Resets key to a random position.
Key.prototype.reset = function() {
    var xPositions = [0, 101, 202, 303, 404];
    var yPositions = [51, 134, 217];
    this.x = randomize(xPositions);
    this.y = randomize(yPositions);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(63), new Enemy(145), new Enemy(229)];
// Place the player object in a variable called player.
var player = new Player();
// Key object in variable key.
var key = new Key();
// Set scorePoints and keysCollected to 0 for the start of the game.
var scorePoints = 0;

var keysCollected = 0;



// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Randomize an array. Used to randomize speed. 
function randomize(array) {
    return array[Math.floor(Math.random() * array.length)];
}


