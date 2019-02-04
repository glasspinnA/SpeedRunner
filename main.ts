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
    private FIGURE_SIZE: number = 50;


    private gravity = 0.3;
    private gravitySpeed = 0;
    private canJump = false;

    constructor(mCanvas: HTMLCanvasElement) {
        this.context = <CanvasRenderingContext2D>mCanvas.getContext("2d");
        this.height = mCanvas.height;
        this.width = mCanvas.width;

        this.elementPos = new Position(100, 400);
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
     * Function that implements gravity to the game
     */
    moveElement() {
        if (this.elementPos.getY() >= this.height - this.FIGURE_SIZE) {
            this.elementPos.setY(this.height - this.FIGURE_SIZE);
            this.gravitySpeed = 0;
            this.canJump = true;
        } else {
            this.canJump = false;
            this.gravity = .3;
        }

        this.gravitySpeed += this.gravity;
        this.elementPos.setY(this.elementPos.getY() + this.gravitySpeed);
    }

    /**
     * Function that makes the figure to jump
     */
    jump() {
        this.gravity = -7;
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
        this.context.fillStyle = "red";
        this.context.fillRect(this.elementPos.getX(), this.elementPos.getY(), this.FIGURE_SIZE, this.FIGURE_SIZE);
    }
}

function keyPressed(event: KeyboardEvent) {
    const KEY_CODE = event.keyCode;
    const SPACE_BAR = 32;

    switch (KEY_CODE) {
        case SPACE_BAR:
            game.jump();
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