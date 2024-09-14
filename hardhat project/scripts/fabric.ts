import { ethers } from "hardhat";


async function FabricDeploy() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const TestContract = await ethers.getContractFactory("MyContractFactory");
  const testContract = await TestContract.deploy();
  console.log("ContractFactory deployed");
}


FabricDeploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

