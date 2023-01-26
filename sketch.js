
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

    background('rgba(5,22,33,0.2)');
    noStroke();
    fill(red(random(0, 243)), green(random(10, 159)), blue(random(0, 70)));
    textSize(20);
    text('いのちの食べ方', 100, 670);
    text('How to eat life', 1200, 670);

    strokeWeight(3);
    stroke(red(random(0, 243)), green(random(10, 159)), blue(random(0, 70)));
    line(-5, 700, 250, 700);
    line(1200, 700, 1900, 700);

    //SONIDO
    //lINEAS
    let waveform = fft.waveform();
    noFill();
    beginShape();
    strokeWeight(4);
    stroke(red(random(0, 243)), green(random(10, 159)), blue(random(0, 70)));
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 0, height);
        line(x * w, y, x * w, y);
    }
    endShape();

    let spectrum = fft.analyze();

    for (let i = 0; i < spectrum.length; i++) {

        let x = map(i, 0, spectrum.length, 0, width);
        let y = map(spectrum[i], 1, -1, 0, height);
        let x2 = map(spectrum.length, 0, i, 0, width);
        let y2 = map(spectrum[i], 1, -1, 0, height);
        strokeWeight(3);
        stroke(red(random(10, 243)), green(random(20, 159)), blue(random(0, 70)));
        line(x, y, x2, y2);
        line(y - 6, x, y2, x2);
    }

    //ELLIPSES
    var vol = amp.getLevel();
    var diam = map(vol, 0, 0.5, 20, 190);
    strokeWeight(5);
    stroke(red(random(0, 255)), green(random(50, 159)), blue(random(0, 70)));
    fill(red(random(0, 255)), green(random(100, 159)), blue(random(0, 70)));
    ellipse(width / 2, height / 2, diam, diam);
    stroke(red(random(0, 255)), green(random(0, 159)), blue(random(0, 70)));
    fill(red(random(0, 255)), green(random(10, 159)), blue(random(0, 70)));
    ellipse((width / 4) + 700, height / 2, diam / 2, diam / 2);
    stroke(red(random(0, 255)), green(random(50, 159)), blue(random(0, 70)));
    fill(red(random(0, 255)), green(random(90, 159)), blue(random(0, 70)));
    ellipse((width / 4) + 950, height / 2, diam / 4, diam / 4);


    strokeWeight(2);
    noFill();
    ellipse(width / 2, height / 2, diam * w, diam * w);

    var vol = amp.getLevel();
    var diam = map(vol, 0, 0.5, 20, 100);
    strokeWeight(3);
    stroke(red(random(0, 255)), green(random(0, 159)), blue(random(0, 70)));
    ellipse((width / 4) - 4, height / 2, diam * w, diam * w);
    ellipse((width / 4) + 700, height / 2, diam * w, diam * w);

}