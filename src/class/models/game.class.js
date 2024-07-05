import{createLocationPacket} from '../../utils/game.notificiation.js'

const MAX_PLAYERS = 4;

class Game {
  constructor() {
    this.users = [];
    this.state = 'waiting';
  }

  addUser(user) {
    this.users.push(user);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(socket) {
    // this.users = this.users.filter((user) => user.id !== userId);
    const index = this.users.findIndex((user) => user.socket === socket);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
    
  }

  getMaxLatency() {
    let maxLatency = 0;
    this.users.forEach((user) => {
      maxLatency = Math.max(maxLatency, user.latency);
    });
    return maxLatency;
  }

  getAllLocation() {
    const maxLatency = this.getMaxLatency();
    const locationData = this.users.map((user) => {
      return { id: user.id, playerId: user.playerId, x: user.x, y: user.y };
    });
    console.log(locationData);
    return createLocationPacket(locationData);
  }
}

export default Game;
