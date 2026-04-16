addEventListener("DOMContentLoaded", (event) => {
    // this is the display text
    const tempoDisplay = document.getElementById("tempo");
    // this is the bar
    const bpmSlider = document.getElementById("bpm-range");

    const updateTempo = (value) => {
        tempoDisplay.textContent = value;
        
        // the we save this and use it for the metronome
    };

    bpmSlider.addEventListener("input", (e) => {
        updateTempo(e.target.value);
    });

    // this is for the final value
    bpmSlider.addEventListener("change", (e) => {
        console.log("Final tempo set to:", e.target.value);
        localStorage.setItem("user-bpm", e.target.value);
    });

    const timeDotsContainer = document.getElementById("time-dots-container");
    // we fill the container with time dots according to the time signature
    // 4/4 = 4 dots
    // 3/4 = 3 dots
    // 6/8 = 6 dots
    // etc...
    // maybe make this a function so i can reuse it

    const timeSigBtn = document.getElementById("time-sig-dropdown");
    var userTimeSignature = timeSigBtn.getAttribute("data-value");
    console.log(userTimeSignature)

    //maybe time signature will be an array? like [4,4] or [3,4]
    // assuming thats true for now
    // actually maybe time sig jsut gives the number of dots 
    // so 4/4 would be 4 and 3/4 would be 3
    for (let i = 0; i < userTimeSignature; i++) {
        const dot = document.createElement("div");
        dot.classList.add("circle");
        timeDotsContainer.appendChild(dot);
    }
    // user time signature will be stored in local storage (?) 
    // or do i just read it from the html file
});

function generateDots(timeSignature) {
    
    
}