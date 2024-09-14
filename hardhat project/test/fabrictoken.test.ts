import { Signer } from "ethers";
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MyContractFactory', function () {
    let owner: Signer;
    let user: Signer;
    let MyContractFactory: any;
    let MyContract:any;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();
        const MyContractFactoryContract = await ethers.getContractFactory('MyContractFactory');
        MyContractFactory = await MyContractFactoryContract.deploy();
        const MyContractC = await ethers.getContractFactory('MyContract');
        MyContract = await MyContractC.deploy(await owner.getAddress());
    });

    it("Ошибка при создании контракта с неправильным количеством эфира", async function () {
        let numberOfContracts = 5;
        let cost = ethers.parseEther("1.0");

        await expect(MyContractFactory.connect(user).createContracts(numberOfContracts, { value: cost })
        ).to.be.revertedWith("You need to send the correct amount of ether");
    });

    it('Должен создавать контракт для пользователя', async function () {
        let numberOfContracts = 1;
        let value = ethers.parseEther('0.001');

        await MyContractFactory.connect(user).createContracts(numberOfContracts, { value });
        
        const userContractsAddress = await MyContractFactory.userToContracts(user.getAddress());
        
        expect(await userContractsAddress[0]).to.not.equal(undefined);
    });

    it("Должна быть ошибка, если не владелец пытается снять средства с контракта", async function () {
        const contractAddress = await MyContractFactory.userToContracts(await user.getAddress())[0];
        await expect(MyContractFactory.connect(user).withdrawFromContract(contractAddress, 1)
        ).to.be.revertedWith("Only the owner can withdraw funds");
    });
});
