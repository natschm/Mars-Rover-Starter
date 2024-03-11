// const Rover = require('../rover.js');
// const Message = require('../message.js');
// const Command = require('../command.js');

// // NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
// //       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


// describe("Rover class", function() {

//   // 7 tests here!

// });



// lines 24-86 added

const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {
  it("constructor sets position and default values for mode and generatorWatts", function() {
    const position = 50;
    const rover = new Rover(position);
    expect(rover.position).toBe(position);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", function() { //Test 8
    const position = 50;
    const rover = new Rover(position);
    const message = new Message('Test Message', []);
    const response = rover.receiveMessage(message);
    expect(response.message).toBe('Test Message');
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    const position = 50;
    const rover = new Rover(position);
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test Message', commands);
    const response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  });
  
  it("responds correctly to the status check command", function() {
    const position = 50;
    const rover = new Rover(position);
    const message = new Message('Test Message', [new Command('STATUS_CHECK')]);
    const response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toBe(rover.mode);
    expect(response.results[0].roverStatus.generatorWatts).toBe(rover.generatorWatts);
    expect(response.results[0].roverStatus.position).toBe(rover.position);
  });

  it("responds correctly to the mode change command", function() {
    const position = 50;
    const rover = new Rover(position);
    const message = new Message('Test Message', [new Command('MODE_CHANGE', 'LOW_POWER')]);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    const position = 50;
    const rover = new Rover(position);
    rover.mode = 'LOW_POWER';
    const message = new Message('Test Message', [new Command('MOVE', 20)]);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(false);
    expect(rover.position).toBe(position); // Ensure rover's position did not change
  });

  it("responds with the position for the move command", function() {
    const position = 50;
    const rover = new Rover(position);
    const newPosition = 70;
    const message = new Message('Test Message', [new Command('MOVE', newPosition)]);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toBe(newPosition); // Ensure rover's position updated
  });
});