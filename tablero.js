
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
let currentGame
const mimica_div = document.getElementById("mimica_");
let movie //this is the selected random movie
let numPlayers
let playerTurn=0

mimica_div.style.display = "none"



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
    currentGame=juego
    while(juego==lastGame){
        juego=getRandomFromList(juegos);
        console.log('salió repetido! buscando otro....');
        currentGame=juego
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

    mimica_div.style.display = "none"

    switch(juego) {
        case 'Mímica':
          mimica();
          break;
        case 'Trivia':
          // code block
          break;
        default:
          // code block
      }
        
    return juego;

}


function getRandomFromList(list){
    var listlen=list.length;
    var random = Math.floor((Math.random()*list.length));
    console.log('listlen is %s, random number was  %s',listlen,random )
    return list[random];
}

function  mimica(){

    if(currentGame=='Mímica'){
        
        if (mimica_div.style.display === "none") {
            mimica_div.style.display = "block";
        }    
    }
    movie=getRandomFromList(movies)
   
    
    
}

document.body.addEventListener('keydown', function(e) {
   console.log('key pressed, ',currentGame)
    if(currentGame=='Mímica'){
      if(e.keyCode==77){
        console.log('pressed "m" when mimica is visible')
        document.getElementById('movie').innerHTML = movie   
    }
    }
});
document.body.addEventListener('keyup', function(e) {
    console.log('key pressed, ',currentGame)
     if(currentGame=='Mímica'){
       if(e.keyCode==77){
         console.log('pressed "m" when mimica is visible')
         document.getElementById('movie').innerHTML = ''  
     }
     }
 });

;

//--- Lista de Juegos y Pelis

const juegos = [
    'Trivia',
    'Mímica',
    'Palabras Prohibidas'
];


const movies = [
    'Perros de la Calle',
    'Indiana Jones',
    'Transformers',
    'La Delgada Línea Roja',
    'Guerra de las Galaxias',
    'Inception ',
    'Split',
    'Titanic.',
'The Shawshank Redemption.',
'Forrest Gump.',
'American Beauty.',
'Goodfellas.',
'Taxi Driver',
'Salvando al Soldado Ryan',
'El Padrino',
'El Pianista',
'Die Hard',
'The Transporter',
'The Dark Knight',
'The Bourne Identity',
'James Bond: Casino Royale',
'Suicide Squad',
'Hancock',
'The Terminator',
'Predator',
'Taken',
'Mission Impossible',
'Indiana Jones: Raiders of the Lost Ark',
'Gladiator',
'Tomb Raider',
'Lethal Weapon',
'Anchorman',
'Superbad',
'The Other Guys',
'Step Brothers',
'Liar Liar',
'Knocked Up',
'Zoolander',
'Tropic Thunder',
'Dodgeball',
'Old School',
'The 40-Year Old Virgin',
'Ghostbusters',
'The Big Lebowski',
'Dumb and Dumber',
'Meet the Fockers',
'There’s Something About Mary',
'Wedding Crashers',
'About Time',
'10 Things I Hate About You',
'Pretty Woman',
'50 First Dates',
'Love Actually',
'Notting Hill',
'Bridget Jones’s Diary',
'The Notebook',
'When Harry Met Sally',
'Clueless',
'Bridesmaids',
'You’ve Got Mail',
'Forgetting Sarah Marshall',
'The Shining',
'Paranormal Activity',
'Scream',
'The Conjuring',
'The Cabin in the Woods',
'The Exorcist',
'The Human Centipede',
'The Blair Witch Project',
'Jaws',
'Dawn of the Dead',
'Halloween',
'Ring',
'28 Days Later',
'The Texas Chain Saw Massacre',
'The Silence of the Lambs',
'Inception',
'The Departed',
'Heat',
'The Dark Knight Rises',
'Léon: The Professional',
'The Bourne Ultimatum',
'Black Swan',
'No Country for Old Men',
'Run Lola Run',
'Se7en',
'Sin City',
'The Silence of the Lambs',
'Minority Report',
'The Game',
'Shutter Island',
'The Fugitive',
'The Others',
'Kill Bill: Vol. 2',
'Ghost Dog: The Way of the Samurai',
'Mulholland Dr.',
'Insomnia',
'Chinatown',
'21 Grams',
'Mystic River',
'The Prestige',
'The Usual Suspects',
'Prisoners',
'Collateral',
'Jaws',
'Oldboy',
'The Sixth Sense',
'Apocalypto',
'V for Vendetta',
'Twelve Monkeys',
'127 Hours',
'Eyes Wide Shut',
'Straw Dogs',
'Munich',
'Die Hard',
'A Christmas Story',
'Scrooge',
'Rudolph, the Red-Nosed Reindeer',
'Christmas Vacation',
'Miracle on 34th Street',
'Edward Scissorhands',
'Home Alone',
'Bad Santa',
'Trading Places',
'Scrooged',
'',

];