const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it("constructor sets a value passed in as the 2nd argument", function() {
        const value = "test_value";
        const command = new Command("TEST_COMMAND", value);
        expect(command.value).toBe(value);
      });
});

// lines 8-12 added to code