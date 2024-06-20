let mijnInterval1 = null;
let mijnInterval2 = null;
let initStep = 1;
let stepX = 0;
let stepY = 0;
let stepYUp = -15;
let stepXDown = 15;
let P1P = 0; //P1P = player 1 points of speler 1 punten
let P2P = 0;
let field = document.getElementById("field");
let mvDiv = document.getElementById("moveDiv");
const left = document.getElementById('leftPong');
const right = document.getElementById('rightPong');

let rect = field.getBoundingClientRect(); 
let width = rect.width - 25;
let height = rect.height - 25;

let mvDivRect = mvDiv.getBoundingClientRect();
let pongLeft = left.getBoundingClientRect();
let pongRight = right.getBoundingClientRect();

function clear() {
    clearInterval(mijnInterval1);
    clearInterval(mijnInterval2);
    mijnInterval1 = null;
    mijnInterval2 = null;
}

document.addEventListener("DOMContentLoaded", () => { 
    clear();
});

function moveY() {
    let yPos = mvDiv.offsetTop;
    if (yPos + stepY < 0 || yPos + stepY > height) { // hitbox bovenste en onderste lijn.
        stepY = -stepY;
    }
    
    mvDiv.style.top = (yPos + stepY) + "px"; // laat de movediv op de Y bewegen.
}

function moveX() {
    let xPos = mvDiv.offsetLeft;
    mvDivRect = mvDiv.getBoundingClientRect();
    mvDiv.style.left = (xPos + stepX) + "px";

    // Check for bat collision
    if (mvDivRect.left <= pongLeft.right && mvDivRect.top >= pongLeft.top && mvDivRect.bottom <= pongLeft.bottom) {
        stepX = initStep;
        initStep = initStep + 0.1;
    }
    if (mvDivRect.right >= pongRight.left && mvDivRect.top >= pongRight.top && mvDivRect.bottom <= pongRight.bottom) {
        stepX = -initStep;
        initStep = initStep + 0.1;
    }
    if (xPos < 1 ) {
        alert("Game Over");
        freset();
    } 
    if (xPos > width - 1) {

        alert("Game Over");
            freset();
    }
}

function fstart() {
    if (!mijnInterval1) {
        mijnInterval1 = setInterval(moveY, 10);
        mijnInterval2 = setInterval(moveX, 10);
        stepX = Math.round(Math.random()) ? -initStep : initStep;
        stepY = Math.round(Math.random()) ? -initStep : initStep;
    }
}

function fstop() {
    clear();
}

function freset() { // 50% dus midden in de field
    clear();
    
    mvDiv.style.left = "50%";
    mvDiv.style.top = "50%";
}

let pressedKeys = {};
let controlManagerInterval;
let controlManagerRectRefreshIndex = 0; 

function keyDownHandler(event) {
    pressedKeys[event.code] = true;
    if (Object.keys(pressedKeys).length >= 1) {
        clearInterval(controlManagerInterval);
        controlManagerInterval = setInterval(controlManager, 30);
    }
}

function keyUpHandler(event) {
    delete pressedKeys[event.code];
    if (Object.keys(pressedKeys).length === 0) {
        clearInterval(controlManagerInterval);
    }
}

function controlManager() {
    if (pressedKeys['KeyW']) {
        let yPos = left.offsetTop;
        if (yPos + stepYUp > 0) {
            left.style.top = (yPos + stepYUp) + "px";
        }
    } else if (pressedKeys['KeyS']) {
        let yPos = left.offsetTop;
        if (yPos + left.offsetHeight + stepXDown < height) {
            left.style.top = (yPos + stepXDown) + "px";
        }
    }

    if (pressedKeys['ArrowUp']) {
        let yPos = right.offsetTop;
        if (yPos + stepYUp > 0) {
            right.style.top = (yPos + stepYUp) + "px";
        }
    } else if (pressedKeys['ArrowDown']) {
        let yPos = right.offsetTop;
        if (yPos + right.offsetHeight + stepXDown < height) {
            right.style.top = (yPos + stepXDown) + "px";
        }
    }

    pongLeft = left.getBoundingClientRect();
    pongRight = right.getBoundingClientRect();
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);