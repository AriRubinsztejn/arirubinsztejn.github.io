//Ari Rubinsztejn
var width = 400;
var height = 300;
var canvas = ctx = false;
var frameRate = 1/60; // Seconds
var frameDelay = frameRate * 100; // ms
var loopTimer = false;
var originX=width/2
var originY=height/2
var length=width/4
var g = 9.81
var bob = {
    theta: Math.PI/2,
    thetaDot: 0,
    position: {x: Math.sin(Math.PI/4)*length,y:Math.cos(Math.PI/4)*length},
    mass: 2, //kg
    radius: 5, // 1px = 1cm
    };
var mouse = {x: 0, y: 0, isDown: false};

function getMousePosition(e) {
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
}
var mouseDown = function(e) {
    if (e.which == 1) {
        getMousePosition(e);
        mouse.isDown = true;


        bob.position.x = mouse.x-originX;
        bob.position.y = mouse.y-originY;
        bob.theta =Math.atan2(bob.position.x,bob.position.y)
        bob.position.x= originX+Math.sin(bob.theta)*length
        bob.position.y= originY+Math.cos(bob.theta)*length
        bob.thetaDot=0
    }
}
var mouseUp = function(e) {
    if (e.which == 1) {
        mouse.isDown = false;
    }
}

var setup = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");




    canvas.onmousemove = getMousePosition;
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;

    ctx.fillStyle = 'red';
    ctx.strokeStyle = '#000000';
    loopTimer = setInterval(loop, frameDelay);
}

var loop = function() {
//console.log(bob)

    if ( ! mouse.isDown) {
        // Do physics
            // Drag force: Fd = -1/2 * Cd * A * rho * v * v
        var thetaDotDot = -g*Math.sin(bob.theta)/length
        //console.log(thetaDotDot)
        //thetaDotDot = (isNaN(thetaDotDot) ? 0 : thetaDotDot);
        bob.thetaDot = bob.thetaDot + (frameRate*thetaDotDot)
        bob.theta = bob.theta + (frameRate*bob.thetaDot)

        bob.position.x= originX+Math.sin(bob.theta)*length
        bob.position.y= originY+Math.cos(bob.theta)*length

    }

    // Draw the ball


    ctx.clearRect(0,0,width,height);

    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,width,height)
    ctx.strokeStyle="black";
    ctx.beginPath()
    ctx.moveTo(originX,originY)
    ctx.lineTo(bob.position.x, bob.position.y);
    ctx.stroke();
    ctx.fillStyle = "red";

    ctx.translate(bob.position.x, bob.position.y);
    ctx.beginPath();
    ctx.arc(0, 0, bob.radius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();

    ctx.restore();



    // Draw the slingshot
    if (mouse.isDown) {
        ctx.beginPath();
        ctx.moveTo(originX+Math.sin(bob.theta)*length, originY+Math.cos(bob.theta)*length);
        ctx.lineTo(originX, originY);
        ctx.stroke();
        ctx.closePath();
    }

}
    setup();
