const assert = require('chai').assert;
const expect = require('chai').expect;
const stream = require('stream');

const helpers = require('../lib/consumerHelperFunctions.js');
const SatelliteLocationStream = require('../lib/SatelliteLocationStream.js');
const VelocityTransformStream = require('../lib/VelocityTransformStream.js').VelocityTransformStream;
const differencePerSecond = require('../lib/VelocityTransformStream.js').differencePerSecond;
const DivisionException = require('../lib/VelocityTransformStream.js').DivisionException;

describe('SatelliteLocationStream', function() {
    var requestsPerSecond = 2;
    var satelliteId = '25544';
    var satelliteLocationStream = new SatelliteLocationStream(satelliteId,
        requestsPerSecond);

    it('should subclass stream.Readable', function() {
        assert.equal(satelliteLocationStream instanceof stream.Readable, true);
    });

    it('should assign argument \'satelliteId\' to attribute \'satelliteId\'', function() {
        assert.equal(satelliteLocationStream.satelliteId, satelliteId);
    });

    it('should assign argument \'requestsPerSecond\' to attribute \'requestsPerSecond', function() {
        assert.equal(satelliteLocationStream.requestsPerSecond,requestsPerSecond);
    });

});

describe('VelocityTransformStream', function() {
  var requestsPerSecond = 2;
  var velocityTransformStream = new VelocityTransformStream(requestsPerSecond);

  it('should subclass stream.Transform', function() {
      assert.equal(velocityTransformStream instanceof stream.Transform, true);
  });

  it('should assign argument \'requestsPerSecond\' to attribute \'requestsPerSecond\'', function() {
      assert.equal(velocityTransformStream.requestsPerSecond, requestsPerSecond);
  });

});

describe('differencePerSecond', function() {

  it('should return 0 with no movement', function() {
      assert.equal(differencePerSecond(2, 2, 1), 0);
  });

  it('should return 1 after moving 1', function() {
      assert.equal(differencePerSecond(1, 0, 1), 1);
  });

  it('should return 1 after moving -1', function() {
      assert.equal(differencePerSecond(-1, 0, 1), 1);
  });

  it('should return 1 after moving -1', function() {
      assert.equal(differencePerSecond(-1, 0, 1), 1);
  });

  it('should return 1.5 after moving 3 over two seconds', function() {
      assert.equal(differencePerSecond(5, 2, 2), 1.5);
  });

  it('should throw an effor we are measuring over 0 time', function() {
      expect(function() {
        differencePerSecond(0, 0, 0);
      }).to.throw(new DivisionException('attempted division by zero'));
  });

});

describe('consumerHelperFunctions.validateCMDArgs', function() {
    //we'll mocking process.argv, since we're not running from the command line

    it('should return true on happy case', function() {
        process.argv = ['node', 'consumer.js', '25544', '1'];
        assert.equal(helpers.validateCMDArgs(), true)
    });

    it('should return false on wrong number of args', function() {
        process.argv = [];
        assert.equal(helpers.validateCMDArgs(), false)
    });

    it('should return false on non-integer parsable satelliteId', function() {
        process.argv = ['node', 'consumer.js', 'x', '1'];
        assert.equal(helpers.validateCMDArgs(), false)
    });

    it('should return false on non-integer parsable requestRate', function() {
        process.argv = ['node', 'consumer.js', '25544', 'x'];
        assert.equal(helpers.validateCMDArgs(), false)
    });

    it('should return false on negative satelliteId', function() {
        process.argv = ['node', 'consumer.js', '-25544', '1'];
        assert.equal(helpers.validateCMDArgs(), false)
    });

    it('should return false on negative requestRate', function() {
        process.argv = ['node', 'consumer.js', '25544', '-1'];
        assert.equal(helpers.validateCMDArgs(), false)
    });

});

describe('consumerHelperFunctions.secondOrSeconds', function() {

    it('should return \'second\' on a 1', function() {
        assert.equal(helpers.secondOrSeconds(1), 'second')
    });

    it('should return \'seconds\' on a -1, 0, or 2', function() {
      for (number of [-1, 0, 2]) {
          if (helpers.secondOrSeconds(number) !== 'seconds') {
              assert.fail(helpers.secondOrSeconds(number), 'seconds');
          }
      }
      //this is only checking the last number, but that's fine here
          //since we've ruled out the other numbers providing a bad result
      assert.equal(helpers.secondOrSeconds(number), 'seconds')
    });

});
