import hre from "hardhat";

async function main() {

  const EventEmitter = await hre.ethers.getContractFactory("EventEmitter");
  const eventEmitter = await EventEmitter.deploy();
  
  await eventEmitter.deployed();

  console.log(
    `eventEmitter address : ${eventEmitter.address}`
  );

  const SupplyChain = await hre.ethers.getContractFactory("SupplyChainBiography");
  const supplyChain = await SupplyChain.deploy("NIKE Air Force 1 Low Blue Cap" , "820266-400", eventEmitter.address);

  await supplyChain.deployed();

  console.log(
    `supplyChainBiography address : ${supplyChain.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
