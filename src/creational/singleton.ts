class Singleton {
  private static defaultSingleton: Singleton
  bar = 'bar'
  foo(): void {
    // tslint:disable-next-line:no-console
    console.log(this.bar)
  }

  static get default(): Singleton {
    if (!Singleton.defaultSingleton) {
      Singleton.defaultSingleton = new Singleton()
    }
    return Singleton.defaultSingleton
  }
}

// test
const single = Singleton.default
