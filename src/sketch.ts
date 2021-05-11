// -------------------
//    Initialization
// -------------------

// pour l'instant : sert d'exemple / de test 
// Checkpoint : Adresse de tous les modèles de ML préentrainés de Magenta.js
// CheckPoint+modele = URL contenant le modèle de ML que l'on désire  
const checkPoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/';
const modele = 'melody_rnn' // Modèle qui permet de continuer une mélodie

const modeleRNN = checkPoint.concat(modele); //On va chercher le modèle que l'on désire
const melodyRNN = new mm.MusicRNN(modeleRNN); //On charge ce modèle

let TWINKLE_TWINKLE = {
    notes: [
      {pitch: 60, startTime: 0.0, endTime: 0.5},
      {pitch: 60, startTime: 0.5, endTime: 1.0},
      {pitch: 67, startTime: 1.0, endTime: 1.5},
      {pitch: 67, startTime: 1.5, endTime: 2.0},
      {pitch: 69, startTime: 2.0, endTime: 2.5},
      {pitch: 69, startTime: 2.5, endTime: 3.0},
      {pitch: 67, startTime: 3.0, endTime: 4.0},
      {pitch: 65, startTime: 4.0, endTime: 4.5},
      {pitch: 65, startTime: 4.5, endTime: 5.0},
      {pitch: 64, startTime: 5.0, endTime: 5.5},
      {pitch: 64, startTime: 5.5, endTime: 6.0},
      {pitch: 62, startTime: 6.0, endTime: 6.5},
      {pitch: 62, startTime: 6.5, endTime: 7.0},
      {pitch: 60, startTime: 7.0, endTime: 8.0},  
    ],
    totalTime: 8
};

let player = new mm.Player();

// -------------------------------
//   Construction de la mélodie
// ------------------------------

let rnn_steps = 12; //Nbre de steps que l'on veut ajouter à la musique originale
let rnn_temp = 1.1; //A quel point on veut une séquence différente de l'originale (temp >1.5 ==> Suite de la séquence sera quasi random)

const quantizedSequence = mm.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 1) // Wewe on quantize le truc jsp trop ce que ca veut dire

const startProgramm = async() => {
    try {
        await melodyRNN.initialize()
        let impro = await melodyRNN.continueSequence(quantizedSequence, rnn_steps, rnn_temp)
        impro.totalTime = 1 //Corriger un petit bug
        console.log(impro.totalTime)
        const musique = await mm.sequences.concatenate([quantizedSequence, impro])

        let playMelodyIA = document.getElementById('playIA').onclick = function() {
            player.start(musique);}
        
        let stopMelodyIA =document.getElementById('stopIA').onclick = function() {
            player.stop(musique);}

        document.getElementById('melodyIA').style.display= 'block';
        displayPlayer(musique, 'canvasMelodyIA');   
        isDisplayed = true;
    
    }
    catch(error){
        console.log(error);
    }
}


let isDisplayed = false; // pour l'affichage de la fin de la page après calcul par l'IA 

let playMelody = document.getElementById('play').onclick = function() {
    player.start(TWINKLE_TWINKLE);}

let stopMelody = document.getElementById('stop').onclick = function() {
    player.stop(TWINKLE_TWINKLE);}

let createMelodyIA = document.getElementById('calculateMelodyIA').onclick = function() {
    if (!isDisplayed)
        startProgramm();}

let afficherMelodyIA = document.getElementById('melodyIA');
afficherMelodyIA.style.display= "none";

function setup() {
    p6_CreateCanvas();
    textAlign(LEFT);
    displayPlayer(TWINKLE_TWINKLE, 'melody'); // Display canvas whose id is melody
}

function windowResized() {
    p6_ResizeCanvas()
}

// -------------------
//    Functions
// -------------------

let valueNote;
//configuration du clavier (à revoir mdr) 
function keyTyped(){
    if (key === 'a') {
        valueNote = 64;
    }
    else if (key === 'z') {
        valueNote = 66;
    }
    else if (key === 'e') {
        valueNote = 68;
    }
    else if (key === 'r') {
        valueNote = 69;
    }
    else if (key === 't') {
        valueNote = 71;
    }
    else if (key === 'y') {
        valueNote = 73;
    }
    else if (key === 'u') {
        valueNote = 75;
    }
    else if (key === 'i') {
        valueNote = 76;
    }
}

// j'ai pas réussi à passer les mélodies en paramètre, vive le hardcoding
/*function startMelody() {
    player.start(TWINKLE_TWINKLE);
}

function stopMelody() {
    player.stop(TWINKLE_TWINKLE);
}

function startAll() {
    player.start(TWINKLE_TWINKLE);
}

function endAll() {
    player.stop(TWINKLE_TWINKLE);
}
*/

function displayPlayer(musique, id:string){
    let config = {
        noteHeight: 6,
        pixelsPerTimeStep: 30,  // like a note width
        noteSpacing: 1,
        noteRGB: '8, 41, 64',
        activeNoteRGB: '240, 84, 119',
      };

    let viz = new mm.PianoRollCanvasVisualizer(musique, document.getElementById(id), config);   
    new mm.Player(false, {
        run: (note) => viz.redraw(note),
        stop: () => {console.log('done');}
      });
}


function displayEnd() {
    
}

// -------------------
//       Drawing
// -------------------

function draw() {}