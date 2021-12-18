song = "";
left_wristX = "";
left_wristY = "";
right_wristX = "";
right_wristY = "";
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', getPoses);
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
function modelLoaded() {
    console.log("Posenet is Initialised!");
}
function getPoses(results) {
    if (results.length > 0) {
        console.log(results);
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;
        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;
        console.log(left_wristX);
        console.log(left_wristY);
        console.log(right_wristX);
        console.log(right_wristY);
    }
}