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

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
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
      const { x, y } = user.calculatePosition(maxLatency);
      return { id: user.id, playerId: user.playerId, x, y };
    });
    console.log(locationData);
    return createLocationPacket(locationData);
  }
}

export default Game;
