// -------------------
//    Initialization
// -------------------

const gui = new dat.GUI()
const params = {
    dureeNote : 0.5,
    steps_RNN : 12,
    temperature_RNN : 1.1
}

gui.add(params, "dureeNote", 0.5, 4, 0.5)
gui.add(params, "steps_RNN", 4, 24, 4)
gui.add(params, "temperature_RNN", 0.1, 1.5, 0.1)

// pour l'instant : sert d'exemple / de test 
// Checkpoint : Adresse de tous les modèles de ML préentrainés de Magenta.js
// CheckPoint+modele = URL contenant le modèle de ML que l'on désire  
const checkPoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/';
const modele = 'melody_rnn' // Modèle qui permet de continuer une mélodie

const modeleRNN = checkPoint.concat(modele); //On va chercher le modèle que l'on désire
const melodyRNN = new mm.MusicRNN(modeleRNN); //On charge ce modèle

let ownComp = {
    notes: [],
    totalTime : 0.
}

let keyboardValue = {
    "q" : 60,
    "z" : 61,
    "s" : 62,
    "e" : 63,
    "d" : 64,
    "f" : 65,
    "t" : 66,
    "g" : 67,
    "y" : 68,
    "h" : 69,
    "u" : 70,
    "j" : 71,
    "k" : 72,
    "Q" : 60,
    "Z" : 61,
    "S" : 62,
    "E" : 63,
    "D" : 64,
    "F" : 65,
    "T" : 66,
    "G" : 67,
    "Y" : 68,
    "H" : 69,
    "U" : 70,
    "J" : 71,
    "K" : 72
}

let keyboardColor = {
    "q" : "#d7323e",
    "z" : "#dd704a",
    "s" : "#e0a952",
    "e" : "#f4d45c",
    "d" : "#ffe868",
    "f" : "#e5e252",
    "t" : "#c1e562",
    "g" : "#9ad570",
    "y" : "#5fc771",
    "h" : "#589c5d",
    "u" : "#44746c",
    "j" : "#156b76",
    "k" : "#1e5598",
    "Q" : "#d7323e",
    "Z" : "#dd704a",
    "S" : "#e0a952",
    "E" : "#f4d45c",
    "D" : "#ffe868",
    "F" : "#e5e252",
    "T" : "#c1e562",
    "G" : "#9ad570",
    "Y" : "#5fc771",
    "H" : "#589c5d",
    "U" : "#44746c",
    "J" : "#156b76",
    "K" : "#1e5598"
}

// GUI PARAM //
let rnn_steps = params.steps_RNN; //Nbre de steps que l'on veut ajouter à la musique originale 
let rnn_temp = params.temperature_RNN; //A quel point on veut une séquence différente de l'originale (temp >1.5 ==> Suite de la séquence sera quasi random)
let dureeNote = params.dureeNote;

// -------------
// INSTRUMENTS 
// -------------

const piano = "https://storage.googleapis.com/magentadata/js/soundfonts/salamander"
let playerPiano = new mm.SoundFontPlayer(piano);

// -------------------
//       Drawing
// -------------------
function draw() {
    rnn_steps = params.steps_RNN;
    rnn_temp = params.temperature_RNN;
    dureeNote = params.dureeNote;
}

// -------------------------------
//   Construction de la mélodie
// ------------------------------

const suiteMelodie = async() => {
    try {
        await melodyRNN.initialize()
        const quantizedSequence = mm.sequences.quantizeNoteSequence(ownComp, 1) // Wewe on quantize le truc jsp trop ce que ca veut dire
        let impro = await melodyRNN.continueSequence(quantizedSequence, rnn_steps, rnn_temp)
        impro.totalTime = 1 //Corriger un petit bug
        const musique = await mm.sequences.concatenate([quantizedSequence, impro])

        displayPlayer(musique, 'canvasMelodyIA');

        let playMelodieIa = document.getElementById('playIA').onclick = function() {
            playerPiano.loadSamples(musique).then(()=> 
            { playerPiano.start(musique)}
                )}
        
        let stopMelodyIA =document.getElementById('stopIA').onclick = function() {
            playerPiano.stop(musique);}

        document.getElementById('melodyIA').style.display= 'block';
        displayPlayer(musique, 'canvasMelodyIA');   
        isDisplayed = true;
    
    }
    catch(error){
        console.log(error);
    }
}

let isDisplayed = false; // pour l'affichage de la fin de la page après calcul par l'IA 
let compEncours = false;
let finComp = false;

let playMelody = document.getElementById('play').onclick = function() {
    if (finComp==true)
    {
        playerPiano.loadSamples(ownComp).then(()=> 
        { playerPiano.start(ownComp)}
        )
    }
}

let stopMelody = document.getElementById('stop').onclick = function() {
    if (finComp==true)
    {
    playerPiano.stop(ownComp);}
    }


let createMelodyIA = document.getElementById('calculateMelodyIA').onclick = function() {
    if (isDisplayed)
        document.getElementById('melodyIA').style.display= 'none';
    suiteMelodie();
    isDisplayed=!isDisplayed;
}

let afficherMelodyIA = document.getElementById('melodyIA');
afficherMelodyIA.style.display= "none";

let afficherVizComp = document.getElementById("vizComposition");
afficherVizComp.style.display = "none";

document.getElementById("newMelody").onclick = function() {window.location.reload()}
document.getElementById("newMelody2").onclick = function() {window.location.reload()}

function setup() {
    p6_CreateCanvas();
    textAlign(LEFT);
}

function windowResized() {
    p6_ResizeCanvas()
}

// -------------------
//    Functions
// -------------------

document.getElementById("startComp").onclick = function(){
    compEncours = true;
} 

document.getElementById("stopComp").onclick = function(){
    compEncours = false;
    finComp = true;
    document.getElementById('startComp').style.removeProperty('background');

    displayPlayer(ownComp, 'melody'); // Display canvas whose id is melody
    console.log(ownComp);
    afficherVizComp.style.display = "block";
} 

function displayPlayer(musique, id:string){
    let config = {
        noteHeight: 6,
        pixelsPerTimeStep: 30,  // like a note width
        noteSpacing: 1,
        noteRGB: '8, 41, 64',
        activeNoteRGB: '240, 84, 119',
      }

    let viz = new mm.PianoRollCanvasVisualizer(musique, document.getElementById(id), config);   
}

let noteMusique;
let t1, t2;

let playerNote = new mm.SoundFontPlayer(piano);

function colorNote(key) {
    document.getElementById(key).style.background = keyboardColor[key];    
}
function removeColor(key) {
    document.getElementById(key).style.removeProperty('background');
}

function keyPressed(){ //Renvoie la valeur en pitch
    if (compEncours){
        
        t1 = millis();
        if (key in keyboardValue){
            colorNote(key);

            noteMusique = keyboardValue[key];
            let totTime = ownComp["totalTime"];
            let note = {
                pitch : noteMusique,
                startTime : totTime,
                endTime : totTime+=dureeNote
                };

            let noteUnique = {
                notes : [
                {  //Faire jouer la note en même temps
                pitch : noteMusique, startTime : 0., endTime : dureeNote}
            ],
                totalTime: dureeNote
            };

            playerNote.loadSamples(noteUnique).then(()=> {   
            if (playerNote.isPlaying()){ //Pour jouer plusieurs notes en même temps
                playerNote.stop(noteUnique);
            }
            playerNote.start(noteUnique);
            })

            ownComp["notes"].push(note);
            ownComp["totalTime"]+=dureeNote;
            }
        }

        // correction pour que le menu ne disparaisse plus en appuyant sur H 
        if (key === 'h') {
            dat.GUI.toggleHide();
        }
        return false;
}

function keyReleased(){
    if (compEncours && key in keyboardValue){
        t2=millis()
        console.log("t2 :", t2);
        removeColor(key);
    }
    return false;
}