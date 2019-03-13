let video;
var gong; 
let button;
let poseNet;
let canvas;
let wristRightY = 0;
let wristRightX = 0;
let rightElbowX = 0;
let rightElbowY = 0;
let playing = false;

function setup() {

    canvas = createCanvas(640, 480);
    video = createCapture(VIDEO);
	video.hide();
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);

    // uncomment this for the button values..
   // button = createButton('change nose colour');
   // button.position(canvas.width/2, canvas.height/2);

}

function loaded() {
    console.log("loaded!");
}

function gotPoses(poses) {
	if (poses.length > 0) {

        let wrx = poses[0].pose.keypoints[10].position.x;
		let wry = poses[0].pose.keypoints[10].position.y;
		wristRightX = lerp(wristRightX, wrx, 0.5);
		wristRightY = lerp(wristRightY, wry, 0.5);
        
	}
}

function modelReady() {
	console.log("model ready!");
}

function draw() {

	image(video, 0, 0);
    ellipse(rightElbowX, rightElbowY, 50);

    // used for the slider
    let red =  map(wristRightX, 0, canvas.width, 0, 255);
    fill(red, 0 , 0);

    // uncomment this for the button controller
    /* if ((rightElbowX > button.x) && (rightElbowX < (button.width + button.x)) && (rightElbowY > button.y) && ((rightElbowY < (button.height + button.y)))) {
        r = random(255);
        g = random(255);
        b = random(255);

        fill(r, g , b);
    }*/

   /* if ((wristRightX < (windowWidth/2)) && (wristRightY < (windowHeight/2)))  {
        r = random(255);
        g = random(255);
        b = random(255);

        fill(r, g , b);

    }*/


}

