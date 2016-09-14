const Transform = require('stream').Transform;
const inherits = require('util').inherits;

var VelocityTransformStream = function(requestsPerSecond) {
    Transform.call(this, {objectMode: true});
    this.previousLatitude = null;
    this.previousLongitude = null;
    this.requestsPerSecond = requestsPerSecond;
};

inherits(VelocityTransformStream, Transform);

VelocityTransformStream.prototype._transform = function(chunk, encoding, cb) {
    var data = JSON.parse(chunk);
    if (this.previousLatitude !== null && this.previousLongitude !== null) {
        console.log(data.name + ' is at:');
        console.log('latitude: ' + data.latitude);
        console.log('longitude: ' + data.longitude);

        console.log(data.name + ' is moving at: ')
        var latitudeDiff = differencePerSecond(data.latitude,
            this.previousLatitude, this.requestsPerSecond);
        var longitudeDiff = differencePerSecond(data.longitude,
            this.previousLongitude, this.requestsPerSecond);
        console.log(latitudeDiff + ' degrees latitude per second');
        console.log(longitudeDiff + ' degrees longitude per second');

        console.log();
    }
    this.previousLongitude = data.longitude;
    this.previousLatitude = data.latitude;
    cb(); //callback signals that we're done with this chunk
};

function differencePerSecond(current, previous, numberOfSeconds) {
    if (numberOfSeconds === 0) {
        throw new DivisionException('attempted division by zero');
    }
    return Math.abs(current - previous) / numberOfSeconds;
};

function DivisionException(message) {
   this.message = message;
   this.name = 'DivisionException';
}

module.exports = {
    differencePerSecond: differencePerSecond,
    DivisionException: DivisionException,
    VelocityTransformStream: VelocityTransformStream
};
