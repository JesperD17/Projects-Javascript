let mijnInterval1 = null;
let mijnInterval2 = null;
// let initStep = 0;
let stepX = 0;
let stepY = 0;
let stepYUp = -15;
let stepXDown = 15;
let P1P = 1; //P1P = player 1, point(s) of speler 1, punt(en)
let P2P = 1;
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
    mijnInterval1 = 0;
    mijnInterval2 = 0;
    initStep = 10;
}

document.addEventListener("DOMContentLoaded", () => { // voordat de movediv automatisch beweegt gaat hij stilstaan met de clear functie
    clear();
});

function moveY() {
    let yPos = mvDiv.offsetTop;
    if (yPos + stepY < 0 || yPos + stepY > height) { // hitbox bovenste en onderste lijn.
        stepY = -stepY;
    }
    
    mvDiv.style.top = (yPos + stepY) + "px"; // laat de movediv op de Y bewegen.
}
let stepX0 = 10;
function moveX() {

    let xPos = mvDiv.offsetLeft;
    mvDivRect = mvDiv.getBoundingClientRect();
    mvDiv.style.left = (xPos + stepX) + "px";

    // Check for bat collision
    if (mvDivRect.left <= pongLeft.right && mvDivRect.top >= pongLeft.top && mvDivRect.bottom <= pongLeft.bottom) {
        stepX = -stepX;
        xPos = pongLeft.right +1
        //initStep = initStep + 0.1;
        console.log('door links');
        console.log('stepX = ' + stepX);
        console.log('initStep = ' + initStep);
    } 

    if (mvDivRect.right >= pongRight.left && mvDivRect.top >= pongRight.top && mvDivRect.bottom <= pongRight.bottom) {
        stepX = -stepX;
        xPos = pongRight.left -1

        //initStep = initStep + 0.1;
        // console.log('door rechts');
        // console.log('stepX = ' + stepX);
        // console.log('initStep = ' + initStep);
    }
    if (xPos < 1 ) {
        alert("Game Over"); // elke keer als de movediv de linker kant aanraakt.
        clearInterval(controlManagerInterval);
        freset();
        document.getElementById("count2").innerHTML = P1P;
        P1P++;
    } 
    if (xPos > width - 1) {
        alert("Game Over");
        clearInterval(controlManagerInterval);
        freset();
        document.getElementById("count1").innerHTML = P2P;
        P2P++;
    }
    // if(stepX > stepX0) {
        //alert("stepX="+stepX, "stepX0="+stepX0)
    // }
}

function fstart() {
    if (!mijnInterval1) {
        mijnInterval1 = setInterval(moveY, 100);
        mijnInterval2 = setInterval(moveX, 100);
        stepX = Math.round(Math.random()) ? -initStep : initStep; // als de random nummer 0 is dan gaat hij -initStep doen, als hij 1 is dan doet hij inittep
        stepY = Math.round(Math.random()) ? -initStep : initStep;
    }
}

function fstop() {
    clear();
}

function freset() { // 50% dus het midden in de field
    clear();
    mvDiv.style.left = "49%";
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