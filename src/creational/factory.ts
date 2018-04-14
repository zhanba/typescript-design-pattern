class Payload {
  weight: number

  constructor(x: number) {
    this.weight = x
  }
}

class Engine {
  thrust: number

  constructor(x: number) {
    this.thrust = x
  }
}

class Stage {
  engines: Engine[]

  constructor(e: Engine[]) {
    this.engines = e
  }
}

class Rocket {
  payload?: Payload
  stages?: Stage[]
}

class RocketFactory {
  buildRocket(): Rocket {
    const rocket = new Rocket()
    const payload = this.createPayload()
    const stages = this.createStages()
    rocket.payload = payload
    rocket.stages = stages
    return rocket
  }
  createPayload(): Payload {
    return new Payload(0)
  }

  createStages(): Stage[] {
    const engine = new Engine(1000)
    const stage = new Stage([engine])
    return [stage]
  }
}

// test
const rocketFactory = new RocketFactory()
const rocketttt = rocketFactory.buildRocket()

class Satellite extends Payload {
  constructor(id: number) {
    super(200)
  }
}

class FirstStage extends Stage {
  constructor() {
    super([new Engine(1000), new Engine(1000), new Engine(1000), new Engine(1000)])
  }
}

class SecondStage extends Stage {
  constructor() {
    super([new Engine(1000)])
  }
}

type FreightRocketStages = [FirstStage, SecondStage]
class FreightRocketFactory extends RocketFactory {
  nextSatelliteId = 0
  createPayload(): Satellite {
    return new Satellite(this.nextSatelliteId++)
  }
  createStages(): FreightRocketStages {
    return [new FirstStage(), new SecondStage()]
  }
}
