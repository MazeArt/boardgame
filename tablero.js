
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
let roulleteTime = 250 //default 300, 100 for speed debug

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
//TODO cuando el timer esta en 15 y se cambia el juego no se resetea... siguente juego muestra segundos restantes
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

const letras = [" A", " B", " C", " D", " E"," F", " G", "H", " I", " J", " K",
 " L"," M"," N"," O"," P"," Q"," R"," S"," T"," U"," V"];



//https://docs.google.com/spreadsheets/d/1XpR1PJqoY-1BXka01CqlAYVR-5lFd4iHu1mrDqRU9vw/edit?userstoinvite=melissa.salinas.m%40gmail.com&ts=5ee578c3#gid=1187409450
const trivia_questions = [
    {q_num: 19, q:'Which of these is a religious event celebrated in Hinduism?', a0:'Diwali', a1:'Ramadan', a2:'Hanukkah', a3:'Whitsun'},
{q_num: 20, q:' What is the name for the Jewish New Year?', a0:'Rosh Hashanah', a1:'Kwanza', a2:'Yom Kippur', a3:'Hanukkah'},
{q_num: 21, q:' How many blue stripes are there on the U.S. flag?', a0:'0', a1:'13', a2:'7', a3:'6'},
{q_num: 22, q:' Which one of these characters is not friends with Harry Potter?', a0:'Draco Malfoy', a1:'Hermione Granger', a2:'Neville Longbottom', a3:'Ron Weasley'},
{q_num: 23, q:' What is the color of Donald Duck’s bowtie?', a0:'Red', a1:'White', a2:'Yellow', a3:'Blue'},
{q_num: 24, q:' What was the name of the band Lionel Richie was a part of?', a0:'Commodores', a1:'The Marshall Tucker Band', a2:'Spectrums', a3:'King Harvest'},
{q_num: 25, q:' Which animal does not appear in the Chinese zodiac?', a0:'Hummingbird', a1:'Dog', a2:'Rabbit', a3:'Dragon'},
{q_num: 26, q:' Which country held the 2016 Summer Olympics?', a0:'Brazil', a1:'Italy', a2:'Ireland', a3:'China'},
{q_num: 27, q:' Which planet is the hottest?', a0:'Venus', a1:'Mars', a2:'Saturn', a3:'Mercury'},
{q_num: 28, q:' Who was the only U.S. President to resign?', a0:'Richard Nixon', a1:'Barack Obama', a2:'George W. Bush', a3:'Herbert Hoover'},
{q_num: 29, q:' What does the “D” in “D-Day” stand for?', a0:'Dunkirk', a1:'Denmark', a2:'Dark', a3:'Dooms'},
{q_num: 30, q:' In which city can you find the Liberty Bell?', a0:'Philadelphia', a1:'Manhattan', a2:'Boston', a3:'Washington, D.C.'},
{q_num: 31, q:' In Pirates of the Caribbean, what was the name of Captain Jack Sparrow’s ship?', a0:'The Black Pearl', a1:'The Slytherin', a2:'The Black Python', a3:'The Marauder'},
{q_num: 32, q:' According to Forrest Gump, “life was like…”', a0:'A box of chocolates', a1:'A lollipop', a2:'A handful of roses', a3:'A bag of lemons'},
{q_num: 33, q:' Linda and Bob from Bob’s Burgers have 3 kids. Which one of these characters is not one of them?', a0:'Jimmy', a1:'Tina', a2:'Gene', a3:'Louise'},
{q_num: 34, q:' The British band One Direction (rip) was made up of Harry, Louis, Niall, Zayn, and…', a0:'Liam', a1:'Kevin', a2:'Callum', a3:'Paul'},
{q_num: 35, q:' What is the rarest blood type?', a0:'AB-Negative', a1:'B', a2:'A', a3:'O'},
{q_num: 36, q:' Holly Golightly is a character in which film?', a0:'Breakfast at Tiffanys', a1:'Singing In The Rain', a2:'Pretty In Pink', a3:'Funny Face'},
{q_num: 37, q:' In The Wizard of Oz, the Tin Man wanted to see the Wizard about getting…', a0:'A heart', a1:'A dog', a2:'An oil can', a3:'A brain'},
{q_num: 38, q:' Which U.S. state is known as the sunflower state?', a0:'Kansas', a1:'Maine', a2:'California', a3:'Florida'},
{q_num: 39, q:' Which one of these characters aren’t a part of the Friends group?', a0:'Gunther', a1:'Monica', a2:'Joey', a3:'Rachel'},
{q_num: 40, q:' How many bones are there in the human body?', a0:'206', a1:'209', a2:'205', a3:'201'},
{q_num: 41, q:' Which famous singer released a song called “Adore You”?', a0:'Harry Styles', a1:'Shawn Mendes', a2:'Dua Lipa', a3:'Halsey'},
{q_num: 42, q:' Fe is the chemical symbol for…', a0:'Iron', a1:'Fluorine', a2:'Hydrogen', a3:'Zinc'},
{q_num: 43, q:' How old do you have to be to enter in the hunger games?', a0:'12', a1:'15', a2:'11', a3:'10'},
{q_num: 44, q:' What language is the most spoken worldwide?', a0:'Chinese', a1:'English', a2:'Spanish', a3:'Arabic'},
{q_num: 45, q:' What year did Barbie come out?', a0:'1959', a1:'1961', a2:'1956', a3:'1958'},
{q_num: 46, q:' What is Shakespeare’s shortest tragedy?', a0:'Macbeth', a1:'Othello', a2:'Hamlet', a3:'Romeo & Juliet'},
{q_num: 47, q:' What is the #1 cookie in the U.S.?', a0:'Oreo', a1:'Girl Scout Thin Mints', a2:'Milano', a3:'Chips Ahoy!'},
{q_num: 48, q:' How many hearts does an octopus have?', a0:'3', a1:'4', a2:'2', a3:'1'},
{q_num: 49, q:' Who wrote The Scarlett Letter?', a0:'Nathanial Hawthorne', a1:'Ernest Hemingway', a2:'Stephen King', a3:'Shakespeare'},
{q_num: 50, q:' Which social media platform came out in 2003?', a0:'Myspace', a1:'Tumblr', a2:'Twitter', a3:'Facebook'},
{q_num: 51, q:' Which planet in our solar system is the largest?', a0:'Jupiter', a1:'Earth', a2:'Saturn', a3:'Neptune'},
{q_num: 52, q:' The Powerpuff Girls are 3 distinct colors. What are they?', a0:'Blue, green, red', a1:'Green, purple, orange', a2:'Yellow, blue, green', a3:'Red, yellow, green'},
{q_num: 53, q:' Which boyband sings the song “I Want It That Way”?', a0:'Backstreet Boys', a1:'New Kids On The Block', a2:'NSYNC', a3:'One Direction'},
{q_num: 54, q:' Who painted the Sistine Chapel ceiling?', a0:'Michelangelo', a1:'Van Gogh', a2:'Da Vinci', a3:'Picasso'},
{q_num: 55, q:' In which state did the Salem Witch Trials take place?', a0:'Massachusetts', a1:'Pennsylvania', a2:'Virginia', a3:'Washington'},
{q_num: 56, q:' Which ocean is the largest?', a0:'Pacific', a1:'Arctic', a2:'Atlantic', a3:'Indian'},
{q_num: 57, q:' Which New York City building is the tallest:', a0:'One World Trade Center', a1:'Statue of Liberty', a2:'Bank of America Tower', a3:'Empire State Building'},
{q_num: 58, q:' What does the “E” in Chuck E. Cheese stand for?', a0:'Entertainment', a1:'Extra', a2:'Edward', a3:'Ernest'},
{q_num: 59, q:' Which country gifted the Statue of Liberty to the U.S.?', a0:'France', a1:'Italy', a2:'China', a3:'Germany'},
{q_num: 60, q:' Who painted the Mona Lisa?', a0:'da Vinci', a1:'Monet', a2:'Picasso', a3:'Van Gogh'},
{q_num: 61, q:' In which city were Anne Frank and her family in hiding?', a0:'Amsterdam', a1:'Frankfurt', a2:'Brussels', a3:'Paris'},
{q_num: 62, q:' There are 4 best friends in the TV show Pretty Little Liars: Hanna, Emily, Aria, and…', a0:'Spencer', a1:'Alison', a2:'Charlie', a3:'Mona'},
{q_num: 63, q:' In which decade does the Netflix series Stranger Things take place?', a0:'‘80s', a1:'early 2000s', a2:'‘90s', a3:'‘70s'},
{q_num: 64, q:' Which country consumes the most chocolate?', a0:'Switzerland', a1:'North America', a2:'Germany', a3:'Spain'},
{q_num: 65, q:' What is Sodium Chloride?', a0:'Salt', a1:'Bleach', a2:'Sugar', a3:'Chlorine'},
{q_num: 66, q:' Which astrological sign is a crab?', a0:'Cancer', a1:'Virgo', a2:'Aquarius', a3:'Pisces'},
{q_num: 67, q:' In the Bible, how does the Virgin Mary learn of her pregnancy with baby Jesus?', a0:'the angel Gabriel tells her', a1:'a doctor tells her', a2:'she has a dream about it', a3:'God tells her'},
{q_num: 68, q:' Who, in the Harry Potter series, is Tom Riddle?', a0:'Voldemort', a1:'Harry’s birth father', a2:'a professor at Hogwarts', a3:'a student in Harry’s class'},
{q_num: 69, q:' The movie The Social Network is about which social media platform:', a0:'Facebook', a1:'Twitter', a2:'Myspace', a3:'Instagram'},
{q_num: 70, q:' Who wrote the songs for The Lion King?', a0:'Elton John', a1:'Stevie Wonder', a2:'Phil Collins', a3:'Celine Dion'},
{q_num: 71, q:' How many daughters does Barack Obama have?', a0:'2', a1:'3', a2:'1', a3:'0'},
{q_num: 72, q:' Which Disney princess sings “Just Around The Riverbend”?', a0:'Pocahontas', a1:'Belle', a2:'Elsa', a3:'Snow White'},
{q_num: 73, q:' Which biblical narrative is connected to Palm Sunday?', a0:'Jesus’ entry into Jerusalem', a1:'Nothing, it just means to go to church on Sunday/the day of rest', a2:'Jesus’ resurrection', a3:'Jesus feeding the thousands'},
{q_num: 74, q:' In Harry Potter and the Sorcerer’s Stone, who gives Harry the invisibility cloak?', a0:'Dumbledore', a1:'No one, he just finds it', a2:'Snape', a3:'Ron'},
{q_num: 75, q:' How many burroughs are there in New York City?', a0:'5', a1:'10', a2:'6', a3:'4'},
{q_num: 76, q:' In the U.S. version of The Office, Michael Scott burns his foot on:', a0:'a George Foreman Grill', a1:'rocks on fire', a2:'pavement/cement', a3:'hot water'},
{q_num: 77, q:' The superstitution believes that when the groundhog sees his shadow, it means:', a0:'6 more weeks of winter', a1:'a tornado is coming', a2:'it’s going to rain', a3:'early spring'},
{q_num: 78, q:' What is the longest river in the world?', a0:'Nile', a1:'Hudson', a2:'Congo', a3:'Amazon'},
{q_num: 79, q:' How many days are in February during a leap year?', a0:'29', a1:'31', a2:'30', a3:'28'},
{q_num: 80, q:' How many degrees are in a circle?', a0:'360', a1:'359', a2:'180', a3:'150'},
{q_num: 81, q:' Which city is known as the City of Love?', a0:'Paris', a1:'New York City', a2:'Barcelona', a3:'Rome'},
{q_num: 82, q:' As an adult, how many teeth should you have in your mouth?', a0:'32', a1:'42', a2:'30', a3:'35'},
{q_num: 83, q:' What was the name of the boy who won Willy Wonka’s factory?', a0:'Charlie Bucket', a1:'Charlie Bones', a2:'Charlie Brown', a3:'Charlie Baxter'},
{q_num: 84, q:' Edward Scissorhands is known for cutting:', a0:'everything', a1:'clothes', a2:'bushes', a3:'hair'},
{q_num: 85, q:' In which city would you find the Fisherman’s Bastion?', a0:'Budapest', a1:'Athens', a2:'Barcelona', a3:'Rome'},
{q_num: 86, q:' Which U.S. president doesn’t/didn’t have a dog in the White House?', a0:'Trump', a1:'Lincoln', a2:'Obama', a3:'Bush'},
{q_num: 87, q:' What does the “U” stand for in “UFO”?', a0:'Unidentified', a1:'Unique', a2:'Under', a3:'United'},
{q_num: 88, q:' Which U.S. state is known as “America’s Dairyland”?', a0:'Wisconsin', a1:'Pennsylvania', a2:'Iowa', a3:'Minnesota'},
{q_num: 89, q:' Usher found a young boy singing on YouTube and made him into a famous singer. What’s that kid’s name?', a0:'Justin Bieber', a1:'Shawn Mendes', a2:'Jaden Smith', a3:'Niall Horan'},
{q_num: 90, q:' Which Olympic sport is Michael Phelps known for?', a0:'Swimming', a1:'Running', a2:'Skiing', a3:'Snowboarding'},
{q_num: 91, q:' What is the complementary color of green?', a0:'red', a1:'purple', a2:'yellow', a3:'blue'},
{q_num: 92, q:' Han Solo is a character from which movie series:', a0:'Star Wars', a1:'Indiana Jones', a2:'Lord of the Rings', a3:'Harry Potter'},
{q_num: 93, q:' In Men and Black, what are the two FBI agents hunting?', a0:'aliens', a1:'time travelers', a2:'ghosts', a3:'serial killers'},
{q_num: 94, q:' The most recent seasons of American Idol have the judges Katy Perry, Lionel Richie, and…', a0:'Luke Bryan', a1:'Keith Urban', a2:'Blake Shelton', a3:'Trace Adkins'},
{q_num: 95, q:' How many Harry Potter books are there?', a0:'7', a1:'10', a2:'8', a3:'6'},
{q_num: 96, q:' What breed is dog is the most popular in the U.S.?', a0:'Golden Retriever', a1:'Beagle', a2:'Dalmatian', a3:'Pug'},
{q_num: 97, q:' Which rapper was known for his album Blue Slide Park?', a0:'Mac Miller', a1:'Eminem', a2:'Post Malone', a3:'J Cole'},
{q_num: 98, q:' How many sides does a hexagon have?', a0:'6', a1:'8', a2:'7', a3:'5'},
{q_num: 99, q:' In which city was Ferris Bueller’s Day Off filmed?', a0:'Chicago', a1:'San Francisco', a2:'NYC', a3:'Pittsburgh'},
{q_num: 100, q:' The UK is made up of the following countries: England, Ireland, Wales, and…', a0:'Scotland', a1:'Austria', a2:'Hungary', a3:'France'},
{q_num: 101, q:' How many elements are there on the periodic table?', a0:'118', a1:'143', a2:'120', a3:'112'},
{q_num: 102, q:' Where is the United Nations Headquarters?', a0:'NYC', a1:'Orlando', a2:'Philadelphia', a3:'D.C.'},
{q_num: 103, q:' What famous singer sings with Taylor Swift in her song “Me!”?', a0:'Brendan Urie', a1:'Halsey', a2:'Shawn Mendes', a3:'Ellie Goulding'},
{q_num: 104, q:' In what year did women get the right to vote?', a0:'1920', a1:'1940', a2:'1930', a3:'1910'},
{q_num: 105, q:' Where in the United States is the largest aquarium?', a0:'Georgia', a1:'California', a2:'Maine', a3:'New Jersey'},
{q_num: 106, q:' There are 5 great lakes in the United States: Lake Michigan, Lake Superior, Lake Ontario, Lake Erie, and…', a0:'Lake Huron', a1:'Great Bear Lake', a2:'Lake Hartwell', a3:'Lake Tahoe'},
{q_num: 107, q:' Neil Armstrong was the first man…', a0:'on the Moon', a1:'to travel to the sun', a2:'on a spacecraft alone', a3:'on Mars'},
{q_num: 108, q:' What does “FBI” stand for?', a0:'Federal Bureau of Investigation', a1:'Federal Bureau of Inspection', a2:'Federal Business of Investigation', a3:'Female Body Inspector'},
{q_num: 109, q:' What is the deadliest snake?', a0:'Black Mamba', a1:'Anaconda', a2:'Cobra', a3:'Python'},
{q_num: 110, q:' In The Office, what object of Dwight’s does Jim put in jello?', a0:'stapler', a1:'coffee mug', a2:'wallet', a3:'computer mouse'},
{q_num: 111, q:' In Friends, how many times has Ross been married?', a0:'3 times', a1:'more than 3 times', a2:'twice', a3:'only once'},
{q_num: 112, q:' What is a group of lions called?', a0:'Pride', a1:'Herd', a2:'Pack', a3:'Squad'},
{q_num: 113, q:' How many keys are on a piano?', a0:'88', a1:'89', a2:'87', a3:'86'},
{q_num: 114, q:' What was the name of the Greek mythological woman who had snakes for hair?', a0:'Medusa', a1:'Cassiopeia', a2:'Helen', a3:'Pandora'},
{q_num: 115, q:' What do you call a baby goat?', a0:'Kid', a1:'Baby Goat', a2:'Goatee', a3:'Child'},
{q_num: 116, q:' According to Phineas and Ferb, there are __ days of summer vacation?', a0:'104', a1:'110', a2:'103', a3:'90'},
{q_num: 117, q:' What is the most populous city in Canada?', a0:'Toronto', a1:'Vancouver', a2:'Ontario', a3:'Quebec'},
{q_num: 118, q:' The Da Vinci Code opens with a murder in which museum:', a0:'The Louvre', a1:'The Metropolitan Museum of Art', a2:'The Van Gogh museum', a3:'The Guggenheim'},
{q_num: 119, q:' From which TV show is the family of Roses: Johnny, Moira, David, and Alexis?', a0:'Schitt’s Creek', a1:'7th Heaven', a2:'Parenthood', a3:'Bob’s Burgers'},
{q_num: 120, q:' After The Simpsons, what is the longest running TV show?', a0:'Law & Order', a1:'NCIS', a2:'Grey’s Anatomy', a3:'Criminal Minds'},
{q_num: 121, q:' Which Disney princess sings “A Dream Is A Wish Your Heart Makes”?', a0:'Cinderella', a1:'Sleeping Beauty', a2:'Jasmine', a3:'Belle'},
{q_num: 122, q:' How often does the moon orbit the Earth?', a0:'every 27 days', a1:'every 365 days', a2:'every 30 days', a3:'every 7 days'},
{q_num: 123, q:' In Greek Mythology, who is the Queen of the Underworld?', a0:'Persephone', a1:'Helen', a2:'Medusa', a3:'Pandora'},
{q_num: 124, q:' How many points are a touchdown worth?', a0:'6', a1:'8', a2:'7', a3:'5'},
{q_num: 125, q:' How many feet are in a mile?', a0:'5,288', a1:'6,201', a2:'5,280', a3:'1,037'},
{q_num: 126, q:' Where is the Oval Office located in the White House?', a0:'West Wing', a1:'East Wing', a2:'South Wing', a3:'North Wing'},
{q_num: 127, q:' At what temperature (Fahrenheit) does water freeze at?', a0:'32 degrees', a1:'0 degrees', a2:'40 degrees', a3:'-10 degrees'},
{q_num: 128, q:' Where in Pennsylvania is The Office based?', a0:'Scranton', a1:'Lancaster', a2:'Pittsburgh', a3:'Philadelphia'},
{q_num: 129, q:' In the movie Good Will Hunting, which college does Skylar attend?', a0:'Harvard', a1:'UCLA', a2:'Yale', a3:'Columbia'},
{q_num: 130, q:' Where in California is Disneyland located?', a0:'Anaheim', a1:'Los Angeles', a2:'Huntington Beach', a3:'Malibu'},
{q_num: 131, q:' “I see dead people,” is a line from which horror film…', a0:'The Sixth Sense', a1:'The Exorcist', a2:'The Grudge', a3:'The Shining'},
{q_num: 132, q:' Who founded Microsoft?', a0:'Bill Gates', a1:'Mark Zuckerberg', a2:'Steve Jobs', a3:'Bill Hader'},
{q_num: 133, q:' In which city was the movie National Treasure filmed?', a0:'Philadelphia', a1:'Roanoke', a2:'NYC', a3:'Washington D.C.'},
{q_num: 134, q:' Which classic novel has the line “Stay Gold, Ponyboy”?', a0:'The Outsiders', a1:'Catch-22', a2:'1984', a3:'The Catcher in the Rye'},
{q_num: 135, q:' What was the name of Harry Potter’s pet owl?', a0:'Hedwig', a1:'Fluffy', a2:'Luna', a3:'Dobby'},
{q_num: 136, q:' Which Disney princess had 3 fairy godmothers?', a0:'Sleeping Beauty', a1:'Jasmine', a2:'Snow White', a3:'Cinderella'},
{q_num: 137, q:' Which band came back together in 2019?', a0:'The Jonas Brothers', a1:'The Beatles', a2:'One Direction', a3:'The Naked Brothers Band'},
{q_num: 138, q:' Steve Jobs is known for wearing a black…', a0:'turtleneck', a1:'blazer', a2:'t-shirt', a3:'button-down shirt'},
{q_num: 139, q:' In which movie does Anne Hathaway play a poor, homeless woman?', a0:'Les Miserables', a1:'Ella Enchanted', a2:'The Princess Diaries', a3:'The Devil Wears Prada'},
{q_num: 140, q:' The movie 10 Things I Hate About You was based on which play by Shakespeare:', a0:'Taming of the Shrew', a1:'A Midsummer Night’s Dream', a2:'Hamlet', a3:'Romeo and Juliet'},
{q_num: 141, q:' Where does Nathan’s Hot Dog Eating Contest take place?', a0:'Coney Island', a1:'Orlando', a2:'Miami Beach', a3:'Mall of America'},
{q_num: 142, q:' What age did Amy Winehouse, Janis Joplin, and Jimi Hendrix die?', a0:'27', a1:'30', a2:'29', a3:'26'},
{q_num: 143, q:' Which two planets in our solar system are known as “ice giants”?', a0:'Neptune and Uranus', a1:'Pluto and Jupiter', a2:'Uranus and Pluto', a3:'Neptune and Jupiter'},
{q_num: 144, q:' What country is Prague in?', a0:'Czech Republic', a1:'Germany', a2:'Austria', a3:'Hungary'},
{q_num: 145, q:' What is the name of the actress in Funny Face, Sabrina and Roman Holiday?', a0:'Audrey Hepburn', a1:'Grace Kelly', a2:'Natalie Wood', a3:'Marilyn Monroe'},
{q_num: 146, q:' Which poet wrote the poem “The Raven”?', a0:'Edgar Allen Poe', a1:'Sylvia Plath', a2:'Walt Whitman', a3:'Robert Frost'},
{q_num: 147, q:' How many ribs are in the human body?', a0:'24', a1:'29', a2:'19', a3:'16'},
{q_num: 148, q:' Who was the 16th president of the United States?', a0:'Lincoln', a1:'Madison', a2:'Nixon', a3:'Jackson'},
{q_num: 149, q:' Who wrote the novel Slaughterhouse-Five?', a0:'Kurt Vonnegut', a1:'Harper Lee', a2:'Stephen King', a3:'J.D. Salinger'},
{q_num: 150, q:' In The Office, what was the food that Dwight grew on his farm?', a0:'beets', a1:'potatoes', a2:'onions', a3:'pumpkins'},
{q_num: 151, q:' What animal is associated with ancient Egypt?', a0:'cat', a1:'rabbit', a2:'hummingbird', a3:'lion'},
{q_num: 152, q:' In 2016, a musician won the Nobel Peace Prize for Literature. Who was it?', a0:'Bob Dylan', a1:'Elton John', a2:'Eric Clapton', a3:'Lenny Kravitz'},
{q_num: 153, q:' How many time zones are there in the world?', a0:'24', a1:'9', a2:'23', a3:'7'},
{q_num: 154, q:' What was the name of the movie that featured Matthew McConaughey, Michael Caine, Anne Hathaway, John Lithgow, and Matt Damon?', a0:'Interstellar', a1:'Ad Astra', a2:'The Martian', a3:'Flight Plan'},
{q_num: 155, q:' How many rings are there in the Olympic symbol?', a0:'5', a1:'9', a2:'7', a3:'4'},
{q_num: 156, q:' Twilight was both a book and a movie, with the main character Bella Swan being pulled into two different love directions with Edward Cullen and….', a0:'Jacob Black', a1:'Dr. Cullen', a2:'Billy Black', a3:'Jasper Hale'},
{q_num: 157, q:' What is celebrated on December 26th?', a0:'Boxing Day', a1:'National Dog Day', a2:'Harvest Day', a3:'the day after Christmas'},
{q_num: 158, q:' What is the name of the second American astronaut to step foot on the moon?', a0:'Buzz Aldrin', a1:'James Irwin', a2:'Neil Armstrong', a3:'Alan Bean'},
{q_num: 159, q:' How many eyes does a spider have?', a0:'8', a1:'2', a2:'9', a3:'10'},
{q_num: 160, q:' What is the first book of the Old Testament in the Bible?', a0:'Genesis', a1:'Exodus', a2:'Proverbs', a3:'Matthew'},
{q_num: 161, q:' Which founding father is known for his large handwriting on the Declaration of Independence?', a0:'John Hancock', a1:'Alexander Hamilton', a2:'Thomas Jefferson', a3:'John Adams'},
{q_num: 162, q:' What was the first Disney film that was produced in color?', a0:'Snow White and the Seven Dwarfs', a1:'Pocahontas', a2:'Sleeping Beauty', a3:'Cinderella'},
{q_num: 163, q:' Sodium bicarbonate is used in the kitchen as what?', a0:'baking soda', a1:'vinegar', a2:'sugar', a3:'salt'},
{q_num: 164, q:' In the 1983 movie National Lampoon’s Vacation, what is the name of the fictional amusement park the Griswold family is trying to go to?', a0:'Walley World', a1:'Dollywood', a2:'Six Flags', a3:'Dorney Park'},
{q_num: 165, q:' In Ray Bradbury`s novel Farenheit 451, what are they burning?', a0:'books', a1:'money', a2:'houses', a3:'clothes'},
{q_num: 166, q:' What was the first capital of the United States?', a0:'Philadelphia', a1:'Boston', a2:'Richmond', a3:'Washington, D.C.'},
{q_num: 167, q:' Which actor performs music under the stage name Childish Gambino?', a0:'Donald Glover', a1:'Tyler, The Creator', a2:'Will Smith', a3:'Frank Ocean'},
{q_num: 168, q:' Which water sport is the official sport for the state of Hawaii?', a0:'surfing', a1:'water skiing', a2:'swimming', a3:'water polo'},
{q_num: 169, q:' In the movie The Princess Bride, what is Westley’s response to the requests of Buttercup?', a0:'“As you wish.”', a1:'“Anything for you.”', a2:'“Of course, I love you.”', a3:'“Okay.”'},
{q_num: 170, q:' What is the name of the company that published the Mario Kart video game?', a0:'Nintendo', a1:'Xbox', a2:'Electronic Arts (EA)', a3:'SEGA'},
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
'Cuerpos Celestes como astros o planetas',
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