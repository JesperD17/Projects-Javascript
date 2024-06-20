let mijnInterval1 = null;
let mijnInterval2 = null;
let initStep = 1;
let stepX = 0;
let stepY = 0;
let stepYUp = -10;
let stepXDown = 10;
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

document.addEventListener("DOMContentLoaded", () => { 
    clearInterval(mijnInterval1);
    clearInterval(mijnInterval2);
    mijnInterval1 = null;
    mijnInterval2 = null;
    fstart();
});

function moveY() {
    let yPos = mvDiv.offsetTop;
    if (yPos + stepY < 0 || yPos + stepY > height) {
        stepY = -stepY;
    }
    mvDiv.style.top = (yPos + stepY) + "px";
}

function moveX() {
    let xPos = mvDiv.offsetLeft;
    mvDivRect = mvDiv.getBoundingClientRect();

    if (xPos + stepX < 0 || xPos + stepX > width) {
        stepX = -stepX;
    }

    if (mvDivRect.right >= right.offsetLeft && // borders
        mvDivRect.left <= right.offsetLeft + right.offsetWidth &&
        mvDivRect.top + mvDivRect.height >= right.offsetTop &&
        mvDivRect.top <= right.offsetTop + right.offsetHeight) {
        stepX = -initStep;
    }

    if (mvDivRect.left <= left.offsetLeft + left.offsetWidth &&
        mvDivRect.right >= left.offsetLeft &&
        mvDivRect.top + mvDivRect.height >= left.offsetTop &&
        mvDivRect.top <= left.offsetTop + left.offsetHeight) {
        stepX = initStep;
    }

    mvDiv.style.left = (xPos + stepX) + "px";
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
    clearInterval(mijnInterval1);
    clearInterval(mijnInterval2);
    mijnInterval1 = null;
    mijnInterval2 = null;
}

function freset() {
    clearInterval(mijnInterval1);
    clearInterval(mijnInterval2);
    mijnInterval1 = null;
    mijnInterval2 = null;
    
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

    if (controlManagerRectRefreshIndex >= 10) {
        pongLeft = left.getBoundingClientRect();
        pongRight = right.getBoundingClientRect();
        controlManagerRectRefreshIndex = 0;
    } else {
        controlManagerRectRefreshIndex += 1;
    }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);