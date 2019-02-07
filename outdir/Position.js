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
