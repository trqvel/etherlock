import { ethers } from "hardhat";


async function NFTDeploy() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const TestContract = await ethers.getContractFactory("Nft");
  const testContract = await TestContract.deploy('ipfs://QmYdqy4AwbdK6jUB3ae7evJBcnNnut89jEjnELowX2uyZk');
  console.log("NFT deployed");
}

NFTDeploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

