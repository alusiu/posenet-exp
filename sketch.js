let video;
var gong; 
let button;
let poseNet;
let canvas;

// variables for different points of those poses... 
let noseY = 0;
let noseX = 0;
let wristRX = 0;
let wristRY= 0;
let kneeRX = 0;
let kneeRY= 0;

function setup() {

    // this set up taken for Shiffman's tutorial
    canvas = createCanvas(640, 480);
    video = createCapture(VIDEO);
	video.hide();
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);

    // comment out these two lines if you don't want to play with the button 
    button = createButton('change nose colour');
    button.position(canvas.width/2, canvas.height/2);

}

function loaded() {
    console.log("loaded!");
}

function gotPoses(poses) {
	if (poses.length > 0) {

        let nx = poses[0].pose.keypoints[0].position.x;
		let ny = poses[0].pose.keypoints[0].position.y;
		noseX = lerp(noseX, nx, 0.5);
        noseY = lerp(noseY, ny, 0.5);
        
        // other pose point values that I used below...
       /*
        let wrx = poses[0].pose.keypoints[10].position.x;
		let wry = poses[0].pose.keypoints[10].position.y;
		wristRX = lerp(noseX, wrx, 0.5);
        wristRY = lerp(noseY, wry, 0.5);
        */

         /*
        let krx = poses[0].pose.keypoints[14].position.x;
		let kry = poses[0].pose.keypoints[14].position.y;
		kneeRX = lerp(kneeRX, krx, 0.5);
        kneeRY = lerp(kneeRY, kry, 0.5);
        */
 
	}
}

function modelReady() {
	console.log("model ready!");
}

function draw() {

    // draw the image and the ellipse each frame 
	image(video, 0, 0);
    ellipse(noseX, noseY, 50);

    // find the position of the nose and the button, if the nose is where the button is choose some random colours to fill the nose.
     if ((noseX > button.x) && (noseX < (button.width + button.x)) && (noseY > button.y) && ((noseY < (button.height + button.y)))) {
        r = random(255);
        g = random(255);
        b = random(255);

        fill(r, g , b);
    }

    // uncomment if you want to use the wrist slider to map the colour of the nose.
    /* let red =  map(wristRX, 0, canvas.width, 0, 255);
    fill(red, 0 , 0);*/ 

    // uncomment this to experiment with using the dimensions of the screen to control the page. 

   /* if ((wristRX < (windowWidth/2)) && (wristRY < (windowHeight/2)))  {
        r = random(255);
        g = random(255);
        b = random(255);
        fill(r, g , b);
    }*/

}

