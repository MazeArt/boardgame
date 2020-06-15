
let score ;

let gameDisplay = document.querySelector('#gameDisplay');
let player = document.querySelector('#player');
let message = document.querySelector('#message')
let lastGame
let Player =function(name,turn,points){
    this.name=name;
    this.turn=turn;
    this.points=points;

}

let numPlayers
let playerTurn=0





//SETUP PAGE -- 
// --Add Players

   // init();

   // setTimeout(init(), 5000 ) 
//window.addEventListener('load', init)




//GAME PAGE -- 
//Initialize Game
function init() {
    console.log('init');
    turn=0
    console.log('a new player was created: %s' ,  'tipo');

   // player.innerHTML=gamePlayers[turn].name //change turn here
    isPlaying = false;

}

function getGame(){
    juego=getRandomFromList(juegos)
    console.log('the game  is %s, last game was  %s' ,  juego,lastGame);
    while(juego==lastGame){
        juego=getRandomFromList(juegos);
        console.log('salió repetido! buscando otro....');
    }
    console.log('its player %s turn' , playerTurn);
    //players in the Session
    numPlayers = sessionStorage.getItem("numPlayers");
    //show player name in index
    player.innerHTML = sessionStorage.getItem("player"+playerTurn);
    
    //logic to decide next player turn (cycles through numPlayers)
    if(playerTurn<(numPlayers-1)){
        playerTurn++;
    } else {
        playerTurn=0;
    }
    
  
   
    gameDisplay.innerHTML=juego;
    //make function to prevent repeating random
    lastGame=juego

    return juego;

}


function getRandomFromList(list){
    var listlen=list.length;
    var random = Math.floor((Math.random()*list.length));
    console.log('listlen is %s, random number was  %s',listlen,random )
    return list[random];

}

//--- Lista de Juegos y Pelis

const juegos = [
    'todos toman',
    'toma doble',
    'Mímica',
    'Jugador Toma',
    'Regala 1',
    'Regla 2',
    'Penitencia',
    'Casa Tira Mata',
    'Nunca Nunca',
    'Tarita',
    'Cultura Chupistica',
    'Shot',
    'Ha Llegado Carta',
    'Escaleras',
    'Stripper',
    'Verdad o Reto',
    'Pregunta Indiscreta',
    'Adivina ',
    'El Dedo',
    'Chancho Inflado',
    'Historia',
    'Palabras',
    '1vs1',
    'Cachipun al seco'

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