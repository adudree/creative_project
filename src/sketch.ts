// -------------------
//    Initialization
// -------------------

// pour l'instant : sert d'exemple / de test 
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
let isDisplayed = false; // pour l'affichage de la fin de la page après calcul par l'IA 

let playMelody = document.getElementById('play').onclick = function() {
    player.start(TWINKLE_TWINKLE);}

let stopMelody = document.getElementById('stop').onclick = function() {
    player.stop(TWINKLE_TWINKLE);}

let createMelodyIA = document.getElementById('createMelodyIA').onclick = function() {
    if (!isDisplayed)
        displayEnd();}

let playMelodyIA = document.getElementById('playIA').onclick = function() {
    player.start(TWINKLE_TWINKLE);}

let stopMelodyIA =document.getElementById('stopIA').onclick = function() {
    player.stop(TWINKLE_TWINKLE);}

let afficherMelodyIA = document.getElementById('melodyIA');
afficherMelodyIA.style.display= "none";

function setup() {
    p6_CreateCanvas();
    textAlign(LEFT);

    displayPlayer('melody');
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

function displayPlayer(id:string){
    let config = {
        noteHeight: 6,
        pixelsPerTimeStep: 30,  // like a note width
        noteSpacing: 1,
        noteRGB: '8, 41, 64',
        activeNoteRGB: '240, 84, 119',
      };

    let viz = new mm.PianoRollCanvasVisualizer(TWINKLE_TWINKLE, document.getElementById(id), config);   
    new mm.Player(false, {
        run: (note) => viz.redraw(note),
        stop: () => {console.log('done');}
      });
}


function displayEnd() {

    /* insert visualize here */
    document.getElementById('melodyIA').style.display= 'block';
    displayPlayer('canvasMelodyIA');   
    isDisplayed = true;
}

// -------------------
//       Drawing
// -------------------

function draw() {}