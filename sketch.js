const numStars = 1000;
let stars = [];
let song;

function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(3);
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star(random(width), random(height)));
    }
    song = loadSound('Cherry.mp3');

}

function mousePressed() {
    if (song.isPlaying()) {
        song.stop();

    }
    else {
        song.play();

    }
}
function draw() {
    background('rgba(30,42,52,0.1)');

    const acc = map(mouseX, 40, width, 0.0005, 0.5);

    stars = stars.filter(star => {
        star.draw();
        star.update(acc);
        return star.isActive();
    });

    while (stars.length < numStars) {
        stars.push(new Star(random(width), random(height)));
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
        this.vel = createVector(0, random(-11, -13));


    }

    isActive() {
        return onScreen(this.prevPos.x, this.prevPos.y);
    }

    update(acc) {
        this.prevPos.y = this.pos.y;
        this.pos.y += this.vel.y;

    }


    draw() {
        const alpha = map(this.vel.mag(), 0, 3, 0, 255);
        stroke(this.red, this.blue, this.green, alpha);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);

    }


}

function onScreen(x, y) {
    return x >= 0 && x <= width && y >= 0 && y <= height;
}

