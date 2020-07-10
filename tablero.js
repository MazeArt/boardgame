
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
const twotruths_div = document.getElementById("twoTruths_");
const palabras_div =  document.getElementById("palabras_");
const quiensoy_div =  document.getElementById("quiensoy_");
const trivia_div =  document.getElementById("trivia_");


const numPlayers = sessionStorage.getItem("numPlayers");
let playerTurn=0
let timer

let movie //this is the selected random movie
let personaje 

let playerList= []

function checkPlayerlist(){
    for(var i=0;i<numPlayers;i++){
        playerList[i]=sessionStorage.getItem("player"+i)

    } 

}



//hides all game divs
function hide_divs(){
    mimica_div.style.display = "none"
    palabras_div.style.display = "none"
    twotruths_div.style.display = "none"
    trivia_div.style.display = "none"
    quiensoy_div.style.display = "none"
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
    turn=0
    console.log('a new player was created: %s' ,  'tipo');
    

   // player.innerHTML=gamePlayers[turn].name //change turn here
    isPlaying = false;

}

function rollDice(){
    getPlayerTurn();
    wheelEffect();
}




function getPlayerTurn(){
    console.log('its player %s turn' , playerTurn);
    //players in the Session
    //numPlayers = sessionStorage.getItem("numPlayers");
    console.log("players::",sessionStorage.getItem("numPlayers"))
    //show player name in index
    player.innerHTML = sessionStorage.getItem("player"+playerTurn);
    console.log("player::",sessionStorage.getItem("player"+playerTurn))
    //logic to decide next player turn (cycles through numPlayers)
    if(playerTurn<(numPlayers-1)){
        playerTurn++;
    } else {
        playerTurn=0;
    }

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
   
    gameDisplay.innerHTML=juego;
    //make function to prevent repeating random
    lastGame=juego

    hide_divs();

    switch(juego) {
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
        
        default:
          // code block
      }
        
    return juego;

}
/// Game Modules functions
function getRandomFromList(list){
    var listlen=list.length;
    var random = Math.floor((Math.random()*list.length));
    console.log('listlen is %s, random number was  %s',listlen,random )
    return list[random];
}

function mimica(){
    
    if(currentGame=='Mímica'){
        
        if (mimica_div.style.display === "none") {
            mimica_div.style.display = "block";
        }    
    }
    movie=getRandomFromList(movies)     
}

function quiensoy(){
    
    if(currentGame=='Quien soy?'){
        
        if (quiensoy_div.style.display === "none") {
            quiensoy_div.style.display = "block";
        }    
    }
    personaje=getRandomFromList(personajes)     
}

function trivia(){
    
    if(currentGame=='Trivia'){
        
        if (trivia_div.style.display === "none") {
            trivia_div.style.display = "block";
        }    
    }
    
    var random = Math.floor((Math.random()*trivia_questions.length));

    document.getElementById('pregunta').innerHTML = trivia_questions[random][0]      
}

function twotruths(){
    
    if(currentGame=='Dos Verdades y una Mentira'){
        
        if (twotruths_div.style.display === "none") {
            twotruths_div.style.display = "block";
        }    
    }
    //personaje=getRandomFromList(personajes)     
}

function palabrasConc(){
    
    if(currentGame=='Palabras Concatenadas'){
        
        if (palabras_div.style.display === "none") {
            palabras_div.style.display = "block";
        }    
    }
    randomPlayer=getRandomFromList(playerList) 
    document.getElementById('random_player').innerHTML = randomPlayer   
}

let dTimer
function nextPlayerTimer(){
    randomPlayer=getRandomFromList(playerList) 
    document.getElementById('random_player').innerHTML = randomPlayer

   clearInterval(dTimer);
   var timeleft = 3;
   document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";

    dTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(dTimer);
            document.getElementById("countdown").innerHTML = "Perdió !!";
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

async function wheelEffect(){
    currentGame='';
    mimica_div.style.display = "none"
    var t=20;
    var interval=Math.random()*(-1+Math.round(Math.random()))
    var duration=20+interval*(100) //300 
    var lastItem
    console.log('this is t: ',t); 
    while(t<duration){
        await sleep(t)
        
     //   console.log('this is t: ',t,duration)
        t=t+20
        juego=getRandomFromList(juegos)
        while(juego==lastItem){
            juego=getRandomFromList(juegos)
        }
        lastItem=juego
        //debugging
           //  juego='Quien soy?'
        gameDisplay.innerHTML=juego;
        ;
    }
    getGame();
    
}


//KEY Press listen
document.body.addEventListener('keydown', function(e) {
   console.log('key pressed, ',currentGame)
   if(e.keyCode==77){
    if(currentGame=='Mímica'){
        console.log('pressed "m" when mimica is visible')
        document.getElementById('movie').innerHTML = movie   
    }
    if(currentGame=='Quien soy?'){
        console.log('pressed "m" when quien soy is visible')
        document.getElementById('personaje').innerHTML = personaje   
    }
    if(currentGame=='Trivia'){
        console.log('pressed "m" when quien soy is visible')
        document.getElementById('respuesta').innerHTML = "I DON'T KNOW!"       
    }

    }
});
document.body.addEventListener('keyup', function(e) {
    console.log('key pressed, ',currentGame)
    if(e.keyCode==77){
     if(currentGame=='Mímica'){
         console.log('pressed "m" when mimica is visible')
         document.getElementById('movie').innerHTML = ''  
     }
     if(currentGame=='Quien soy?'){
        console.log('pressed "m" when quien soy is visible')
        document.getElementById('personaje').innerHTML = ''  
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
    'Quien soy?'
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

const trivia_questions = [ ['In what year was the first ever Wimbledon Championship held?',' 1877.'],
['Hg is the chemical symbol of which element?',' Mercury.'],
['Which email service is owned by Microsoft?',' Hotmail.'],
['Which country produces the most coffee in the world?',' Brazil.'],
['In which city was Jim Morrison buried?',' Paris.'],
['Which song by Luis Fonsi and Daddy Yankee has the most views (of all time) on YouTube?',' Despacito.'],
['What was the first state?',' Delaware.'],
['What is the capital city of Spain?',' Madrid.'],
['What is the painting ‘La Gioconda’ more usually known as?',' The Mona Lisa.'],
['What is Chandler’s last name in the sitcom Friends? ',' Bing.'],
['About how many taste buds does the average human tongue have? ',' 10, 000.'],
['Who did Madonna kiss at the 2003 VMAs? ',' Britney Spears and Christina Aguilera.'],
['How much does the Chewbacca costume weigh? ',' Eight pounds.'],
['What colors are the Norwegian flag? ',' Red, white, and blue.'],
['Where would you find the world’s most ancient forest? ',' Daintree Forest north of Cairns, Australia.'],
['Globe and Jerusalem are types of what? ',' Artichoke.'],
['Which is the highest waterfall in the world? ',' Angel Falls, Venezuela.'],
['Ludwig Van Beethoven was born in 1770 in which city? ',' Berlin.'],
['What is the third sign of the Zodiac? ',' Gemini.'],
['What is Ariana Grande’s brother’s name? ',' Frankie.'],
['Who discovered Penicillin? ',' Fleming.'],
['Name the three primary colors. ',' Red, yellow and blue.'],
['Which name is rapper Sean Combs better known by? ',' P. Diddy'],
['Which country invented tea? ',' China.'],
['Pure water as a pH level of around? ',' 7.'],
['Which is the only vowel on a standard keyboard that is not on the top line of letters? ',' A.'],
['Who starts first in chess? ',' White.'],
['What was Britney Spears’ first song? ',' Baby One More Time.'],
['What did Queen Anne die of? ',' A stroke.'],
['Groups of lions are known as what? ',' Prides'],
['How many pairs of wings does a bee have? ',' Two.'],
['What language has the most words? ',' English.'],
['What’s the most expensive home in the world? ',' Buckingham Palace.'],
['Kodiak island is in which US state? ',' Alaska.'],
['Which castle is on the island of Anglesey? ',' Beaumaria.'],
['Which reality show series is Andy Cohen’s favorite? ',' Real Housewives.'],
['How long does it take to hard boil an egg? ',' 7 minutes.'],
['What nationality was Marco Polo? ',' Venetian'],
['Which scientist was awarded the 1921 Nobel Prize in Physics? ','  Albert Einstein.'],
['Name the world’s largest ocean. ',' Pacific.'],
['What did the Crocodile swallow in Peter Pan? ',' An alarm clock.'],
['What state is the Lincoln family home (Hildene) located in? ',' Vermont.'],
['Which actress said, “Fasten your seatbelts. It’s going to be a bumpy night,” in All About Eve? ',' Bette Davis (as Margo Channing.)'],
['Zurich is the largest city in what country? ',' Switzerland.'],
['How many phases of the moon are there? ',' Eight.'],
['What’s the hardest rock? ',' A diamond.'],
['How many bones do sharks have in their bodies? ',' None!']
]

