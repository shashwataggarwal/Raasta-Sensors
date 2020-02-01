var Deque = require("collections/deque");

var pointsZ = new Deque();
var avgPointsZ = new Deque();

var state = 0;
var sign = 0;
var stepCount = 0;

var stepCheckEnabled = true;

var stepCountNorth = 0;
var stepCountEast = 0;

var minAmplitude = 0.5;
var maxAmplitude = 2.2;
var resetAmplitude = -0.1;

const avgAmount = 30; //Average the last n samples from the sensor.
var amountAdded = 0;

addPoint = (z)=>{
    pointsZ.push(z);
    amountAdded+=1;
    let totalZ = 0;

    if(amountAdded>avgAmount){
        pointsZ.shift();
        let loopIndex = 0;  
        pointsZ.forEach((q)=>{
            let avgWeight = hammingWeight(loopIndex, avgAmount);
            totalZ += avgWeight*val;
            loopIndex+=1;
        })

        let tempPointZ = totalZ*1.0/(avgAmount*1.0);
        avgPointsZ.push(tempPointZ);
        flipState(tempPointZ);
        
    }
}

flipState= (f) => {
    if(f<resetAmplitude) state=0;
    if(f>maxAmplitude) state=2;
    if(f>minAmplitude && f<maxAmplitude && state!=2) state=1;
    if(f>0) sign=1;
    if(sign==1 && f<0) sign=-2;
    else if(f<0) sign=-1;
};

hammingWeight=(n,N) => {
    let y=0.54 - 0.46*Math.cos(2.0*3.14*parseFloat(n)/parseFloat((N-1)));
    return y;
};

getAvgPointZ=() => {
    if(avgPointZ.length!=0) return avgPointZ.peekBack();
    else return 0;
}

getSlope = ()=>{
    last = 2 << 19;
    first = 2 << 19;
    if (avgPointsZ.length != 0) {
        last = avgPointsZ.peekBack();
        first = avgPointsZ.peek();
    }
    if (state == 1) {
        return (last - first) / avgAmount;
    }
    else{
        return 2 << 19;
    }
}
