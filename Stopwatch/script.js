let myInterval;
let i = 0;
let s = 0;
let m = 0;
let u = 0;

function start() {
    document.getElementById("start").disabled = true;
    myInterval = setInterval(milisec, 10); // elke 10 miliseconden telt 1 milliseconde
}

function milisec() {
    document.getElementById("milisec").innerHTML = i;
    i++;

    if (i > 99)
    {
        s++;
        document.getElementById("sec").innerHTML = s.toString().padStart(2, '0');
        i = 0;
    }
    if (s > 59)
    {
        m++;
        document.getElementById("min").innerHTML = m.toString().padStart(2, '0');
        s = 0;
    }
    if (m > 59)
    {
        u++;
        document.getElementById("uur").innerHTML = u.toString().padStart(2, '0');
        m = 0;
    }
}


function pause() {
    document.getElementById("start").disabled = false;
    clearInterval(myInterval);
}

function clear() {
    document.getElementById("start").disabled = false;
    clearInterval(myInterval);
    
    i = 0;
    s = 0;
    m = 0;
    u = 0;

    document.getElementById("milisec").innerHTML = "00";
    document.getElementById("sec").innerHTML = "00";
    document.getElementById("min").innerHTML = "00";
    document.getElementById("uur").innerHTML = "00";
}