class EventEmitter {
  // constructor() {}
  _queue: any = {};

  subscribe(event: string, callback: (msg: any) => void) {
    if (this._queue[event] === undefined) this._queue[event] = [];
    this._queue[event].push(callback);
  }

  unsubscribe(event: string, callback: (msg: any) => void) {
    if (this._queue[event] === undefined) return;
    this._queue[event] = this._queue[event].filter((cb: any) => cb !== callback);
  }

  publish(event: string, msg: any) {
    if (this._queue[event] === undefined) return;
    this._queue[event].forEach((cb: any) => {
      cb(msg);
    });
  }
}

export default EventEmitter;
