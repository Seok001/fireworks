const numStars = 1000;
let stars = [];
let llueve = true;
var song;
var button;
var w;


function togglePlay() {

    llueve = !llueve;

    if (song.isPlaying()) {
        song.pause();
    } else {
        song.loop();
    }
}



function preload() {
    song = loadSound('Wonder.mp3');
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.mouseClicked(togglePlay);

    fft = new p5.FFT(0.9, 256);
    w = width / 256;



}

function draw() {

    background('rgba(30,42,52,0.1)');
    spectrum = fft.analyze();
    for (let i = 0; i < spectrum.length; i++) {
        var amp = spectrum[i];
        var y = map(amp, 0, 256, height, 0);

    }


    let waveform = fft.waveform();
    noFill();
    beginShape();
    strokeWeight(5);
    stroke(red(random(80, 160)), blue(random(5, 120)), green(random(110, 255)));
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 0, height);
        line(x * w, y, x * w, y);

        circle(x * w, y, x, y * w);

    }
    endShape();

    if (!llueve) {
        stars = stars.filter(function (star) {
            star.draw(y);
            star.update();
            return star.isActive();
        });
        while (stars.length < numStars) {
            stars.push(new Star(random(width), random(height)));
        }
    }


}

class Star {
    constructor(x, y) {


        this.red = random(80, 160);
        this.green = random(110, 255);
        this.blue = random(5, 120);
        this.pos = createVector(x, y);
        this.prevPos = createVector(x, y);
        this.vel = createVector(0, (random(-11, -13)));



    }

    isActive() {
        return onScreen(this.prevPos.x * w, this.prevPos.y * w);
    }

    update() {

        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    draw(y) {

        stroke(this.red, this.blue, this.green,);
        // line(y,)
        line(this.pos.x * (y * w), this.pos.y * (y), this.prevPos.x * (y * w), this.prevPos.y * (y));
    }




}

function onScreen(x, y) {
    return x >= 0 && x <= width && y >= 0 && y <= height;
}
