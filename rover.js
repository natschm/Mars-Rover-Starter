// class Rover {
//    // Write code here!
// }

// module.exports = Rover;


// Lines 11-37 added

class Rover {
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }

   receiveMessage(message) {
     const results = message.commands.map(command => {
       if (command.commandType === 'MODE_CHANGE') {
         this.mode = command.value;
         return { completed: true };
       } else if (command.commandType === 'STATUS_CHECK') {
         return { completed: true, roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position } };
       } else if (command.commandType === 'MOVE') {
         if (this.mode === 'LOW_POWER') {
           return { completed: false };
         } else {
           this.position = command.value; // Update rover's position with the position value in the command
           return { completed: true };
         }
       }
     });
     return {
       message: message,
       results: results
     };
   }

 }
 
 module.exports = Rover;