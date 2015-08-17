/** 
 * Engine.js
 * Author1: Udacity
 * Author2: Joy Thomas (joythomas@outlook.com)
 * Date: August 2015
 *
 * Description: This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on player, enemy, and key objects (defined in app.js).
 */
var Engine = (function (global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {

        // Get time delta information for smooth game animation.
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
        player.pickCharacter();
    }

    /* This function is called by main (the game loop) and itself calls all
     * of the functions which may need to update entity's data and checks for
     * for collision between the player and enemy.
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    /* This is called by the update function and loops through all of the
     * objects as defined in app.js and calls their update() methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update();
        key.update();

    }

    /* This is called by the update function and checks for collision between 
     * player and enemy objects.
     */
    function checkCollisions() {
        allEnemies.forEach(function (enemy) {
            if (
                player.x <= (enemy.x + 50) && enemy.x <= (player.x + 50) && player.y <=
                (enemy.y + 50) && enemy.y <= (player.y + 50)
            ) {
                --scorePoints;
                player.reset();
            }
        });
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. 
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png', // Top row is water
                'images/stone-block.png', // Row 1 of 3 of stone
                'images/stone-block.png', // Row 2 of 3 of stone
                'images/stone-block.png', // Row 3 of 3 of stone
                'images/grass-block.png', // Row 1 of 2 of grass
                'images/grass-block.png' // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();

        /*This draws the score board.*/
        ctx.fillStyle = 'rgb(250, 250, 250)';
        ctx.font = "24px Helvetica";
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText('Keys collected: ' + keysCollected, 10, 580);
        ctx.fillText('Score: ' + scorePoints, 390, 580);
    }

    /* This function is called by the render function and is called on each game
     * tick. It calls the render functions defined within app.js
     */
    function renderEntities() {

        allEnemies.forEach(function (enemy) {
            enemy.render();
        });

        player.render();

        key.render();
    }

    // Resets game.
    function reset() {
        var resetButton = document.getElementById('resetButton');
        var characterChoices = document.getElementById('characterChoices');

        function resetGame() {
            characterChoices.style.display = 'block';
            resetButton.style.display = 'none';
            player.sprite = 'images/Selector.png';
            player.reset();
            key.reset();
            scorePoints = 0;
            keysCollected = 0;
        }

        resetButton.addEventListener('click', resetGame);

    }

    /* Loads all images needed. Uses init as the callback method, so that when
     * all of these images are properly loaded the game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/Selector.png',
        'images/char-pink-girl.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-princess-girl.png',
        'images/Key.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
