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
