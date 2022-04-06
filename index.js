const canvas  = document.getElementById('game');
// getContext retourne un contexte de dessin sur le canevas
const ctx     = canvas.getContext('2d');


class SnakePart{
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;
let xVelocity = 0;
let yVelocity = 0;
let appleX = 5;
let appleY = 5;
let score = 0;

// game loop
function drawGame() {
    changeSnakePosition();

    let result = isGameOver();
    if(result) {
        return; // si result vaux true on return on arrète de dessiner le jeu
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    if(score > 5) {
        speed = 10;
    }

    if(score > 10) {
        speed = 15;
    }

    if(score > 20) {
        speed = 20;
    }

    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    if(xVelocity === 0 && yVelocity === 0){
        return false;
    }

    // si on touche un mur > walls check
    if(headX < 0) {
        gameOver = true;
    }

    else if(headX === tileCount) {
        gameOver = true;
    }

    else if(headY < 0) {
        gameOver = true;
    }

    else if(headY === tileCount) {
        gameOver = true;
    }

    for(let i = 0 ; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if(gameOver) {
        ctx.fillStyle ='white';
        ctx.font = "50px Verdana";
        // ici on va ajouter différents niveau de couleur
        var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
        gradient.addColorStop('0', 'magenta');
        gradient.addColorStop('0.5', 'blue');
        gradient.addColorStop('1.0', 'red');
        ctx.fillStyle = gradient;
        ctx.fillText('Game Over !', canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}

function clearScreen() {
    // spécifie la couleur ou style à utilliser
    ctx.fillStyle = 'black';
    // dessine un rectangle plein aux coordonnées x, y et aux dimensions déterminées par largueur et hauteur
    ctx.fillRect (0,0,canvas.width,canvas.height);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana';
    ctx.fillText("Score" + score, canvas.width-50, 10);
}

function drawSnake() {

    ctx.fillStyle = 'green';
    for(i = 0 ; i < snakeParts.length ; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    // La méthode push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.
    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > tailLength) {
        // La méthode shift() permet de retirer le premier élément d'un tableau et de renvoyer cet élément.
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect (headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX += xVelocity;
    headY += yVelocity;
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect (appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if(headX === appleX && headY === appleY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(e) {
    // up à pour keyCode le numéro 38 il faut google pour trouver les autres keyCode
    if(e.keyCode == 38) {
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    // down
    if(e.keyCode == 40) {
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if(e.keyCode == 37) {
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    if(e.keyCode == 39) {
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();