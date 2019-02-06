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

    private gravity = 1;
    private gravitySpeed = 0;

    private frameRate: number = 0;

    private player: GameElement;
    private obstacleArray = Array<GameElement>();

    constructor(mCanvas: HTMLCanvasElement) {
        this.context = <CanvasRenderingContext2D>mCanvas.getContext("2d");
        this.canvasHeight = mCanvas.height;
        this.canvasWidth = mCanvas.width;

        this.player = new GameElement(this.FIGURE_SIZE, this.FIGURE_SIZE, new Position(100, 400), "yellow");
        this.obstacleArray.push(this.createObstalce());
    }

    /**
     * Function thats starts the game loop 
     */
    start() {
        this.update();
    }

    /**
     * Function that updates the game window
     */
    update() {
        this.interval = requestAnimationFrame(() => this.update());

        this.clearCanvas();
        this.moveElement();
        this.checkCollision();
        this.drawPlayer();
        this.drawObstacle();
        this.passedObstacle();
    }

    /**
     * Function that checks if the player have jumped over the obstacle
     * if so the process to create a new obstalce begins
     */
    passedObstacle() {
        this.frameRate++;

        if (this.frameRate > 55) {
            this.updateObstacle();
        }
    }

    /**
     * Function that updates the obstalce with a new obstacle with new attributes
     * and deletes the old obstacle that the player have jumped over
     */
    updateObstacle() {
        this.frameRate = 0;

        this.obstacleArray.pop();

        this.obstacleArray.push(this.createObstalce());
    }

    /**
     * Function to create a new obstalce
     */
    createObstalce() {
        // 11 = differeansen mellan x1 och x2 plus en etta
        const obstalceWidth = Math.floor(Math.random() * 11) + 40;
        const obstalceHeight = Math.floor(Math.random() * 11) + 40;

        const startPositionX = Math.floor(Math.random() * 20) + 500;
        const startPositionY = this.canvasHeight - obstalceHeight;

        return new GameElement(obstalceWidth, obstalceHeight, new Position(startPositionX, startPositionY), "brown");
    }

    /**
     * Function that draws the obstacle
     */
    drawObstacle() {
        this.context.fillStyle = this.obstacleArray[0].getColor();
        this.context.fillRect(
            this.obstacleArray[0].getPosition().getX(),
            this.obstacleArray[0].getPosition().getY(),
            this.obstacleArray[0].getWidth(),
            this.obstacleArray[0].getHeigth());
    }


    /**
     * Function that implements gravity to the game
     */
    moveElement() {
        if (this.player.getPosition().getY() >= this.canvasHeight - this.FIGURE_SIZE) {
            this.player.getPosition().setY(this.canvasHeight - this.FIGURE_SIZE);
            this.gravitySpeed = 0;
        } else {
            this.gravity = 1;
        }

        this.gravitySpeed += this.gravity;
        this.player.getPosition().setY(this.player.getPosition().getY() + this.gravitySpeed);


        this.obstacleArray[0].getPosition().setX(this.obstacleArray[0].getPosition().getX() - 10);
    }

    /**
     * Function to check if the player touches the obstacle
     */
    checkCollision() {
        const playerX1 = this.player.getPosition().getX();
        const playerX2 = this.player.getPosition().getX() + this.player.getWidth();
        const playerY1 = this.player.getPosition().getY();
        const playerY2 = this.player.getPosition().getY() + this.player.getHeigth();

        const obstacleX1 = this.obstacleArray[0].getPosition().getX();
        const obstacleX2 = this.obstacleArray[0].getPosition().getX() + this.obstacleArray[0].getWidth();
        const obstacleY1 = this.obstacleArray[0].getPosition().getY();
        const obstacleY2 = this.obstacleArray[0].getPosition().getY() + this.obstacleArray[0].getHeigth();

        if (playerX1 < obstacleX2 && playerX2 > obstacleX1
            &&
            playerY1 < obstacleY2 && playerY2 > obstacleY1) {
            cancelAnimationFrame(this.interval);
        }
    }

    /**
     * Function that makes the player to jump
     */
    jumpPlayer() {
        this.gravity = -15;
    }

    /**
     * Function to clear the canvas
     */
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    /**
     * Function that draws the player element
     */
    drawPlayer() {
        this.context.fillStyle = this.player.getColor();
        this.context.fillRect(
            this.player.getPosition().getX(),
            this.player.getPosition().getY(),
            this.FIGURE_SIZE,
            this.FIGURE_SIZE);
    }
}

function keyPressed(event: KeyboardEvent) {
    const KEY_CODE = event.keyCode;
    const SPACE_BAR = 32;

    switch (KEY_CODE) {
        case SPACE_BAR:
            game.jumpPlayer();
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
