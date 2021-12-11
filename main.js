song = "";
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw() {
    image(video, 0, 0, 600, 400);
}
function playSong() {
    song.play();
    song.setVolume(0.5);
    song.rate(2.5);
}
function pauseSong() {
    song.pause();
}