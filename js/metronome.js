// This file will handle the main metronome functions
// Will use the AudioContext API because it is more precise
// since it runs at the hardware level
const context = new AudioContext();
let nextBeatTime = 0;
let beat = 0;
let timerId = null;

const LOOKAHEAD_MS = 25.0;      // how often JS scheduler runs
const SCHEDULE_AHEAD_S = 0.1;   // how far ahead to schedule audio (seconds)

function playClick(time, isAccent) {
    // the app will store different click sounds
    // and will support custom ones

    //somewhere in the UI i will have button to toggle accents
}

function scheduleMetronome(bpm, timeSignature) {
    const interval = 60 / bpm // seconds

    while(nextBeatTime < context.currentTime + SCHEDULE_AHEAD_S) {
        //playClick();
        nextBeatTime += interval;
        beat++;
    }

    timerId = setTimeout(() => scheduleMetronome(bpm, timeSignature), LOOKAHEAD_MS);
}

async function startMetronome(bpm, timeSignature) {
    if (timerId !== null) return; // already running

    beat = 0;
    nextBeatTime = context.currentTime;

    await context.resume() // browser can sometimes pause audio

    scheduleMetronome(bpm, timeSignature);
}

function stopMetronome() {
    beat = 0;
    
    clearTimeout(timerId);
}