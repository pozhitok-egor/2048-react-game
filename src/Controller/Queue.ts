
export default class Queue<T> {
  private _queue: T[] = [];

  addToQueue(element: T | T[]) {
    if (element instanceof Array) {
      this._queue.push(...element);
    } else {
      this._queue.push(element);
    }
  }

  takeFromQueue(): T | undefined {
    return this._queue.pop();
  }

  get length(): number {
    return this._queue.length;
  }

  get values(): T[] {
    return [...this._queue]
  }

  forEach(callbackFn: (value: T, positionInQueue: number, array: T[]) => void): void {
    for(let i = this._queue.length - 1; i >= 0; i--) {
      callbackFn(this._queue[i], i, [...this._queue]);
    }
  }

  clear(): void {
    this._queue = [];
  }
}
