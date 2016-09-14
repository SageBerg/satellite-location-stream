#satellite-location-stream

This is part of a work sample for a job interview.
It uses Node.js streams to get and display data from the
[wheretheiss.at](http://wheretheiss.at/w/developer) API.

##Dependencies
You'll need to install Git and Node.js if you haven't already.
Instructions for various platforms can be found for Git
[here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
and for Node.js [here](https://nodejs.org/en/download/).
I'm using Node.js version 0.12.3 if you'd like to install the version I'm using.

##How to run
Open a terminal and enter the following commands:

1. `$ git clone https://github.com/SageBerg/satellite-location-stream.git`
2. `$ cd satellite-location-stream`
3. `$ node consumer.js 25544 1`

Now the program should be streaming data about the location and
movement of the ISS into your console each second. The ISS has ID 25544 and I'm
not aware of other celestial objects that the underlying API supports. The
second parameter is the number of seconds the program waits each time before
hitting the API.

##How to test
1. `$ git clone https://github.com/SageBerg/satellite-location-stream.git`
2. `$ cd satellite-location-stream`
3. `$ sudo npm install`
4. `$ mocha`

This should display the results of the unit tests stored in test/test.js.
