let accelerometer = null;
var text = document.getElementById("para");
try {
    console.log("HELLO");
    accelerometer = new Accelerometer({frequency : 60, referenceFrame: 'device' });
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
        text.innerHTML = "NO ERROdfdgmslkgjlR";
    });
    accelerometer.addEventListener('reading', () => {
        text.innerHTML = "WE ARE PRO CODERS";
        document.getElementById("x").innerHTML = "Acceleration along X-axis: " + accelerometer.x;
        document.getElementById("y").innerHTML = "Acceleration along Y-axis: " + accelerometer.y;
        document.getElementById("z").innerHTML = "Acceleration along Z-axis: " + accelerometer.z;});
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