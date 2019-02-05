var game: any;

class GameElement {

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
    private canvasHeight: number;
    private canvasWidth: number;
    private interval: any;
    private FIGURE_SIZE: number = 50;


    private gravity = 0.3;
    private gravitySpeed = 0;

    private frameRate: number = 0;

    private ob: GameElement;
    private player: GameElement;

    constructor(mCanvas: HTMLCanvasElement) {
        this.context = <CanvasRenderingContext2D>mCanvas.getContext("2d");
        this.canvasHeight = mCanvas.height;
        this.canvasWidth = mCanvas.width;

        this.player = new GameElement(this.FIGURE_SIZE, this.FIGURE_SIZE, new Position(100, 400), "yellow");
        this.ob = new GameElement(50, 200, new Position(500, 300), "blue");
    }

    start() {
        this.interval = setInterval(() => {
            this.update();
        }, 60);
    }

    /**
     * Function that updates the game window
     */
    update() {
        this.clearCanvas();
        this.moveElement();
        this.checkCollision();
        this.draw();
        this.drawOb();

        console.log(this.frameRate++);
        if (this.frameRate > 55) {
            clearInterval(this.interval);
        }
    }

    drawOb() {
        this.context.fillStyle = this.ob.getColor();
        this.context.fillRect(this.ob.getPosition().getX(), this.ob.getPosition().getY(), this.ob.getWidth(), this.ob.getHeigth());
    }


    /**
     * Function that implements gravity to the game
     */
    moveElement() {
        if (this.player.getPosition().getY() >= this.canvasHeight - this.FIGURE_SIZE) {
            this.player.getPosition().setY(this.canvasHeight - this.FIGURE_SIZE);
            this.gravitySpeed = 0;
        } else {
            this.gravity = .3;
        }

        this.gravitySpeed += this.gravity;
        this.player.getPosition().setY(this.player.getPosition().getY() + this.gravitySpeed);


        this.ob.getPosition().setX(this.ob.getPosition().getX() - 10);
    }

    /**
     * Function to check if the player touches any obstacle
     */
    checkCollision() {
        if (this.ob.getPosition().getX() - this.player.getPosition().getX() <= this.FIGURE_SIZE &&
            this.player.getPosition().getY() - this.ob.getPosition().getY() < 151) {
            clearInterval(this.interval);
        }
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
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    /**
     * Function that draws the elements
     */
    draw() {
        this.context.fillStyle = this.player.getColor();
        this.context.fillRect(this.player.getPosition().getX(), this.player.getPosition().getY(), this.FIGURE_SIZE, this.FIGURE_SIZE);
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