let mijnInterval1 = null;
let mijnInterval2 = null;
let dir = 2;
let PositieX = 0;
let PositieY = 0;
let SnelheidYomhoog = -10;
let SnelheidXomlaag = 10;
let P1P = 1; //P1P = player 1, point(s) of speler 1, punt(en)
let P2P = 1;
left = document.getElementById('linkerSpeler');
right = document.getElementById('rechterSpeler');
field = document.getElementById("veld");
ball = document.getElementById("ball");

function clear() {
    clearInterval(mijnInterval1);
    clearInterval(mijnInterval2);
    mijnInterval1 = 0;
    mijnInterval2 = 0;
}

function freset() { // de clear functie zet alles stil, reset de snelheid en zett de movediv in het midden.
    clear();
    console.log('Field dimensions:', field.offsetWidth, field.offsetHeight);

    ball.style.left = "49%"
    ball.style.top = "50%"

    console.log('Ball position:', ball.style.left, ball.style.top);
}

function fstart() {
    if (!mijnInterval1) {
        mijnInterval1 = setInterval(moveY, 10);
        mijnInterval2 = setInterval(moveX, 10);
        PositieX = Math.round(Math.random()) ? -dir : dir; // operator.
        PositieY = Math.round(Math.random()) ? -dir : dir;
    }
}

function fstop() {
    clear()
}

document.addEventListener("DOMContentLoaded", () => { // voordat de movediv automatisch beweegt gaat hij stilstaan met de clear functie.
    freset();
    rect = field.getBoundingClientRect(); //rect haalt top, bottom, left, right, width en height op vanuit een div. 
    width = rect.width - 25;
    height = rect.height - 25;

    GrootteP1 = left.getBoundingClientRect();
    GrootteP2 = right.getBoundingClientRect();
});

function moveY() {
    let huidigePositie = ball.offsetTop;
    if (huidigePositie + PositieY < 0 || huidigePositie + PositieY > height) { // hitbox bovenste en onderste lijn.
        PositieY = -PositieY;
    }
    ball.style.top = (huidigePositie + PositieY) + "px"; // laat de movediv op de Y bewegen.
}

function moveX() {
    let xPos = ball.offsetLeft;
    ballRect = ball.getBoundingClientRect();
    
    if (xPos + PositieX < 0 || xPos + PositieX > width) {
        PositieX = PositieX;
    }
    
    // borders spelers, borders field.
    if (ballRect.left <= GrootteP1.right && ballRect.right >= GrootteP1.left &&
        ballRect.top <= GrootteP1.bottom && ballRect.bottom >= GrootteP1.top) {
            PositieX = -PositieX;
            console.log("links");
    }
    if (ballRect.right >= GrootteP2.left && ballRect.left <= GrootteP2.right &&
        ballRect.top <= GrootteP2.bottom && ballRect.bottom >= GrootteP2.top) {
            PositieX = -PositieX;
            console.log("rechts");
    }
    if (xPos < 1) {// elke keer als de movediv de linker kant aanraakt.
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
    ball.style.left = (xPos + PositieX) + "px";
    
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
    if (pressedKeys['KeyW']) { // beweegt de linker speler omhoog
        let linkerSpelerYpos = left.offsetTop;
        if (linkerSpelerYpos + SnelheidYomhoog > 0) {
            left.style.top = (linkerSpelerYpos + SnelheidYomhoog) + "px";
        }
    } else if (pressedKeys['KeyS']) { // beweegt de linker speler omlaag
        let linkerSpelerYpos = left.offsetTop;
        if (linkerSpelerYpos + left.offsetHeight + SnelheidXomlaag < height) {
            left.style.top = (linkerSpelerYpos + SnelheidXomlaag) + "px";
        }
    }

    if (pressedKeys['ArrowUp']) { //beweegt de rechter speler omhoog
        let linkerSpelerYpos = right.offsetTop;
        if (linkerSpelerYpos + SnelheidYomhoog > 0) {
            right.style.top = (linkerSpelerYpos + SnelheidYomhoog) + "px";
        }
    } else if (pressedKeys['ArrowDown']) { //beweegt de linker speler omhoog
        let linkerSpelerYpos = right.offsetTop;
        if (linkerSpelerYpos + right.offsetHeight + SnelheidXomlaag < height) {
            right.style.top = (linkerSpelerYpos + SnelheidXomlaag) + "px";
        }
    }

    console.log("beweging");
    GrootteP1 = left.getBoundingClientRect();
    GrootteP2 = right.getBoundingClientRect();
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);