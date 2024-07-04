class User {
    constructor(id, playerId, socket) {
      this.id = id;
      this.playerId = playerId;
      this.socket = socket;
      this.x = 0;
      this.y = 0;
      this.lastUpdateTime = Date.now();
    }
  
    updatePosition(x, y) {
      this.x = x;
      this.y = y;
      this.lastUpdateTime = Date.now();
    }

    // calculatePosition(latency) {
    //   const timeDiff = latency / 1000; // 레이턴시를 초 단위로 계산
    //   const speed = 1; // 속도 고정
    //   const distance = speed * timeDiff;
  
    //   // x, y 축에서 이동한 거리 계산
    //   return {
    //     x: this.x + distance,
    //     y: this.y,
    //   };
    // }
  
  }
  
  export default User;
  