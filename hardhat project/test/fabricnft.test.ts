import { Signer } from "ethers";
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('EtherlockNFTFabric', function () {
    let owner: Signer;
    let user: Signer;
    let addrs: any; 
    let etherlockNFTFabricContract: any;
    const contractPrice: any = ethers.parseEther("0.001");

    beforeEach(async function () {
        [owner, user, ...addrs] = await ethers.getSigners();
        const EtherlockNFTFabric = await ethers.getContractFactory('EtherlockNFTFabric');
        etherlockNFTFabricContract = await EtherlockNFTFabric.deploy("Etherlock", "ETHL");
    });

    it("Должен установить правильного владельца", async function () {
        expect(await etherlockNFTFabricContract.owner()).to.equal(await owner.getAddress());
    });
    
    it("Должно создаваться правильное количество контрактов и обновляться totalSupply", async function () {
        const initialTotalSupply = Number(await etherlockNFTFabricContract.totalSupply());
        const numOfContracts: number = 2;
        await etherlockNFTFabricContract.connect(user).createSmartContract(numOfContracts, { value: ethers.parseEther((numOfContracts * 0.001).toString()) });
        const finalTotalSupply = Number(await etherlockNFTFabricContract.totalSupply());
        expect(finalTotalSupply).to.equal(initialTotalSupply + numOfContracts);
    });

    it("Владелец должен иметь возможность выводить средства из контракта", async function () {
        const numOfContracts: number = 2;
        await etherlockNFTFabricContract.connect(user).createSmartContract(numOfContracts, { value: (numOfContracts * Number(contractPrice)).toString() });
        const initialOwnerBalance = await ethers.provider.getBalance(await owner.getAddress());
        await etherlockNFTFabricContract.withdraw((numOfContracts * Number(contractPrice)).toString());
        const finalOwnerBalance = await ethers.provider.getBalance(await owner.getAddress());
        expect(finalOwnerBalance).to.be.gt(initialOwnerBalance);
    });

    it("Должна произойти отмена транзакции, если отправляемая сумма некорректна", async function () {
        const numOfContracts: number = 2;
        await expect(etherlockNFTFabricContract.connect(user).createSmartContract(numOfContracts, { value: ((numOfContracts - 1) * Number(contractPrice)).toString() }))
            .to.be.revertedWith("Incorrect amount sent");
    });


    it("Должна быть ошибка, если не владелец пытается снять средства с контракта", async function () {
        await expect(etherlockNFTFabricContract.connect(user).withdraw(contractPrice))
            .to.be.revertedWith("Ownable: caller is not the owner");
    });
});