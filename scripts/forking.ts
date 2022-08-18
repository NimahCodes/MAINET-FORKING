import { ethers } from "hardhat";
 const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
    //contract addresses of the contract we are swapping
 const USDT_address = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
 const DAI_address = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
//address of someone with USDT and erther
 const address = "0x69166e49d2fd23E4cbEA767d7191bE423a7733A5"
//impersonateAccount function is from the helpers library
await helpers.impersonateAccount(address);
const impersonatedSigner = await ethers.getSigner(address);

//write function to enter the contract
//this function can accept two or three parameters
const USDT = await ethers.getContractAt("IERC", USDT_address, impersonatedSigner );
const DAI = await ethers.getContractAt("IERC", DAI_address, impersonatedSigner );

const Owner_USDT_bal = await USDT.balanceOf(address);
const Owner_DAI_bal = await DAI.balanceOf(address);


console.log("owner's USDT balance", Owner_USDT_bal)
console.log("owner's DAI balance", Owner_DAI_bal)
//run your node to see if we are doing the right thing
//use npx hardhat node to run

//npx hardhat run scripts/forking.ts --network localhost

// contract of uniswap helping us to swap
const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const UNISWAP = await ethers.getContractAt("IUniswap", ROUTER_ADDRESS, impersonatedSigner);
const amountOut = 50e6;
const amountIn = 40e6;
const deadline = Math.floor(Date.now() / 1000) + (60 * 10);
const amountAMin = 20e6;
const amountBMin = 15e6;
const liquidityAmt = 10e6;
//approve the swap before swapping by calling the approve function
// await USDT.approve(ROUTER_ADDRESS, amountOut );
// uint amountOut,
// uint amountInMax,
// address[] calldata path,
// address to,
// uint deadline

const swapToken = await UNISWAP.swapTokensForExactTokens(amountOut, amountIn, [USDT_address, DAI_address], address, deadline, {gasLimit: ethers.utils.hexlify(1000000)});
console.log(swapToken)

// checking our balance after we swapped 
console.log("Your usdt balance after swap is", Owner_USDT_bal);
console.log("Your dai balance after swap is", Owner_DAI_bal);


const addLiquidity = await UNISWAP.addLiquidity(USDT_address, DAI_address, amountOut, amountIn, amountAMin, amountBMin, address, deadline, {gasLimit: ethers.utils.hexlify(1000000)});
console.log(addLiquidity);

const remLiquidity = await UNISWAP.removeLiquidity(USDT_address, DAI_address, liquidityAmt, amountAMin, amountBMin, address, deadline, {gasLimit: ethers.utils.hexlify(1000000)}); 
console.log(remLiquidity);
//compile after adding using npx hardhat compile
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
