
window.addEventListener('load', init);


let score ;

let gameDisplay = document.querySelector('#gameDisplay');
let message = document.querySelector('#message')
let lastGame

const juegos = [
    'todos toman',
    'toma doble',
    'Mímica',
    'Taritá'
];


const movies = [
    'Perros de la Calle',
    'Indiana Jones',
    'Transformers',
    'La Delgada Línea Roja',
    'Guerra de las Galaxias',
    'Inception ',
    'Split'
];


//Initialize Game
function init() {
    console.log('init');
    isPlaying = false;
   // gameDisplay=getGame()
    

    //load word from array
    //start matching on word input 
   // wordInput.addEventListener('keyup', startWord);
   // wordInput.addEventListener('keyup', checkKeyPressed, false);

    // call countdown every second
    //setInterval(countdown, 1000); //Timer
    //check game status
    //setInterval(checkStatus, 50);
}


function getGame(){
    var listlen=juegos.length;
    var random = Math.floor((Math.random()*juegos.length));
    peli=juegos[random];
    console.log('the game  is %s' ,  listlen);
    gameDisplay.innerHTML=peli
    //make function to prevent repeating random
    lastGame=peli

    return peli;

}