// class Rover {
//   constructor(position) {
//     this.position = position;
//     this.mode = 'NORMAL';
//     this.generatorWatts = 110;
//   }

//   receiveMessage(message) {
//     const results = [];
//     if (!message || !message.commands) {
//       return { message: message, results: [] };
//     }
//     message.commands.forEach(command => {
//       if (command.commandType === 'MODE_CHANGE') {
//         this.mode = command.value;
//         results.push({ completed: true });
//       } else if (command.commandType === 'STATUS_CHECK') {
//         results.push({ completed: true, roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position } });
//       } else if (command.commandType === 'MOVE') {
//         if (this.mode === 'LOW_POWER') {
//           results.push({ completed: false });
//         } else {
//           this.position = command.value; // Update rover's position with the position value in the command
//           results.push({ completed: true });
//         }
//       }
//     });
//     return {
//       message: message.name,
//       results: results
//     };
//   }
// }

// module.exports = Rover;


class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    if (!message || !message.name || !message.commands) {
      return { error: 'Invalid message object' };
    }

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
      message: message.name,
      results: results
    };
  }
}

module.exports = Rover;
