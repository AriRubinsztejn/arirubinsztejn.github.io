//Ari Rubinsztejn
var width = 400;
var height = 300;
var canvas = ctx = false;
var frameRate = 1/500; // Seconds
var frameDelay = frameRate * .1; // ms
var loopTimer = false;
var originX=width/2
var originY=height/2
var length=width/8
var l1=length
var m1=1
var g = 9.81
var counter=0
var bob = {

    state: [.7,.7,0,0],//[theta1, theta2,p1,p2]
    position: {x1: Math.sin(Math.PI/4)*length,y1:-Math.cos(Math.PI/4)*length,x2:length*(Math.sin(Math.PI/4)+Math.sin(Math.PI/4)) ,y2:length*(Math.cos(Math.PI/4)+Math.cos(Math.PI/4))},
    mass: 1, //kg
    radius: 5, // 1px = 1cm
    pathX:[],
    pathY:[],
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


        bob.position.x1 = mouse.x-originX;
        bob.position.y1 = mouse.y-originY;
        bob.state[0] =Math.atan2(bob.position.x1,bob.position.y1)
        bob.state[1] = bob.state[0]
        bob.position.x1= originX + Math.sin(bob.state[0])*length
        bob.position.y1= originY + Math.cos(bob.state[0])*length
        bob.position.x2= originX + length*(Math.sin(bob.state[0])+Math.sin(bob.state[1]))
        bob.position.y2= originY + length*(Math.cos(bob.state[0])+Math.cos(bob.state[1]))
        bob.state[2]=0
        bob.state[3]=0
        bob.pathX=[]
        bob.pathY=[]
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
        t1=bob.state[0]
        t2=bob.state[1]
        dt=t1-t2
        p1=bob.state[2]
        p2=bob.state[3]

        dTheta=t1-t2;
        cdt=Math.cos(dTheta);
        sdt=Math.sin(dTheta);
        m=m1
        l=1
        console.log(cdt)
        console.log(sdt)
        console.log(p1)
        console.log(p2)
        var theta1Dot=6*((2*p1)-(3*cdt*p2))/(m*l*l*(16-(9*cdt*cdt)));
        var theta2Dot=6*((8*p2)-(3*cdt*p1))/(m*l*l*(16-(9*cdt*cdt)));
        var p1Dot=-.5*m*l*l*((theta1Dot*theta2Dot*Math.sin(dTheta))+(3*g*Math.sin(t1)/l));
        var p2Dot=-.5*m*l*l*((-theta1Dot*theta2Dot*Math.sin(dTheta))+(3*g*Math.sin(t2)/l));
        //console.log(thetaDotDot)
        //thetaDotDot = (isNaN(thetaDotDot) ? 0 : thetaDotDot);
        console.log(bob.state)
        bob.state[3]= bob.state[3] + (frameRate*p2Dot*.99)
        bob.state[2]= bob.state[2] + (frameRate*p1Dot*.99)
        bob.state[1] = bob.state[1] + (frameRate*theta2Dot*.99)
        bob.state[0] = bob.state[0] + (frameRate*theta1Dot*.99)
        console.log(bob.state)

        bob.position.x1= originX + Math.sin(bob.state[0])*length
        bob.position.y1= originY + Math.cos(bob.state[0])*length
        bob.position.x2= originX + length*(Math.sin(bob.state[0])+Math.sin(bob.state[1]))
        bob.position.y2= originY + length*(Math.cos(bob.state[0])+Math.cos(bob.state[1]))
        counter+=1
        if(counter%20==0){
          bob.pathX.push(bob.position.x2)
          bob.pathY.push(bob.position.y2)
        }

        if(bob.pathX.length>50){
          bob.pathX.shift()
          bob.pathY.shift()
        }
    }

    // Draw the ball


    ctx.clearRect(0,0,width,height);

    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,width,height)
    ctx.strokeStyle="black";
    ctx.beginPath()
    ctx.moveTo(originX,originY)
    ctx.lineTo(bob.position.x1, bob.position.y1);
    ctx.stroke();
    ctx.beginPath()
    ctx.moveTo(bob.position.x1, bob.position.y1)
    ctx.lineTo(bob.position.x2, bob.position.y2);
    ctx.stroke();
    ctx.strokeStyle="blue";
    ctx.beginPath()

    for(c=1; c<bob.pathX.length;c++){
      ctx.moveTo(bob.pathX[c-1],bob.pathY[c-1])
      ctx.lineTo(bob.pathX[c], bob.pathY[c]);
      ctx.stroke();
    }
    ctx.fillStyle = "red";

    ctx.translate(bob.position.x2, bob.position.y2);
    ctx.beginPath();
    ctx.arc(0, 0, bob.radius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();

    ctx.restore();



    // Draw the slingshot
    if (mouse.isDown) {
        ctx.beginPath();
        ctx.moveTo(originX+Math.sin(bob.state[0])*length, originY+Math.cos(bob.state[0])*length);
        ctx.lineTo(originX, originY);
        ctx.stroke();
        ctx.closePath();
    }

}
    setup();
