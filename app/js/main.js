const screens = document.querySelectorAll('.screen');
const gameContainer = document.getElementById('game-container');

const playBtn = document.getElementById('play-btn');
const quitBtn = document.getElementById('quit-btn');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const chooseAnimalBtns = document.querySelectorAll('.choose-animal-btn');

const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const quitMessage = document.getElementById('quit-message');
const finishMessage = document.getElementById('finish-message');

let seconds = 60;
let score = 0;
let selectedAnimal = {};
let timeIntervalId;
let addTimeoutId;
let timeoutId2;

// QUIT BUTTON PRESS

quitBtn.addEventListener('click', () => {
    screens[0].classList.add('quit');
    playBtn.classList.add('invisible');
    quitBtn.classList.add('invisible');
    quitMessage.classList.add('visible');
});

// PLAY / CHOOSE ANIMAL / START PLAYING 

playBtn.addEventListener('click', () => screens[0].classList.add('up'));

chooseAnimalBtns.forEach(btn => {
    btn.addEventListener('click', () =>{
        const img = btn.querySelector('img');
        const src = img.src;
        const alt = img.alt;
        selectedAnimal = {src, alt};
        screens[1].classList.add('up');
    });
});

startBtn.addEventListener('click', () => {
    screens[2].classList.add('up');
    setTimeout(createAnimal, 1000);
    startGame();
    addMoreAnimals();
});

// STARTING THE TIMER

function startGame(){
timeIntervalId = setInterval(decreaseTime, 1000);
}

function decreaseTime(){
    let m = Math.floor(seconds/60);
    let s = seconds % 60;
    m = m< 10 ? `0${m}` : m;
    s = s< 10 ? `0${s}` : s;
    timeEl.innerHTML = `Время: ${m}:${s}`;
    seconds--;
    if( m == 0 && s == 0){
        stopGame();
    }
}

// CREATING ANIMAL

function createAnimal(){
    const animal = document.createElement('div');
    animal.classList.add('animal');
    const {x,y} = getRandomLocation();
    animal.style.top = `${y}px`;
    animal.style.left = `${x}px`;
    animal.innerHTML = `<img src="${selectedAnimal.src}" alt="${selectedAnimal.alt}" style="transform: rotate(${Math.random()*360}deg)"/>`;
    animal.addEventListener('click', catchAnimal);
    gameContainer.appendChild(animal);
    setTimeout(() => animal.classList.add('uncaught'), 2000);
    setTimeout(() => animal.remove(), 2500);
}

function addMoreAnimals(){
    addTimeoutId = setTimeout(createAnimal, 2000);
    addTimeoutId = setTimeout(createAnimal, 3000);
}

function getRandomLocation(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) +100;
    const y = Math.random() * (height - 200) + 100;
    return {x,y};
}

// CATCHING ANIMAL

function catchAnimal(){
    increaseScore();
    this.classList.add('caught');
    setTimeout( () => this.remove(), 1000);
    addMoreAnimals();
}

function increaseScore(){
    score++;
    scoreEl.innerHTML = `Счет: ${score}`
}


// RESET GAME BUTTON PRESS

resetBtn.addEventListener('click', () => {
    resetTime();
    resetScore();
    removeAnimals();
    finishMessage.classList.remove('visible');
   screens[2].classList.remove('up'); 
   screens[1].classList.remove('up'); 
   screens[0].classList.remove('up'); 
});

function stopGame(){
    clearInterval(timeIntervalId);
    clearTimeout(addTimeoutId);
    finishMessage.textContent = `Неплохо! Ты поймал ${score} животных!`;
    finishMessage.classList.add('visible');
}

function resetTime(){
    timeEl.innerHTML = `Время: 01:00`;
    seconds = 60;
}

function resetScore(){
    score = 0;
    scoreEl.innerHTML = `Счет: 0`;
}

function removeAnimals(){
    const children = Array.from(gameContainer.children);
    
    children.forEach( el => {
        if(el.classList.contains('animal')){
            el.remove();
        } else{
            return;
        }
    });
}
