let x, y, score = 0;
let maxScore = -1;
let time = 60; // in seconds
let mole = null;
let timeCont = null;
let scoreCont = null;
let timeIntId = null;
const playfield = document.getElementById("play_field");
const playfield_p = window.getComputedStyle(document.getElementById("play_field"), null)
const mole_wh = 120;
const mole_hg = 93;
const header_p = window.getComputedStyle(document.getElementById("header"), null)
const header = document.getElementById("header");
let mole_action_time_id=null;
let mole_action_time = 3; // in seconds
let mole_action_time_inc = 10; // in seconds

const createTimeContainer = () => {
    const div = document.createElement("div");
    div.style.margin= "auto";
    div.style.textAlign = "center";
    div.style.padding = "15px";
    div.style.display ="inline-block" ;
    div.style.width ="100%"; 
    header.appendChild(div);
    timeCont = div
    displayTime();
}

const createScrContainer = () => {
    const div = document.createElement("div");
    div.style.margin= "auto";
    div.style.padding = "15px";
    div.style.textAlign = "center";
    div.style.display ="inline-block" ; 
    div.style.width ="100%";
    header.appendChild(div);
    scoreCont = div
    console.log("elo")
    maxScore+=1;
    displayScore();
}

const stopMoleRotation = () => {
    if (mole_action_time === null) return;
    clearInterval(mole_action_time_id);
}

const startMoleRotation = () => {
    stopMoleRotation()
    mole_action_time_id = setInterval(createMole, mole_action_time*1000)

}
const displayScore = () => {
    scoreCont.innerText = score + " points ";
    scoreCont.innerText += " out of " + maxScore;
}

const displayTime = () => {
    timeCont.innerHTML = time + " seconds left";
}

const pushTheTempo = () => {
    if (time % mole_action_time_inc !== 0) return
    if (mole_action_time > 1){
        mole_action_time /=2;
    }
    else
        mole_action_time = 0.7;
        return;

}
const timeTicker =  () => {
    time = time - 1;
    displayTime();
    pushTheTempo();
    if (time === 0) endGame()
}


const addScore = () => {
    score = score + 10;
    mole.style.backgroundImage = "url('krecik_po.png')";
    displayScore();
}

const posRandomizer = (min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}

const randomizeMolePos = () => {
    const top_margin = parseInt(header_p.getPropertyValue("height") + 5);
    const visual_hg = parseInt(playfield_p.getPropertyValue("height"))-mole_hg;
    const visual_wh = parseInt(playfield_p.getPropertyValue("width"))-mole_wh;
    x = posRandomizer(30,visual_wh);
    y = posRandomizer(top_margin,visual_hg);
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
    div.style.backgroundImage = "url('krecik.png')";
    div.style.backgroundClip = "content-box";
    div.style.position = "fixed";
    div.style.left = x + "px";
    div.style.top =  y + "px" ; 
    div.addEventListener('click',moleClicker);
    playfield.appendChild(div);
    mole = div;
    addMaxScore();
}
const addMaxScore = () => {
    maxScore +=10;
    displayScore();
}

const createMole = () => {
        randomizeMolePos();
        moleMaker();
        startMoleRotation();
       
}
const moleClicker = () => {
        addScore();
        setTimeout(createMole,500)
       
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
