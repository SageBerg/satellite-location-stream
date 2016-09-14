const helpers = require('./lib/consumerHelperFunctions.js');
const SatelliteLocationStream = require('./lib/SatelliteLocationStream.js');
const VelocityTransformStream = require('./lib/VelocityTransformStream.js').VelocityTransformStream;

if (helpers.validateCMDArgs()) {
    var satelliteId = process.argv[2];
    var requestsPerSecond = parseInt(process.argv[3]);

    console.log('Requests will be sent every ' + requestsPerSecond + ' ' +
        helpers.secondOrSeconds(requestsPerSecond) + '.\n');

    var locationStream = new SatelliteLocationStream(satelliteId,
        requestsPerSecond);
    var velocityStream = new VelocityTransformStream(requestsPerSecond);

    locationStream.pipe(velocityStream);
} else {
    console.log('USAGE: $ node consumer <satelliteId> <requestsPerSecond>');
    console.log('Example: $ node consumer.js 25544 1');
}
