import { Position } from "./Position";

/**
 * Class for game elements in the game
 */

export class GameElement {

    private position: Position;
    private height: number;
    private width: number;
    private color: string;

    constructor(width: number, height: number, position: Position, color: string) {
        this.width = width;
        this.height = height;
        this.position = position;
        this.color = color;
    }

    getPosition() {
        return this.position;
    }

    getWidth() {
        return this.width;
    }

    getHeigth() {
        return this.height;
    }

    setPosition() {
        return this.position;
    }

    getColor() {
        return this.color;
    }

}
