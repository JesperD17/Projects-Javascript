let mijnInterval1 = null;
let mijnInterval2 = null;
let initStep = 2;
let stepX = 0;
let stepY = 0;
let stepYUp = -10;
let stepXDown = 10;
let P1P = 1; //P1P = player 1, point(s) of speler 1, punt(en)
let P2P = 1;
left = document.getElementById('leftPong');
right = document.getElementById('rightPong');
field = document.getElementById("field");
mvDiv = document.getElementById("moveDiv");

function clear() {
    clearInterval(mijnInterval1);
    clearInterval(mijnInterval2);
    mijnInterval1 = 0;
    mijnInterval2 = 0;
}

function freset() { // de clear functie zet alles stil, reset de snelheid en zett de movediv in het midden.
    clear();
    mvDiv.style.left = "49%";
    mvDiv.style.top = "50%";
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
    clear()
}

document.addEventListener("DOMContentLoaded", () => { // voordat de movediv automatisch beweegt gaat hij stilstaan met de clear functie
    freset();
    rect = field.getBoundingClientRect(); 
    width = rect.width - 25;
    height = rect.height - 25;

    mvDivRect = mvDiv.getBoundingClientRect();
    pongLeft = left.getBoundingClientRect();
    pongRight = right.getBoundingClientRect();
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
    
    if (xPos + stepX < 0 || xPos + stepX > width) {
        stepX = stepX;
    }
    
    // borders Pongs, borders field.
    if (mvDivRect.left <= pongLeft.right && mvDivRect.right >= pongLeft.left &&
        mvDivRect.top <= pongLeft.bottom && mvDivRect.bottom >= pongLeft.top) {
            stepX = -stepX;
            console.log("Collision");
    }
    if (mvDivRect.right >= pongRight.left && mvDivRect.left <= pongRight.right &&
        mvDivRect.top <= pongRight.bottom && mvDivRect.bottom >= pongRight.top) {
            stepX = -stepX;
            console.log("Collision");
    }
    if (xPos < 1 ) {// elke keer als de movediv de linker kant aanraakt.
        clearInterval(controlManagerInterval);
        freset();
        document.getElementById("count2").innerHTML = P1P;
        P1P++;
    } 
    if (xPos > width - 1) {
        clearInterval(controlManagerInterval);
        freset();
        document.getElementById("count1").innerHTML = P2P;
        P2P++;
    }
    mvDiv.style.left = (xPos + stepX) + "px";
    
}





let pressedKeys = {};
let controlManagerInterval;
let controlManagerRectRefreshIndex = 0; 

function keyDownHandler(event) {
    if (pressedKeys[event.code]) return;
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

    console.log("Move");
    pongLeft = left.getBoundingClientRect();
    pongRight = right.getBoundingClientRect();
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);