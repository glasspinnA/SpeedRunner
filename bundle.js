(function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
    1: [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * Class for game elements in the game
         */
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
        exports.GameElement = GameElement;

    }, {}], 2: [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * Class for be able to set and get game elements position
         */
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
        exports.Position = Position;

    }, {}], 3: [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var game;
        var GameElement_1 = require("./outdir/GameElement");
        var Position_1 = require("./outdir/Position");
        /**
         * Class that controlls the game
         */
        var Game = /** @class */ (function () {
            function Game(mCanvas) {
                this.FIGURE_SIZE = 50;
                this.gravity = 1;
                this.gravitySpeed = 0;
                this.frameRate = 0;
                this.obstacleArray = Array();
                this.context = mCanvas.getContext("2d");
                this.canvasHeight = mCanvas.height;
                this.canvasWidth = mCanvas.width;
                this.player = new GameElement_1.GameElement(this.FIGURE_SIZE, this.FIGURE_SIZE, new Position_1.Position(100, 400), "yellow");
                this.obstacleArray.push(this.createObstalce());
            }
            /**
             * Function thats starts the game loop
             */
            Game.prototype.start = function () {
                this.update();
            };
            /**
             * Function that updates the game window
             */
            Game.prototype.update = function () {
                var _this = this;
                this.interval = requestAnimationFrame(function () { return _this.update(); });
                this.clearCanvas();
                this.moveElement();
                this.checkCollision();
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
                return new GameElement_1.GameElement(obstalceWidth, obstalceHeight, new Position_1.Position(startPositionX, startPositionY), "brown");
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
                    this.gravity = 1;
                }
                this.gravitySpeed += this.gravity;
                this.player.getPosition().setY(this.player.getPosition().getY() + this.gravitySpeed);
                this.obstacleArray[0].getPosition().setX(this.obstacleArray[0].getPosition().getX() - 10);
            };
            /**
             * Function to check if the player touches the obstacle
             */
            Game.prototype.checkCollision = function () {
                var playerX1 = this.player.getPosition().getX();
                var playerX2 = this.player.getPosition().getX() + this.player.getWidth();
                var playerY1 = this.player.getPosition().getY();
                var playerY2 = this.player.getPosition().getY() + this.player.getHeigth();
                var obstacleX1 = this.obstacleArray[0].getPosition().getX();
                var obstacleX2 = this.obstacleArray[0].getPosition().getX() + this.obstacleArray[0].getWidth();
                var obstacleY1 = this.obstacleArray[0].getPosition().getY();
                var obstacleY2 = this.obstacleArray[0].getPosition().getY() + this.obstacleArray[0].getHeigth();
                if (playerX1 < obstacleX2 && playerX2 > obstacleX1
                    &&
                    playerY1 < obstacleY2 && playerY2 > obstacleY1) {
                    cancelAnimationFrame(this.interval);
                }
            };
            /**
             * Function that makes the player to jump
             */
            Game.prototype.jumpPlayer = function () {
                this.gravity = -15;
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
        /**
         * Function that listens after keypresses
         * @param event
         */
        function keyPressed(event) {
            var KEY_CODE = event.keyCode;
            var SPACE_BAR = 32;
            switch (KEY_CODE) {
                case SPACE_BAR:
                    game.jumpPlayer();
                    break;
            }
        }
        /**
         * Function that inits the game window
         */
        function initGameWindow() {
            var CANVAS = document.getElementById('canvas');
            return CANVAS;
        }
        window.onload = function () {
            document.addEventListener("keydown", keyPressed);
            var CANVAS = initGameWindow();
            game = new Game(CANVAS);
            game.start();
        };

    }, { "./GameElement": 1, "./Position": 2 }]
}, {}, [3]);
