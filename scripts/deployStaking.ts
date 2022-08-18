import { ethers } from "hardhat";

const main = async () => {
  const stakeContract = await ethers.getContractFactory("StakeContract");
  const stake = await stakeContract.deploy();

  await stake.deployed();

  console.log("Staking Contract deployed to:", stake.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});