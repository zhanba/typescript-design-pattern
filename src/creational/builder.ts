import { Engine, Payload } from './factory'

interface IStage {
  engines: Engine[]
}

interface IRocket {
  payload: Payload
}

class Probe implements Payload {
  weight: number
  constructor(x: number) {
    this.weight = x
  }
}

class SolidRocketEngine extends Engine {}

class SoundingRocket implements IRocket {
  payload!: Probe
  engine!: SolidRocketEngine
}

class LiquidRocketEngine extends Engine {
  fuelLevel = 0
  refuel(level: number): void {
    this.fuelLevel = level
  }
}

abstract class LiquidRocketStage implements IStage {
  engines: LiquidRocketEngine[] = []
  refuel(level = 1000): void {
    for (const engine of this.engines) {
      engine.refuel(level)
    }
  }
}

class FreightRocketFirstStage extends LiquidRocketStage {
  constructor(thrust: number) {
    super()
    const enginesNumber = 4
    const singleEngineThrust = thrust / enginesNumber
    for (let i = 0; i < enginesNumber; i++) {
      const engine = new LiquidRocketEngine(singleEngineThrust)
      this.engines.push(engine)
    }
  }
}

class FreightRocketSecondStage extends LiquidRocketStage {
  constructor(thrust: number) {
    super()
    this.engines.push(new LiquidRocketEngine(thrust))
  }
}

type FreightRocketStages = [FreightRocketFirstStage, FreightRocketSecondStage]

class Satellite implements Payload {
  constructor(public id: number, public weight: number) {}
}

class FreightRocket implements IRocket {
  payload!: Satellite
  stages: FreightRocketStages = []
}

class Director {
  prepareRocket<TRocket extends IRocket, TPayload extends Payload>(
    builder: RocketBuilder<TRocket, TPayload>,
    payload: TPayload
  ): TRocket {
    builder.createRocket()
    builder.addPayload(payload)
    builder.addStages()
    builder.refuelRocket()
    return builder.rocket
  }
}
