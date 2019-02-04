"use strict";
var game;
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.posX = x;
        this.posY = y;
    }
    Position.prototype.getX = function () {
        return this.posX;
    };
    Position.prototype.getY = function () {
        return this.posY;
    };
    Position.prototype.setX = function (x) {
        this.posX = x;
    };
    Position.prototype.setY = function (y) {
        this.posY = y;
    };
    return Position;
}());
var Game = /** @class */ (function () {
    function Game(mCanvas) {
        this.FIGURE_SIZE = 50;
        this.gravity = 0.3;
        this.gravitySpeed = 0;
        this.canJump = false;
        this.context = mCanvas.getContext("2d");
        this.height = mCanvas.height;
        this.width = mCanvas.width;
        this.elementPos = new Position(100, 400);
    }
    Game.prototype.start = function () {
        var _this = this;
        var interval = setInterval(function () {
            _this.update();
        }, 60);
    };
    /**
     * Function that updates the game window
     */
    Game.prototype.update = function () {
        this.clearCanvas();
        this.moveElement();
        this.draw();
    };
    /**
     * Function that implements gravity to the game
     */
    Game.prototype.moveElement = function () {
        if (this.elementPos.getY() >= this.height - this.FIGURE_SIZE) {
            this.elementPos.setY(this.height - this.FIGURE_SIZE);
            this.gravitySpeed = 0;
            this.canJump = true;
        }
        else {
            this.canJump = false;
            this.gravity = .3;
        }
        this.gravitySpeed += this.gravity;
        this.elementPos.setY(this.elementPos.getY() + this.gravitySpeed);
    };
    /**
     * Function that makes the figure to jump
     */
    Game.prototype.jump = function () {
        this.gravity = -7;
    };
    /**
     * Function to clear the canvas
     */
    Game.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    };
    /**
     * Function that draws the elements
     */
    Game.prototype.draw = function () {
        this.context.fillStyle = "red";
        this.context.fillRect(this.elementPos.getX(), this.elementPos.getY(), this.FIGURE_SIZE, this.FIGURE_SIZE);
    };
    return Game;
}());
function keyPressed(event) {
    var KEY_CODE = event.keyCode;
    var SPACE_BAR = 32;
    switch (KEY_CODE) {
        case SPACE_BAR:
            game.jump();
            break;
    }
}
window.onload = function () {
    document.addEventListener("keydown", keyPressed);
    var CANVAS = initGameWindow();
    game = new Game(CANVAS);
    game.start();
};
/**
 * Function that inits the game window
 */
function initGameWindow() {
    var CANVAS = document.getElementById('canvas');
    return CANVAS;
}
