// import {'deque'} from 'collections';
// import { deque as Deque} from "collections";
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


var pointsZ = [];
var avgPointsZ = [];

var state = 0;
var sign = 0;
var stepCount = 0;

var stepCheckEnabled = true;

var stepCountNorth = 0;
var stepCountEast = 0;

var minAmplitude = 0.5;
var maxAmplitude = 2.2;
var resetAmplitude = -0.1;

var avgAmount = 30; //Average the last n samples from the sensor.
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
    if(avgPointZ.length!=0) return avgPointZ[avgPointsZ.length-1];
    else return 0;
}

getSlope = ()=>{
    last = 2 << 19;
    first = 2 << 19;
    if (avgPointsZ.length != 0) {
        last = avgPointsZ[avgPointsZ.length-1];
        first = avgPointsZ[0];
    }
    if (state == 1) {
        return (last - first) / avgAmount;
    }
    else{
        return 2 << 19;
    }
}



let accelerometer = null;
var text = document.getElementById("para");
try {
    console.log("HELLO");
    accelerometer = new LinearAccelerationSensor({frequency : 60, referenceFrame: 'device' });
    accelerometer.addEventListener('error', event => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError') {
            console.log("NO ERROR");
            text.innerHTML = "Not allowed error";
        } else if (event.error.name === 'NotReadableError' ) {
            text.innerHTML = "CANNOT CONNECT TO SENSOR";
            console.log('Cannot connect to the sensor.');
        }
        console.log("NO ERROdfdgmslkgjlR");
        text.innerHTML = "CODERSSS";
    });
    accelerometer.addEventListener('reading', () => {
        
        document.getElementById("x").innerHTML = "Acceleration along X-axis: " + accelerometer.x;
        document.getElementById("y").innerHTML = "Acceleration along Y-axis: " + accelerometer.y;
        document.getElementById("z").innerHTML = "Acceleration along Z-axis: " + accelerometer.z;
        
        addPoint(accelerometer.z);
        if(sign==-2 && state == 1 && stepCheckEnabled){
            state = 0;
            stepCount+=1;
            text.innerHTML = stepCount;
        }
    }
        );
    accelerometer.start();
    // text.innerHTML = "READINGS";
    // accelerometer.onreading = () => {
    //     document.getElementById("x").innerHTML = "Acceleration along X-axis: " + sensor.x;
    //     document.getElementById("y").innerHTML = "Acceleration along Y-axis: " + sensor.y;
    //     document.getElementById("z").innerHTML = "Acceleration along Z-axis: " + sensor.z;
    // }
} catch (error) {
    // Handle construction errors.
    console.log("ERORS");
    if (error.name === 'SecurityError') {
        // See the note above about feature policy.
        text.innerHTML = "Sensor construction was blocked by a feature policy.";
        console.log('Sensor construction was blocked by a feature policy.');
    } else if (error.name === 'ReferenceError') {
        text.innerHTML = "Sensor not supported";
        console.log('Sensor is not supported by the User Agent.');
    } else {
        text.innerHTML = "error";
        throw error;
    }
}


