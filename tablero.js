
window.addEventListener('load', init);


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

//SETUP PAGE -- 
// --Add Players
let player_list=[];

function addLi(){
    var txtVal = document.getElementById('txtVal').value,
        listNode = document.getElementById('list'),
        liNode = document.createElement("LI"),
        txtNode = document.createTextNode(txtVal);
        
    liNode.appendChild(txtNode);
    listNode.appendChild(liNode);
    player_list.push(txtVal);

}
// --Start Game 
function startGame(){

    player1=player_list[0]
    window.location.href = "index.html";



}


//GAME PAGE -- 
//Initialize Game
function init() {
    console.log('init');
    //player1= new Player('Fran',0,0)
    console.log('a new player was created: %s' ,  player1.name);

    player.innerHTML=player1.name
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
    juego=getRandomFromList(juegos)
    console.log('the game  is %s, last game was  %s' ,  juego,lastGame);
    while(juego==lastGame){
        juego=getRandomFromList(juegos);
        console.log('salió repetido! buscando otro....');
    }
   
   
   
    gameDisplay.innerHTML=juego
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

