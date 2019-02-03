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
        this.context = mCanvas.getContext("2d");
        this.height = mCanvas.height;
        this.width = mCanvas.width;
        this.elementPos = new Position(100, 20);
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
     * Function that moves the element on the screeen
     */
    Game.prototype.moveElement = function () {
        this.elementPos.setY(this.elementPos.getY() + 10);
        if (this.elementPos.getY() > this.height - 50) {
            this.elementPos.setY(this.height - 50);
        }
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
        console.log("draw");
        this.context.fillStyle = "red";
        this.context.fillRect(this.elementPos.getX(), this.elementPos.getY(), 50, 50);
    };
    return Game;
}());
function keyPressed(event) {
    var KEY_CODE = event.keyCode;
    var SPACE_BAR = 32;
    switch (KEY_CODE) {
        case SPACE_BAR:
            game.moveElement();
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
