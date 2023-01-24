
let llueve = true;
var song;

var w;


function togglePlay() {


    if (song.isPlaying()) {
        song.pause();
        song.setVolume(0.5);
    } else {
        song.loop();
    }
}



function preload() {
    song = loadSound('eve.mp3');
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.mouseClicked(togglePlay);

    fft = new p5.FFT(0.9, 256);
    w = width / 256;

    amp = new p5.Amplitude();



}

function draw() {

    background('rgba(5,22,33,0.1)');


    let waveform = fft.waveform();
    noFill();
    beginShape();
    strokeWeight(4);
    stroke(red(random(0, 243)), green(random(100, 159)), blue(random(0, 70)));
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 0, height);
        line(x * w, y, x * w, y);
    }
    endShape();

    var vol = amp.getLevel();
    var diam = map(vol, 0, 0.5, 20, 200);
    strokeWeight(5);
    stroke(red(random(0, 255)), green(random(100, 159)), blue(random(0, 70)));
    fill(red(random(0, 255)), green(random(100, 159)), blue(random(0, 70)));
    ellipse(width / 2, height / 2, diam, diam);

    strokeWeight(2);
    noFill();
    ellipse(width / 2, height / 2, diam * w, diam * w);




}