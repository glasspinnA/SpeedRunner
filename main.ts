var game: any;

class Position {
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


class Game {
    private context: CanvasRenderingContext2D;
    private height: number;
    private width: number;
    private interval: any;
    private elementPos: Position;

    constructor(mCanvas: HTMLCanvasElement) {
        this.context = <CanvasRenderingContext2D>mCanvas.getContext("2d");
        this.height = mCanvas.height;
        this.width = mCanvas.width;

        this.elementPos = new Position(100, 20);
    }

    start() {
        let interval = setInterval(() => {
            this.update();
        }, 60);
    }

    /**
     * Function that updates the game window
     */
    update() {
        this.clearCanvas();
        this.moveElement();
        this.draw();
    }

    /**
     * Function that moves the element on the screeen
     */
    moveElement() {
        this.elementPos.setY(this.elementPos.getY() + 10);

        if (this.elementPos.getY() > this.height - 50) {
            this.elementPos.setY(this.height - 50);
        }
    }

    /**
     * Function to clear the canvas
     */
    clearCanvas() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    /**
     * Function that draws the elements
     */
    draw() {
        console.log("draw");
        this.context.fillStyle = "red";
        this.context.fillRect(this.elementPos.getX(), this.elementPos.getY(), 50, 50);
    }
}

function keyPressed(event: KeyboardEvent) {
    const KEY_CODE = event.keyCode;
    const SPACE_BAR = 32;

    switch (KEY_CODE) {
        case SPACE_BAR:
            game.moveElement();
            break;
    }
}

window.onload = function () {
    document.addEventListener("keydown", keyPressed);
    const CANVAS = initGameWindow();
    game = new Game(CANVAS);
    game.start();
}

/**
 * Function that inits the game window
 */
function initGameWindow() {
    const CANVAS = <HTMLCanvasElement>document.getElementById('canvas');
    return CANVAS;
}