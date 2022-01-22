song = "";
left_wristX = "";
left_wristY = "";
right_wristX = "";
right_wristY = "";
leftWrist_score = "";
rightWrist_score = "";
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 400);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', getPoses);
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
        leftWrist_score = results[0].pose.keypoints[9].score;
        rightWrist_score = results[0].pose.keypoints[10].score;
    }
}
function draw() {
    image(video, 0, 0, 600, 400);
    fill("red");
    stroke("red");
    if (leftWrist_score > 0.2) {
        circle(left_wristX, left_wristY, 20);
        no_left = Number(left_wristY);
        no_left_floor = floor(no_left);
        volume = no_left_floor/400;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "Volume: " + volume;
    }
    if (rightWrist_score > 0.2) {
        circle(right_wristX, right_wristY, 20);
        if (right_wristY > 0 && right_wristY <= 80) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "speed = 0.5x";
        }
        if (right_wristY > 80 && right_wristY <= 160) {
            song.rate(1);
            document.getElementById("speed").innerHTML = "speed = 1x";
        }
        if (right_wristY > 160 && right_wristY <= 240) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "speed = 1.5x";
        }
        if (right_wristY > 240 && right_wristY <= 320) {
            song.rate(2);
            document.getElementById("speed").innerHTML = "speed = 2x";
        }
        if (right_wristY > 320 && right_wristY <= 400) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "speed = 2.5x";
        }
    }
}