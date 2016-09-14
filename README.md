#satellite-location-stream

This is part of a work sample for a job interview.
It uses Node.js streams to pull and display data from the
[wheretheiss.at](http://wheretheiss.at/w/developer) API.

##How to run
Open a terminal and enter the following commands:

1. `$ git clone https://github.com/SageBerg/satellite-location-stream.git`
2. `$ cd path/to/satellite-location-stream`
3. `$ node consumer.js 25544 1`

The program should be running now and streaming data about the location and
movement of the ISS into your console. The ISS has ID 25544 and I'm not aware of
any other satellites that the underlying API supports.

##How to test
1. `$ git clone https://github.com/SageBerg/satellite-location-stream.git`
2. `$ cd path/to/satellite-location-stream`
3. `$ sudo npm install`
4. `$ mocha`

This should display the results of the unit tests stored in test/test.js.
