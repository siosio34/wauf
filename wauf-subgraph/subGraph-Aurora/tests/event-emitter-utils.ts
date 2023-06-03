import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import { SupplyChainLog } from "../generated/EventEmitter/EventEmitter"

export function createSupplyChainLogEvent(
  name: string,
  supplyChain: string
): SupplyChainLog {
  let supplyChainLogEvent = changetype<SupplyChainLog>(newMockEvent())

  supplyChainLogEvent.parameters = new Array()

  supplyChainLogEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  supplyChainLogEvent.parameters.push(
    new ethereum.EventParam(
      "supplyChain",
      ethereum.Value.fromString(supplyChain)
    )
  )

  return supplyChainLogEvent
}
