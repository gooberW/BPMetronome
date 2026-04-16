// This file will handle the main metronome functions
// Will use the AudioContext API because it is more precise
// since it runs at the hardware level
const context = new AudioContext();
let nextBeatTime = 0;
let beat = 0;
let timerId = null;

const LOOKAHEAD_MS = 25.0;      // how often JS scheduler runs
const SCHEDULE_AHEAD_S = 0.1;   // how far ahead to schedule audio (seconds)

let clickBuffer = null;

async function loadSound(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await context.decodeAudioData(arrayBuffer); // returns an AudioBuffer
}

async function loadSounds() {
    clickBuffer  = await loadSound('files/minecraft_click.wav');
}

function playClick(time, isAccent) {
    // the app will store different click sounds
    // and will support custom ones

    //somewhere in the UI i will have button to toggle accents
    const buffer = clickBuffer; // no accent for now
    if (!buffer) return;

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time); // hardware-precise scheduling
}

function scheduleMetronome(bpm, timeSignature) {
    const interval = 60 / bpm // seconds

    while(nextBeatTime < context.currentTime + SCHEDULE_AHEAD_S) {
        playClick(nextBeatTime, beat % timeSignature === 0); // accent on the first beat of the measure
        nextBeatTime += interval;
        beat++;
    }

    timerId = setTimeout(() => scheduleMetronome(bpm, timeSignature), LOOKAHEAD_MS);
}

async function startMetronome(bpm, timeSignature) {
    if (timerId !== null) return;

    await loadSounds(); // load WAVs before starting
    beat = 0;
    nextBeatTime = context.currentTime;
    await context.resume();
    scheduleMetronome(bpm, timeSignature);
}

function stopMetronome() {
    clearTimeout(timerId);
    timerId = null; //you were missing this!
    beat = 0;
}