/**
 * Class for be able to set and get game elements position
 */
export class Position {
    private posX: number;
    private posY: number;

    constructor(x: number, y: number) {
        this.posX = x;
        this.posY = y;
    }

    public getX() {
        return this.posX;
    }

    public getY() {
        return this.posY;
    }

    public setX(x: number) {
        this.posX = x;
    }

    public setY(y: number) {
        this.posY = y;
    }
}