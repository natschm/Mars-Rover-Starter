const Command = require('./command');

class Message {
   constructor(name, commands) {
      if (typeof name !== 'undefined') {
         this.name = name;
      } else {
         this.name = '';
      }

      if (Array.isArray(commands)) {
         this.commands = commands;
      } else {
         this.commands = [];
      }
   }
}

module.exports = Message;

// Lines 5-8 added to code, and line 1 added