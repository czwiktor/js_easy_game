let x, y, score = 0;
let time = 60; // in seconds
let mole = null;
let timeCont = null;
let scoreCont = null;
let timeIntId = null;
const mole_wh = 60;
const mole_hg = 85;


let mole_action_time = 2; // in seconds

const createTimeContainer = () => {
    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.right = 0 + "px";
    div.style.top = 0 + "px" ; 
    document.body.appendChild(div);
    timeCont = div
    displayTime();
}

const createScrContainer = () => {
    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.left = 0 + "px";
    div.style.top = 0 + "px" ; 
    document.body.appendChild(div);
    scoreCont = div
    console.log("elo")
    displayScore();
}


const displayScore = () => {
    scoreCont.innerText = score + " points";
}

const displayTime = () => {
    timeCont.innerHTML = time + " seconds left";
}


const timeTicker =  () => {
    time = time - 1;
    displayTime();
    if (time === 0) endGame()
}


const addScore = () => {
    score = score + 10;
    displayScore();
}

const posRandomizer = (min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}

const randomizeMolePos = () => {
    const visual_hg = window.innerHeight-mole_hg;
    const visual_wh = window.innerWidth-mole_wh;
    x = posRandomizer(0,visual_wh);
    y = posRandomizer(0,visual_hg);
}

const moleRemover = () => {
    if(mole===null) return
  
    mole.remove();
}

const moleMaker = () => {
    moleRemover();
    const div = document.createElement("div");
    div.style.width = mole_wh + "px";
    div.style.height = mole_hg + "px";
    div.style.backgroundColor = "black";
    div.style.position = "fixed";
    div.style.left = x + "px";
    div.style.top = y + "px" ; 
    div.addEventListener('click',moleClicker);
    document.body.appendChild(div);
    mole = div;
}

const createMole = () => {
        randomizeMolePos();
        moleMaker();
}
const moleClicker = () => {
        addScore();
        createMole();
}

const resetGame =  () => {
    window.location = '';
}


const startInterval = () => {
    timeIntId = setInterval(
        timeTicker,
        1000
    )
}

const endGame = () => {
    resetGame();
    alert("Game ended! Your score: " + score)
    
}

const init = () => {
     createScrContainer();
     createTimeContainer();
     createMole();
     startInterval();
};

init();
