const request = require('request');
const Readable = require('stream').Readable;
const inherits = require('util').inherits;

var SatelliteLocationStream = function(satelliteId, requestsPerSecond) {
    Readable.call(this, {objectMode: true});
    this.satelliteId = satelliteId;
    this.requestsPerSecond = requestsPerSecond;
    ref = this;

    this.requestSatelliteInfo = function() {
        request('https://api.wheretheiss.at/v1/satellites/' + ref.satelliteId,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                ref.push(body);
            }
        });
    };

    this.requestSatelliteInfo(); //call it once without interval to reduce delay
    setInterval(this.requestSatelliteInfo, this.requestsPerSecond * 1000);
};

inherits(SatelliteLocationStream, Readable);

SatelliteLocationStream.prototype._read = function() {};

module.exports = SatelliteLocationStream;
