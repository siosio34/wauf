import { SupplyChainLog as SupplyChainLogEvent } from "../generated/EventEmitter/EventEmitter"
import { SupplyChainLog } from "../generated/schema"

export function handleSupplyChainLog(event: SupplyChainLogEvent): void {
  let entity = new SupplyChainLog(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.supplyChain = event.params.supplyChain

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
