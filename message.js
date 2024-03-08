const Command = require('./command');

class Message {
   // Write code here!
   constructor(name, commands) {
      this.name = name;
      this.commands = commands || [];
   }
}

module.exports = Message;

// Lines 5-8 added to code, and line 1 added