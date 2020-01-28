class LocalStorageMock {

  readonly length: number;
  store: { [key: string]: any }

  constructor() {
    this.store = {};
  }

  key(index: number) {
    return 'mock'
  }
  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value.toString();
  }

  removeItem(key: string) {
    delete this.store[key];
  }
};

(global as any).localStorage = new LocalStorageMock;
