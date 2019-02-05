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
        this.obstacleArray = Array();
        this.context = mCanvas.getContext("2d");
        this.canvasHeight = mCanvas.height;
        this.canvasWidth = mCanvas.width;
        this.player = new GameElement(this.FIGURE_SIZE, this.FIGURE_SIZE, new Position(100, 400), "yellow");
        this.obstacleArray.push(new GameElement(50, 200, new Position(500, 300), "blue"));
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
        //this.checkCollision();
        this.drawPlayer();
        this.drawObstacle();
        this.passedObstacle();
    };
    /**
     * Function that checks if the player have jumped over the obstacle
     * if so the process to create a new obstalce begins
     */
    Game.prototype.passedObstacle = function () {
        this.frameRate++;
        if (this.frameRate > 55) {
            this.updateObstacle();
        }
    };
    /**
     * Function that updates the obstalce with a new obstacle with new attributes
     * and deletes the old obstacle that the player have jumped over
     */
    Game.prototype.updateObstacle = function () {
        this.frameRate = 0;
        this.obstacleArray.pop();
        this.obstacleArray.push(this.createObstalce());
    };
    /**
     * Function to create a new obstalce
     */
    Game.prototype.createObstalce = function () {
        // 11 = differeansen mellan x1 och x2 plus en etta
        var obstalceWidth = Math.floor(Math.random() * 11) + 40;
        var obstalceHeight = Math.floor(Math.random() * 11) + 40;
        var startPositionX = Math.floor(Math.random() * 20) + 500;
        var startPositionY = this.canvasHeight - obstalceHeight;
        return new GameElement(obstalceWidth, obstalceHeight, new Position(startPositionX, startPositionY), "brown");
    };
    /**
     * Function that draws the obstacle
     */
    Game.prototype.drawObstacle = function () {
        this.context.fillStyle = this.obstacleArray[0].getColor();
        this.context.fillRect(this.obstacleArray[0].getPosition().getX(), this.obstacleArray[0].getPosition().getY(), this.obstacleArray[0].getWidth(), this.obstacleArray[0].getHeigth());
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
        this.obstacleArray[0].getPosition().setX(this.obstacleArray[0].getPosition().getX() - 10);
    };
    /**
     * Function to check if the player touches any obstacle
     */
    Game.prototype.checkCollision = function () {
        if (this.obstacleArray[0].getPosition().getX() - this.player.getPosition().getX() <= this.FIGURE_SIZE
            &&
                this.player.getPosition().getY() - this.obstacleArray[0].getPosition().getY() < 151) {
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
     * Function that draws the player element
     */
    Game.prototype.drawPlayer = function () {
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
