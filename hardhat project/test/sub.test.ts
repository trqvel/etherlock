import { Signer } from "ethers";
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('SubscriptionContract', function () {
    let owner: Signer;
    let user: Signer;
    let addr1: any; 
    let addrs: any; 
    let subscriptionContract: any;
    let deployBlockNumber: number;

    beforeEach(async function () {
        [owner, user, addr1, ...addrs] = await ethers.getSigners();
        const SubscriptionContract = await ethers.getContractFactory('Subscription');
        subscriptionContract = await SubscriptionContract.deploy(10000000);
        deployBlockNumber = (await ethers.provider.getBlockNumber()) - 1;
    });

    it('Развертывание должно установить правильного владельца и начальные значения', async function () {
      expect(await subscriptionContract.owner()).to.equal(await owner.getAddress());
      expect(await subscriptionContract.subscriptionFee()).to.equal(ethers.parseEther('0.01'));
      expect(await subscriptionContract.lastPaymentDate());
    });

    it("В случае отправки неверной суммы необходимо произвести возврат или если подписка уже оплачена", async function () {
      await expect(subscriptionContract.connect(addr1).paySubscription({ value: ethers.parseEther("0.005") }))
        .to.be.revertedWith("Incorrect amount sent");
    });
        
    it("Должен установить правильного владельца", async function () {
      expect(await subscriptionContract.owner()).to.equal(await owner.getAddress());
    });
  
    it("Необходимо установить правильную абонентскую плату", async function () {
      expect(await subscriptionContract.subscriptionFee()).to.equal(ethers.parseEther("0.01"));
    });

    it("Владелец должен иметь возможность выводить средства из контракта", async function () {
        const paymentAmount = ethers.parseEther("0.01");
        const alreadyPaid = await subscriptionContract.isPaidForCurrentMonth();
        if (alreadyPaid) {
            this.skip();
        }
        const initialOwnerBalance = await ethers.provider.getBalance(await owner.getAddress());
        await subscriptionContract.connect(addr1).paySubscription({ value: paymentAmount });
        const withdrawTx = await subscriptionContract.connect(owner).withdrawFunds();
        await expect(withdrawTx).to.emit(subscriptionContract, "FundsWithdrawn");
        expect(await subscriptionContract.balance()).to.equal(0);
        const finalOwnerBalance = await ethers.provider.getBalance(await owner.getAddress());
        expect(finalOwnerBalance).to.be.gt(initialOwnerBalance);
    });
});
