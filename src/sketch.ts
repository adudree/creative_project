// -------------------
//    Initialization
// -------------------

let player = new mm.Player();
let isDisplayed = false; // pour l'affichage de la fin de la page après calcul par l'IA 

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

function setup() {
    p6_CreateCanvas();
    textAlign(LEFT);

    /* === INTRO === */

    createElement('h1', "Melod'IMAC");
    createElement('p', "You would like to compose your own melody and you have started it, but you don't know how to continue it? Melod'IMAC is here for you!");

    /* === COMPOSE === */

    createElement('h2', "Let's compose!");
    createElement('p', "Compose your own melody (8 notes) by playing with your keyboard : A = C (do), Z = D (ré), E = E (mi), R = F (fa), T = G (sol), Y = A (la), U = B (si), I = C (do)");

    // visualizer
    let canvas1 = createElement('canvas');
    canvas1.id('melody');
    displayPlayer('melody');

    // buttons 
    let playMelody = createButton("play");
    playMelody.mousePressed(startMelody);
    let stopMelody = createButton("stop");
    stopMelody.mousePressed(endMelody);

    /* === CALCULATE THE END === */
    createElement('h2', "Let's calculate!");
    let calculateAI = createButton("CALCULATE THE END OF THE MELODY");
    calculateAI.mousePressed(calculate);
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
function startMelody() {
    player.start(TWINKLE_TWINKLE);
}

function endMelody() {
    player.stop(TWINKLE_TWINKLE);
}

function startAll() {
    player.start(TWINKLE_TWINKLE);
}

function endAll() {
    player.stop(TWINKLE_TWINKLE);
}

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

function calculate() {
    if (!isDisplayed)
        displayEnd();
}

function displayEnd() {

    /* insert visualize here */
    let canvas2 = createElement('canvas');
    canvas2.id('all');
    displayPlayer('all');

    createElement('p', "Congrats! The end of you melody have been created, let's listen to it ! If you don't like it, you can calculate a different ending by clicking on the previous button.");
    
    let playAll = createButton("play");
    playAll.mousePressed(startAll);

    let stopAll = createButton("stop");
    stopAll.mousePressed(endAll);
    
    
    isDisplayed = true;
}

// -------------------
//       Drawing
// -------------------

function draw() {}
