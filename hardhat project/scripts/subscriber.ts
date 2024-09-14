import { ethers } from "hardhat";

async function SubsciptionContractDeploy(){
    const Subscription2 = await ethers.getContractFactory("CryptoSubs");
    const subscription2 = await Subscription2.deploy("Etherlock","ETHL");
    console.log("EtherlockCriber deployed to:");
};

SubsciptionContractDeploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

