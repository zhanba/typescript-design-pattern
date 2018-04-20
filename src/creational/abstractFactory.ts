import { Engine } from './factory'

interface IPayload {
  weight: number
}

interface IStage {
  engines: Engine[]
}

interface IRocket {
  payload: IPayload
  stages: IStage[]
}

interface IRocketFactory<T extends IRocket> {
  createRocket(): T
  createPayload(): IPayload
  createStages(): IStage[]
}

class Client {
  buildRocket<T extends IRocket>(factory: IRocketFactory<T>): T {
    const rocket = factory.createRocket()
    rocket.payload = factory.createPayload()
    rocket.stages = factory.createStages()
    return rocket
  }
}

// test

class ExperimentalPayload implements IPayload {
  weight: number = 0
}

class ExperimentalRocketStage implements IStage {
  engines: Engine[] = [new Engine(1)]
}

class ExperimentRocket implements IRocket {
  payload!: ExperimentalPayload
  stages!: [ExperimentalRocketStage]
}

class ExperimentRocketFactory implements IRocketFactory<ExperimentRocket> {
  createRocket(): ExperimentRocket {
    return new ExperimentRocket()
  }

  createPayload(): ExperimentalPayload {
    return new ExperimentalPayload()
  }

  createStages(): [ExperimentalRocketStage] {
    return [new ExperimentalRocketStage()]
  }
}

// another
class Satellite implements IPayload {
  constructor(public id: number, public weight: number) {}
}

class FreightRocketFirstStage implements IStage {
  engines!: Engine[]
}

class FreightRocketSecondStage implements IStage {
  engines!: Engine[]
}

type FreightRocketStages = [FreightRocketFirstStage, FreightRocketSecondStage]

class FreightRocket implements IRocket {
  payload!: Satellite
  stages!: FreightRocketStages
}

class FreightRocketFactory implements IRocketFactory<FreightRocket> {
  nextSatelliteId = 0
  createRocket(): FreightRocket {
    return new FreightRocket()
  }
  createPayload(): Satellite {
    return new Satellite(122, 222)
  }
  createStages(): FreightRocketStages {
    return [new FreightRocketFirstStage(), new FreightRocketSecondStage()]
  }
}

// use
const client = new Client()
const experimentRocketFactory = new ExperimentRocketFactory()
const freightRocketFactory = new FreightRocketFactory()

const experimentRocket = client.buildRocket(experimentRocketFactory)
const freightRocket = client.buildRocket(freightRocketFactory)
