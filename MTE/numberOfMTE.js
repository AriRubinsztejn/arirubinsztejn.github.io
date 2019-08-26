
//Ari Rubinsztejn
var width = 400;
var height = 300;
var canvas = ctx = false;
var numberOfSamples=5000




function monteCarlo(e,DITA){
  var samplesArray = []
  for (i=0;i<numberOfSamples;i++){
    t=0
    while(t<DITA){
      mteStart=Random.weibull(0.62, 0.87)*365
      mteDuration=wblrnd(2.41,1.17)
      if(t+mteStart+mteDuration<DITA){
        samplesArray[i]+=1
      }
      t=t+mteStart+mteDuration
    }
  }
  return samplesArray
}
function updateTable(DITA){
  samplesArray=monteCarlo(e,DITA)
  var bins=


}
/*
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
*/
