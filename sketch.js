const numStars = 100;
let stars = [];
let llueve = true;
var song;
var button;
var w;



function toggleSong() {

    llueve = !llueve;

    if (song.isPlaying()) {
        song.stop();

    }
    else {
        song.play();

    }
}

function preload() {
    song = loadSound('Cherry.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(3);
    button = createButton('toggle');
    button.mouseClicked(toggleSong);
    song.play();
    fft = new p5.FFT(0, 256);
    w = width / 256;



}


function draw() {

    background('rgba(30,42,52,0.1)');


    if (llueve) {
        stars = stars.filter(function (star) {
            star.draw();
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

        this.particles = [];
        this.red = random(80, 160);
        this.green = random(110, 255);
        this.blue = random(5, 120);
        this.pos = createVector(x, y);
        this.prevPos = createVector(x, y);
        this.vel = createVector(0, (random(-11, -13)));



    }

    isActive() {
        return onScreen(this.prevPos.x, this.prevPos.y);
    }

    update() {

        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    draw() {
        var spectrum = fft.analyze();

        for (let i = 0; i < spectrum.length; i++) {
            var amp = spectrum[i];
            var y = map(amp, 0, 256, height, 0);
            stroke(this.red, this.blue, this.green,);
            //line(i * w, height, i * w, y);
            line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        }


    }


}

function onScreen(x, y) {
    return x >= 0 && x <= width && y >= 0 && y <= height;
}
