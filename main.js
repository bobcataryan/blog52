var song="";
var song2="";
song_to_play="";

leftWristY=0;
leftWristX=0;


rightWristY=0;
rightWristX=0;

scoreLeftWrist=0;
scoreRightWrist=0;

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(650,250);
 
    video= createCapture(VIDEO);
    video.hide();
 
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotResults); 
 }

function draw(){
image(video,0,0,600,500);
fill("#FF0000")
stroke("#FF0000")

if(scoreRightWrist > 0.2){
    circle(rightWristX,rightWristY,30)
    if(rightWristY>0){
        song2.stop();
        song.play();
        song.volume(1);
        song.rate(1);

    }
}
if (scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,30);
    if(leftWristY > 0){
        song.stop();
        song2.play();
        song2.volume(1);
        song2.rate(1);
    }
}

}   

function preload() { 
    song = loadSound("music.mp3"); 
    song2= loadSound("music2.mp3"); 
}


function modelLoaded(){

    console.log("posenet has loaded");
 }
 
 function gotResults(results){
 if (results.length > 0){
    console.log(results);
 }
 scoreRightWrist=results[0].pose.keypoints[10].score;
 scoreLeftWrist=results[0].pose.keypoints[9].score;

 console.log("right wrist score is " +scoreRightWrist+ " left wrist score is " +scoreLeftWrist);


 leftWristX=results[0].pose.leftWrist.x;
 leftWristY=results[0].pose.leftWrist.y;
 rightWristX=results[0].pose.rightWrist.x;
 rightWristY=results[0].pose.rightWrist.y;
 console.log("left wrist coordinates are (" +leftWristX+ ","+leftWristY+ ") right wrist coordinates are (" +rightWristX+","+rightWristY+ ")");
 }

