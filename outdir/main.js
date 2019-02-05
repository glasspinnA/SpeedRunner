"use strict";
var game;
var GameElement = /** @class */ (function () {
    function GameElement(width, height, position, color) {
        this.width = width;
        this.height = height;
        this.position = position;
        this.color = color;
    }
    GameElement.prototype.getPosition = function () {
        return this.position;
    };
    GameElement.prototype.getWidth = function () {
        return this.width;
    };
    GameElement.prototype.getHeigth = function () {
        return this.height;
    };
    GameElement.prototype.setPosition = function () {
        return this.position;
    };
    GameElement.prototype.getColor = function () {
        return this.color;
    };
    return GameElement;
}());
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
        this.frameRate = 0;
        this.context = mCanvas.getContext("2d");
        this.canvasHeight = mCanvas.height;
        this.canvasWidth = mCanvas.width;
        this.player = new GameElement(this.FIGURE_SIZE, this.FIGURE_SIZE, new Position(100, 400), "yellow");
        this.ob = new GameElement(50, 200, new Position(500, 300), "blue");
    }
    Game.prototype.start = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.update();
        }, 60);
    };
    /**
     * Function that updates the game window
     */
    Game.prototype.update = function () {
        this.clearCanvas();
        this.moveElement();
        this.checkCollision();
        this.draw();
        this.drawOb();
        console.log(this.frameRate++);
        if (this.frameRate > 55) {
            clearInterval(this.interval);
        }
    };
    Game.prototype.drawOb = function () {
        this.context.fillStyle = this.ob.getColor();
        this.context.fillRect(this.ob.getPosition().getX(), this.ob.getPosition().getY(), this.ob.getWidth(), this.ob.getHeigth());
    };
    /**
     * Function that implements gravity to the game
     */
    Game.prototype.moveElement = function () {
        if (this.player.getPosition().getY() >= this.canvasHeight - this.FIGURE_SIZE) {
            this.player.getPosition().setY(this.canvasHeight - this.FIGURE_SIZE);
            this.gravitySpeed = 0;
        }
        else {
            this.gravity = .3;
        }
        this.gravitySpeed += this.gravity;
        this.player.getPosition().setY(this.player.getPosition().getY() + this.gravitySpeed);
        this.ob.getPosition().setX(this.ob.getPosition().getX() - 10);
    };
    /**
     * Function to check if the player touches any obstacle
     */
    Game.prototype.checkCollision = function () {
        if (this.ob.getPosition().getX() - this.player.getPosition().getX() <= this.FIGURE_SIZE &&
            this.player.getPosition().getY() - this.ob.getPosition().getY() < 151) {
            clearInterval(this.interval);
        }
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
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    };
    /**
     * Function that draws the elements
     */
    Game.prototype.draw = function () {
        this.context.fillStyle = this.player.getColor();
        this.context.fillRect(this.player.getPosition().getX(), this.player.getPosition().getY(), this.FIGURE_SIZE, this.FIGURE_SIZE);
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
