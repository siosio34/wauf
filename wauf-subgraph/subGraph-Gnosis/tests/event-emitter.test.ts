import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import {} from "@graphprotocol/graph-ts"
import { SupplyChainLog } from "../generated/schema"
import { SupplyChainLog as SupplyChainLogEvent } from "../generated/EventEmitter/EventEmitter"
import { handleSupplyChainLog } from "../src/event-emitter"
import { createSupplyChainLogEvent } from "./event-emitter-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let name = "Example string value"
    let supplyChain = "Example string value"
    let newSupplyChainLogEvent = createSupplyChainLogEvent(name, supplyChain)
    handleSupplyChainLog(newSupplyChainLogEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SupplyChainLog created and stored", () => {
    assert.entityCount("SupplyChainLog", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SupplyChainLog",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "SupplyChainLog",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "supplyChain",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
