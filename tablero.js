
let score;

let gameDisplay = document.querySelector('#gameDisplay');
let player = document.querySelector('#player');
let message = document.querySelector('#message');
let culturaLetter=document.querySelector('#cultura_chupi_q_letra');
let lastGame
let Player = function (name, turn, points) {
    this.name = name;
    this.turn = turn;
    this.points = points;

}
let currentGame
const mimica_div = document.getElementById("mimica_");
const twotruths_div = document.getElementById("twoTruths_");
const palabras_div = document.getElementById("palabras_");
const quiensoy_div = document.getElementById("quiensoy_");
const trivia_div = document.getElementById("trivia_");
const historia_div = document.getElementById("historia_");
const randomPlayerTurn_div = document.getElementById("randomPlayerTurn_");
const cultura_div = document.getElementById("cultura_");



const numPlayers = sessionStorage.getItem("numPlayers");
let playerTurn = 0
//check and redocrd rolled games to avoid repetition
let lastgames = []
lastRolledGames = []
let PrevRolledGame_check = false

let timer
let roulleteTime = 200 //default 300, 100 for speed debug

let movie //this is the selected random movie
let personaje
let thisQuestion //this is the trivia question object

let playerList = []

function checkPlayerlist() {
    for (var i = 0; i < numPlayers; i++) {
        playerList[i] = sessionStorage.getItem("player" + i)

    }

}



//hides all game divs
function hide_divs() {
    mimica_div.style.display = "none"
    palabras_div.style.display = "none"
    twotruths_div.style.display = "none"
    trivia_div.style.display = "none"
    quiensoy_div.style.display = "none"
    historia_div.style.display = "none"
    randomPlayerTurn_div.style.display = "none"
    cultura_div.style.display = "none"
    //resets countdown to show Comenzar always
    document.getElementById("countdown").innerHTML = "Comenzar";


}



hide_divs()
checkPlayerlist()

//SETUP PAGE -- 
// --Add Players

// init();

// setTimeout(init(), 5000 ) 
//window.addEventListener('load', init)




//GAME PAGE -- 
//Initialize Game
function init() {
    console.log('init');
    turn = 0
    console.log('a new player was created: %s', 'tipo');


    // player.innerHTML=gamePlayers[turn].name //change turn here
    isPlaying = false;

}

function rollDice() {
    getPlayerTurn();
    wheelEffect();
}


function getPlayerTurn() {
    console.log('its player %s turn', playerTurn);
    //players in the Session
    //numPlayers = sessionStorage.getItem("numPlayers");
    console.log("players::", sessionStorage.getItem("numPlayers"))
    //show player name in index
    console.log("player::", sessionStorage.getItem("player" + playerTurn))
    //logic to decide next player turn (cycles through numPlayers)
    if (playerTurn < (numPlayers - 1)) {
        playerTurn++;
    } else {
        playerTurn = 0;
    }
    player.innerHTML = sessionStorage.getItem("player" + playerTurn);

}

function getGame() {

    juego = getRandomFromList(juegos)
    //check if juego was rolled recently
    PrevRolledGame_check = lastRolledGames.includes(juego)
    console.log('the game  is %s, last game was  %s', juego, lastRolledGames);
    currentGame = juego
    //if it has been prev rolled (true) , roll another game 
    while (PrevRolledGame_check == true) {
        juego = getRandomFromList(juegos);
        console.log('salió repetido! buscando otro....');
        PrevRolledGame_check = lastRolledGames.includes(juego)
        currentGame = juego
    }

    gameDisplay.innerHTML = juego;
    //make function to prevent repeating random
    lastgames.push(juego);
    //ensures that the games do not repeat
    lastRolledGames = lastgames.slice(Math.max(lastgames.length - 5, 0))
    PrevRolledGame_check = lastRolledGames.includes(juego)

    hide_divs();

    switch (juego) {
        case 'Mímica':
            mimica();
            break;

        case 'Quien soy?':
            quiensoy();
            break;

        case 'Palabras Concatenadas':
            palabrasConc();
            break;

        case 'Trivia':
            trivia();
            // code block
            break;

        case 'Dos Verdades y una Mentira':
            // code block
            twotruths();
            break;

        case 'Historia...':
            historia()

            break;

        case 'Cultura Chupistica':
            cultura()

            break;

        default:
        // code block
    }

    return juego;

}
/// :::::::::::::::::  GAME MODULES :::::::::::::::::::::::::::::::::::
function getRandomFromList(list) {
    var listlen = list.length;
    var random = Math.floor((Math.random() * list.length));
    console.log('listlen is %s, random number was  %s', listlen, random)
    return list[random];
}

function mimica() {

    if (currentGame == 'Mímica') {

        if (mimica_div.style.display === "none") {
            mimica_div.style.display = "block";
        }
    }
    movie = getRandomFromList(movies)
}

function quiensoy() {

    if (currentGame == 'Quien soy?') {

        if (quiensoy_div.style.display === "none") {
            quiensoy_div.style.display = "block";
        }
    }
    personaje = getRandomFromList(personajes)
}


let array1 = [0, 1, 2, 3]

function trivia() {

    if (currentGame == 'Trivia') {

        if (trivia_div.style.display === "none") {
            trivia_div.style.display = "block";
        }
    }

    //var random = Math.floor((Math.random()*trivia_questions.length));
    random = Math.floor(Math.random() * (trivia_questions.length));
    thisQuestion = trivia_questions.find(o => o.q_num === random);

    console.log(thisQuestion);
    console.log(random);

    //shuffle answers positions
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        console.log("run new shuffle")
        return array
    }

    ansShuffle = shuffleArray(array1)

    document.getElementById('pregunta').innerHTML = thisQuestion.q
    document.getElementById('triv_opt1').innerHTML = thisQuestion["a" + ansShuffle[0]]
    document.getElementById('triv_opt2').innerHTML = thisQuestion["a" + ansShuffle[1]]
    document.getElementById('triv_opt3').innerHTML = thisQuestion["a" + ansShuffle[2]]
    document.getElementById('triv_opt4').innerHTML = thisQuestion["a" + ansShuffle[3]]
}

function twotruths() {

    if (currentGame == 'Dos Verdades y una Mentira') {

        if (twotruths_div.style.display === "none") {
            twotruths_div.style.display = "block";
        }
    }
    //personaje=getRandomFromList(personajes)     
}

//se podría fusionar palabarasConc e Historia en solo desplegar el randomPlayer y timer
function palabrasConc() {

    if (currentGame == 'Palabras Concatenadas') {

        if (palabras_div.style.display === "none") {
            palabras_div.style.display = "block";
            randomPlayerTurn_div.style.display = "block";
        }
    }
    ///TODO make a random_playDeduper
 //   randomPlayer = getRandomFromList(playerList);
  //  lastPlayers
   // document.getElementById('random_player').innerHTML = randomPlayer
  
   //aseguramos que el primer random_player sea el player que le tocó el main_game
   document.getElementById('random_player').innerHTML=sessionStorage.getItem("player" + playerTurn)
}

function historia() {

    if (currentGame == 'Historia...') {

        if (historia_div.style.display === "none") {
            historia_div.style.display = "block";
            randomPlayerTurn_div.style.display = "block";
        }
    }
  

   //aseguramos que el primer random_player sea el player que le tocó el main_game 
    document.getElementById('random_player').innerHTML=sessionStorage.getItem("player" + playerTurn)

}

function cultura() {

    if (currentGame == 'Cultura Chupistica') {

        if (cultura_div.style.display === "none") {
            cultura_div.style.display = "block";
            randomPlayerTurn_div.style.display = "block";
        }
    }
    //agregar función genérica para evitar dos veces seguidos
    // randomWODup() ?
    var random = Math.floor(Math.random() * cultura_chupistica.length)
    randomPlayer = getRandomFromList(playerList)
    document.getElementById('random_player').innerHTML = randomPlayer
    document.getElementById('cultura_chupi_q').innerHTML = cultura_chupistica[random]
    function lastword(string) {
        var n = string.split(" ");
        return n[n.length - 1];

    }
    letras = [" A", " B", " C", " D", " E"," F", " G", "H", " I", " J", " K", " L"];
    lastWordy = lastword(cultura_chupistica[random])
    console.log(lastWordy)
    if (lastWordy == 'letra') {
        random = Math.floor(Math.random() * letras.length)
        //wheelEffect_items pasa la lista y el objeto innerHTML a modificar
        wheelEffect_Items(letras, culturaLetter)

    }
    document.getElementById('random_player').innerHTML=sessionStorage.getItem("player" + playerTurn)

}

function nextPlayerSelector(){

    switch (currentGame) {

        case 'Palabras Concatenadas':
            nextPlayerTimer(3,"Perdió!!");
            break;

        case 'Historia...':
            nextPlayerTimer(15," perdió?");
            console.log("parsearon 15 seg")

            break;

        case 'Cultura Chupistica':
            randomPlayer = getRandomFromList(playerList)
            document.getElementById('random_player').innerHTML = randomPlayer
            document.getElementById("countdown").innerHTML = "Recuerden que no se puede repetir!";
            break;

        default:
        // code block
    }


}

let dTimer
function nextPlayerTimer(timer,endMessage) {

   

    randomPlayer = getRandomFromList(playerList)
    document.getElementById('random_player').innerHTML = randomPlayer

    clearInterval(dTimer);
    var timeleft = timer;
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";

    dTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(dTimer);
            document.getElementById("countdown").innerHTML = endMessage;
        } else {
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
    }, 1000);
    //palabrasConc();

    //clearInterval(dTimer);
}


//roullette
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function wheelEffect() {
    currentGame = '';
    hide_divs() //hide divs duh
    var t = 20;
    var interval = Math.random() * (-1 + Math.round(Math.random()))
    var duration = roulleteTime + interval * (100) //300 
    var lastItem
    console.log('this is t: ', t);
    while (t < duration) {
        await sleep(t)

        //   console.log('this is t: ',t,duration)
        t = t + 20
        juego = getRandomFromList(juegos)
        while (juego == lastItem) {
            juego = getRandomFromList(juegos)
        }
        lastItem = juego
        //debugging
        //  juego='Quien soy?'
        gameDisplay.innerHTML = juego;
        ;
    }
    getGame();
}

async function wheelEffect_Items(list,papa) {
  
    var t = 20;
    var interval = Math.random() * (-1 + Math.round(Math.random()))
    var duration = 350 + interval * (100) //300 
    var lastItem
    console.log('this is t: ', t);
    while (t < duration) {
        await sleep(t)

        //   console.log('this is t: ',t,duration)
        t = t + 20
        item = getRandomFromList(list)
        while (item == lastItem) {
            item = getRandomFromList(list)
        }
        lastItem = item
        //debugging
        //  juego='Quien soy?'
        papa.innerHTML = item;
        
    }
   
}

//KEY Press listen
document.body.addEventListener('keydown', function (e) {
    console.log('key pressed, ', currentGame)
    if (e.keyCode == 77) {
        if (currentGame == 'Mímica') {
            console.log('pressed "m" when mimica is visible')
            document.getElementById('movie').innerHTML = movie
        }
        if (currentGame == 'Quien soy?') {
            console.log('pressed "m" when quien soy is visible')
            document.getElementById('personaje').innerHTML = personaje
        }
        if (currentGame == 'Trivia') {
            console.log('pressed "m" when quien soy is visible')
            document.getElementById('respuesta').innerHTML = thisQuestion.a0
        }

    }
});
document.body.addEventListener('keyup', function (e) {
    console.log('key pressed, ', currentGame)
    if (e.keyCode == 77) {
        if (currentGame == 'Mímica') {
            console.log('pressed "m" when mimica is visible')
            document.getElementById('movie').innerHTML = ''
        }
        if (currentGame == 'Quien soy?') {
            console.log('pressed "m" when quien soy is visible')
            document.getElementById('personaje').innerHTML = ''
        }
        if (currentGame == 'Trivia') {
            console.log('pressed "m" when quien soy is visible')
            document.getElementById('respuesta').innerHTML = ''
        }
    }
});

;

//--- Lista de Juegos y Pelis

const juegos = [
    'Trivia',
    'Mímica',
    'Palabras Concatenadas',
    'Dos Verdades y una Mentira',
    'Quien soy?',
    'Historia...',
    'Cultura Chupistica'
];


const movies = ['Perros de la Calle',
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
    'Scrooged'
];

const personajes = ['Zheng He',
    'Yuri Gagarin',
    'Yoda',
    'Yasser Arafat',
    'Xenomorph',
    'Woody Woodpecker',
    'Woody (Toy Story)',
    'Woodrow Wilson',
    'Wolverine',
    'Wolfgang Amadeus Mozart',
    'Wizard of Oz',
    'Winston Churchill',
    'Winnie the Pooh',
    'William Wallace - Braveheart',
    'William Shakespeare',
    'Wilhelm Conrad RÃ¶ntgen',
    'Whitney Houston',
    'Wednesday Addams',
    'Walt Disney',
    'Wallace and Gromit',
    'Voltaire',
    'Voldemort',
    'Vladimir Putin',
    'Vladimir Lenin',
    'Vito Corleone (The Godfather)',
    'Virgil',
    'Vincent Vega- Pulp Fiction',
    'Vincent van Gogh',
    'Victor Hugo',
    'Vasco da Gama',
    'Valery Leontyev',
    'Umar',
    'Tyler Durden',
    'Travis Bickle',
    'Toshiro Mifune',
    'Tony Montana',
    'Tinker Bell',
    'Timur',
    'Tim Berners-Lee',
    'Thomas Jefferson',
    'Thomas Edison',
    'Thomas Aquinas',
    'Theodore Roosevelt',
    'The Terminator',
    'The Simpsons',
    'The Muppets',
    'The Munchkins',
    'The Mask',
    'The Joker',
    'Taylor Lautner',
    'Superman',
    'Steven Spielberg',
    'Steve Jobs',
    'Spock',
    'Spiderman',
    'Sophocles',
    'Socrates',
    'Snow White',
    'Snow White',
    'Snoopy',
    'Sloth (The Goonies)',
    'SimÃ³n BolÃ­var',
    'Silvio Berlusconi',
    'Sigmund Freud',
    'Shrek',
    'Shakira',
    'Selena Gomez',
    'Selena',
    'Scarlett Johansson',
    'Sarah Bernhardt',
    'Salvador DalÃ­',
    'Saladin',
    'Saint Peter',
    'Saddam Hussein',
    'Rugrats',
    'Rosa Luxemburg',
    'Ronald Reagan',
    'Roger Federer',
    'Roald Amundsen',
    'Richard Wagner',
    'Richard Nixon',
    'RenÃ© Descartes',
    'Rembrandt',
    'Raphael',
    'Rambo',
    'Rafael Correa',
    'Rabindranath Tagore',
    'Queen Victoria',
    'Qin Shi Huang',
    'Pythagoras',
    'Pyotr Ilyich Tchaikovsky',
    'Predator',
    'Pope John Paul II',
    'Pope Benedict XVI',
    'Plato',
    'Peter Paul Rubens',
    'Peter I of Russia',
    'Paul of Tarsus',
    'Pablo Picasso',
    'Pablo Neruda',
    'Otto von Bismarck',
    'Oscar Wilde',
    'Osama bin Laden',
    'Optimus Prime',
    'Octave Mirbeau',
    'Obi-Wan Kenobi',
    'Novak Djokovic',
    'Noam Chomsky',
    'Nikola Tesla',
    'Niels Henrik David Bohr',
    'Nicolaus Copernicus',
    'Nicolas Sarkozy',
    'NiccolÃ² Machiavelli',
    'Neo',
    'Nemo',
    'Nelson Mandela',
    'Neil Armstrong',
    'Nathalia Dill',
    'Napoleon Bonaparte',
    'Mustafa Kemal AtatÃ¼rk',
    'Muhammad ibn Musa al-Khwarizmi',
    'Muhammad',
    'Mufasa, the Lion King',
    'Muammar al-Gaddafi',
    'Mother Teresa',
    'Moses',
    'MoliÃ¨re',
    'Minnie Mouse',
    'Minions',
    'Mikhail Gorbachev',
    'Miguel de Cervantes',
    'Mickey Mouse',
    'Michelangelo',
    'Michael Schumacher',
    'Michael Jackson',
    'Michael Faraday',
    'Michael Corleone',
    'Maximus',
    'Max Planck',
    'Mary',
    'Martin Van Buren',
    'Martin Luther King, Jr.',
    'Martin Luther',
    'Marlon Brando',
    'Marlene Dietrich',
    'Mark Twain',
    'Marilyn Monroe',
    'Marie Curie',
    'Margaret Thatcher',
    'Marco Polo',
    'Marcel Proust',
    'Mao Zedong',
    'Mahmoud Ahmadinejad',
    'Mahatma Gandhi',
    'Madonna',
    'Mad Max',
    'Lyndon B. Johnson',
    'Ludwig van Beethoven',
    'Lu Xun',
    'Louis Pasteur',
    'Louis Armstrong',
    'Lionel Messi',
    'Linus Torvalds',
    'Lila Downs',
    'Li Bai',
    'Leonhard Euler',
    'Leonardo da Vinci',
    'Leon Trotsky',
    'Leo Tolstoy',
    'Lee',
    'Lech WaÅÄsa',
    'Leatherface',
    'Le Corbusier',
    'Laozi',
    'Lady Gaga',
    'Kofi Annan',
    'Kim Jong-il',
    'Kevin McCallister',
    'Kermit the Frog',
    'Katniss Everdeen',
    'Karl Marx',
    'Justin Bieber',
    'Julius Caesar',
    'Jules Verne',
    'Josh Duhamel',
    'Joseph Stalin',
    'Jorge Luis Borges',
    'John Tyler',
    'John Quincy Adams',
    'John McClane',
    'John Maynard Keynes',
    'John Locke',
    'John Lennon',
    'John F. Kennedy',
    'John Adams',
    'Johannes Kepler',
    'Johannes Gutenberg',
    'Johannes Brahms',
    'Johann Wolfgang von Goethe',
    'Johann Sebastian Bach',
    'Jimmy Wales',
    'Jimmy Carter',
    'Jigsaw',
    'Jesus Christ',
    'Jeremy Renner',
    'Jeanne d Arc',
    'Jean-Paul Sartre',
    'Jean-Jacques Rousseau',
    'Jean Auguste Dominique Ingres',
    'Jaws',
    'Jawaharlal Nehru',
    'Jason Bourne',
    'James Watt',
    'James Monroe',
    'James Madison',
    'James Joyce',
    'James Cook',
    'James Clerk Maxwell',
    'James Buchanan',
    'James Bond',
    'Jacques Chirac',
    'Jacques Cartier',
    'J. R. R. Tolkien',
    'J. K. Rowling',
    'Isaac Newton',
    'Iron Man',
    'Ingmar Bergman',
    'Indira Gandhi',
    'Indiana Jones',
    'Immanuel Kant',
    'Hugo ChÃ¡vez',
    'Huang Xian Fan',
    'Hosni Mubarak',
    'Homer',
    'Hokusai',
    'Hirohito',
    'Hippocrates',
    'Hillary Rodham Clinton',
    'Herodotus',
    'HernÃ¡n CortÃ©s',
    'Henry Ford',
    'Henri Matisse',
    'Hebe Camargo',
    'Harry S. Truman',
    'Harry Potter',
    'Hans Christian Andersen',
    'Hannibal Lecter',
    'Han Solo',
    'Hal 9000',
    'Gwyneth Paltrow',
    'Gottfried Wilhelm von Leibniz',
    'Gollum',
    'Godzilla',
    'Giuseppe Verdi',
    'Ghostface',
    'Gerald Ford',
    'George Washington',
    'George Orwell',
    'George H. W. Bush',
    'George Gordon Noel Byron, 6th Baron Byron',
    'George Frideric Handel',
    'George Bush',
    'George Bernard Shaw',
    'Georg Wilhelm Friedrich Hegel',
    'Geoffrey Chaucer',
    'Genghis Khan',
    'Gautama Buddha',
    'Gandalf',
    'Galileo Galilei',
    'Gabriel GarcÃ­a MÃ¡rquez',
    'Fyodor Dostoyevsky',
    'Frodo',
    'Friedrich Nietzsche',
    'Friedrich Engels',
    'Frida Kahlo',
    'Freddy Krueger',
    'Franz Schubert',
    'Franz Kafka',
    'Franklin D. Roosevelt',
    'Frankenstein',
    'Frank Lloyd Wright',
    'Francisco Goya',
    'Francesco Totti',
    'FranÃ§ois Hollande',
    'FrÃ©dÃ©ric Chopin',
    'Forrest Gump',
    'Fidel Castro',
    'Fernando Alonso',
    'Ferdinand Magellan',
    'Euclid',
    'Erwin SchrÃ¶dinger',
    'Ernest Rutherford',
    'Ernest Hemingway',
    'Enrico Fermi',
    'Elvis Presley',
    'Elizabeth II of the United Kingdom',
    'Elizabeth I of England',
    'Edmund Hillary',
    'Edgar Allan Poe',
    'E.T.',
    'Dwight D. Eisenhower',
    'Du Fu',
    'Dorothy (Wizard of Oz)',
    'Donald Duck',
    'Doc. Emmett Brown (Back to the Future)',
    'Dmitry Medvedev',
    'Dmitri Mendeleev',
    'Diego VelÃ¡zquez',
    'Derek Zoolander - Zoolander',
    'Darth Vader',
    'Dante Alighieri',
    'Corbin Bleu',
    'Constantine I',
    'Confucius',
    'Cleopatra VII of Egypt',
    'Claude Monet',
    'Christopher Columbus',
    'Chris Pine',
    'Che Guevara',
    'Charlie Chaplin',
    'Charles Dickens',
    'Charles de Gaulle',
    'Charles Darwin',
    'Charlemagne',
    'Carl Linnaeus',
    'Carl Friedrich Gauss',
    'Captain James T. Kirk',
    'Captain America',
    'C-3PO and R2-D2 (Droids)',
    'Bugs Bunny',
    'Britney Spears',
    'Boris Yeltsin',
    'Bob Marley',
    'Blaise Pascal',
    'Bill Gates',
    'Bill Clinton',
    'Big Bird',
    'Bertrand Russell',
    'Benito Mussolini',
    'Benazir Bhutto',
    'Basho',
    'Barack Obama',
    'Avril Lavigne',
    'Avicenna',
    'Augustus',
    'Augusto De Luca',
    'Augustine of Hippo',
    'Aristotle',
    'Ariel (Little Marmaid)',
    'Archimedes',
    'Antonio Vivaldi',
    'AntonÃ­n DvoÅÃ¡k',
    'Anton Chekhov',
    'Anthony Blair',
    'Angelina Jolie',
    'Angela Merkel',
    'Andy Warhol',
    'Andrew Jackson',
    'Andrew Garfield',
    'Anastacia',
    'Alvin and the Chipmunks',
    'Alfred Nobel',
    'Alfred Hitchcock',
    'Alexander the Great',
    'Alexander Graham Bell',
    'Aleksandr Solzhenitsyn',
    'Aleksandr Pushkin',
    'Albrecht DÃ¼rer',
    'Albert Einstein',
    'Albert Camus',
    'Alan Turing',
    'Akira Kurosawa',
    'Akbar',
    'Agent J (Men in Black)',
    'Agatha Christie',
    'Adolf Hitler',
    'Ãdith Piaf',
    'Adam Smith',
    'Abraham Lincoln',
    'Abraham'
]


//https://docs.google.com/spreadsheets/d/1XpR1PJqoY-1BXka01CqlAYVR-5lFd4iHu1mrDqRU9vw/edit?userstoinvite=melissa.salinas.m%40gmail.com&ts=5ee578c3#gid=1187409450
const trivia_questions = [
    { q_num: 0, q: 'If tabasco sauce has 6.000 in scoville units (spiciness scale), how much is the hottest pepper in earth?', a0: '2.000.000', a1: '30.000', a2: '600.000', a3: '100.000' },
    { q_num: 1, q: 'Hg is the chemical symbol of which element?', a0: ' Mercury', a1: 'Helium', a2: 'Magnesium', a3: 'Silver' },
    { q_num: 2, q: 'About how many taste buds does the average human tongue have? ', a0: '10.000', a1: '1.000', a2: '100.000', a3: '1.000.000' },
    { q_num: 3, q: 'How much does the Chewbacca costume weigh? ', a0: '4 kg', a1: '8kg', a2: '2 kg', a3: '16 kg' },
    { q_num: 4, q: 'Which of these birds was worshipped as gods by the Mayans?', a0: 'Turkey', a1: 'Chickes', a2: 'Flamenco', a3: 'Guacamayo' },
    { q_num: 5, q: 'What colors are the Norwegian flag? ', a0: ' Red, white, and blue', a1: 'White and blue', a2: 'Yellow, blue ', a3: 'Red and White' },
    { q_num: 6, q: 'Napoleon Was Once Attacked By a Horde of ...', a0: 'Bunnies', a1: 'Bees', a2: 'Lions', a3: 'Pigs' },
    { q_num: 7, q: 'Ludwig Van Beethoven was born in 1770 in which city? ', a0: ' Berlin', a1: 'Hamburg', a2: 'Düsseldorf', a3: 'Mannheim' },
    { q_num: 8, q: 'Which country invented tea? ', a0: ' China', a1: 'England', a2: 'India', a3: 'Japan' },
    { q_num: 9, q: 'What did the Crocodile swallow in Peter Pan? ', a0: 'A clock', a1: 'A flute', a2: 'A sword', a3: 'a hook' },
    { q_num: 10, q: 'Which planet has the most gravity? ', a0: 'Jupiter', a1: 'Neptune', a2: 'Earth', a3: 'Uranus' },
    { q_num: 11, q: 'Which horoscope is associated with water?', a0: 'Scorpio', a1: 'Virgo', a2: 'Aries', a3: 'Aquarius' },
    { q_num: 12, q: 'How many bones do sharks have in their bodies? ', a0: '0', a1: '1', a2: '235', a3: '450' },
    { q_num: 13, q: 'When did the Cold War end?', a0: '1989', a1: '1988', a2: '1990', a3: '1991' },
    { q_num: 14, q: 'What is the aprox. diameter of the earth?', a0: '12.000 km', a1: '6.000 km', a2: '36.000 km', a3: '50.000 km' },
    { q_num: 15, q: 'Which of these products is sold by the brands Colgate, Oral-B and Sensodyne?', a0: 'Toothpaste', a1: 'Shampoo', a2: 'Deodorant', a3: 'Sun cream' },
    { q_num: 16, q: 'Which of these books is believed to have been inspired by the real-life experiences of the Scottish sailor Alexander Selkirk?', a0: 'Robinson Crusoe', a1: 'Moby Dick', a2: 'Treasure Island', a3: 'The Count of Monte Cristo' },
    { q_num: 17, q: 'Which toxic substance is obtained from the pressed seeds of the castor oil plant?', a0: 'Ricin', a1: 'Cyanide', a2: 'Strychnine', a3: 'Sarin' },
    { q_num: 18, q: 'First performed in 1804, Beethovens Eroica Symphony was originally dedicated to which historical figure?', a0: 'Napoleon Bonaparte', a1: 'Marie Antoinette', a2: 'Louis XVIII of France', a3: 'Voltaire' },
    { q_num: 19, q: 'Which of these is a religious event celebrated in Hinduism?', a0: 'Diwali', a1: 'Ramadan', a2: 'Hanukkah', a3: 'Whitsun' },
];

const cultura_chupistica = [
    'Partes del cuerpo que hay solo 1.',
'Organos del Cuerpo que están pareados',
'Nombres de personas en que no sean en español ni inglés  (árabe, en alemán, japonés, etc...)',
'Nombre de los dientes.',
'Sistemas del Cuerpo Humano ej: nervioso',
'Nombre de los dedos de las manos.',
'Nombres de los personajes de los simpson.',
'Nombres que terminen con "s", como "Andrés"',
'Nombres de los personajes del chavo del 8.',
'Nombres de marcas de auto.',
'Nombres de los huesos del cuerpo humano.',
'Nombre de ciudades que tengan playas',
'Nombres de mujeres que no terminen con A.',
'Cantantes o músicos famosos que murieron jóvenes',
'Razas de perros.',
'Señaleticas de transito.',
'Nombre de las ciudades del mundo que empiecen la letra',
'Nombres de tragos.',
'Nombre de deportes q se jueguen con una pelota.',
'Nombre de comidas fritas.',
'Apellidos que empiecen con la letra',
'Palabras que no tengan la A como por ejemplo Libro, Pulmon etc.',
'Nombres de animales acuáticos.',
'Nombre de deportes q se jueguen sin una pelota.',
'Nombres de comidas que lleven papas ejemplo pastel de papas.',
'Animales propios de América Latina',
'Palabras agudas terminadas en N tales como CAMIÓN.',
'Nombres personas antiguos como por ejemplo: Ermenegilda.',
'Películas de disney antes del 2000',
'Cosas que no pueden faltar en la cama como por ejemplo: colchón.',
'Nombre de Competidores de Uber en el mundo por ejemplo: DiDi',
'Nombres de productos de Uber como por ejemplo UberX',
'Nombres de hombre que contengan “s” ej.: Andrés.',
'Nombres de frutas.',
'Cuerpos Celestes como astros o plantas',
'Marcas de cervezas.',
'Nombre solo instrumentos de cuerda como por ejemplo violín.',
'Nombre marcas de automóviles como por ejemplo Suzuki.',
'Marcas de celulares.',
'Nombres de animales con alas que no vuelan',
'Jugador propone el tema :',
'Nombre los dibujos animados ochenteros como por ej.: he-man.',
'nombre marcas de cigarrillos.',
'Nombre signos zodiacales.',
'Nombres bíblicos como por ej.: Noé',
'Nombre de las ciudades  o paises del mundo que empiecen la letra',
'Nombre de Monedas del mundo',
'Nombre de Aerolineas',
'Capitales Latinoamericanas',
'Nombre de gentilicios latinoamericanos como por ejemplo Argentino',
'Marcas y su país de orígen como Sony: Japón',
'Animales que comiencen con la letra',
'Nombres de Mujer que empiecen con la letra',
'Nombres de mascotas que empiecen con la letra',
'Nombre de Paises que comiencen con la letra',
'Nombre de personajes ficticios que comiencen con la letra',
]