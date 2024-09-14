import { Signer } from "ethers";
import { expect } from 'chai';
import { ethers } from 'hardhat';


describe('NftContract', function () {
    let owner: Signer;
    let user: Signer;
    let addr1: any; 
    let nftContract: any;

    beforeEach(async function () {
        [owner, user, addr1] = await ethers.getSigners();
        const NftContract = await ethers.getContractFactory('Nft');
        nftContract = await NftContract.deploy("ipfs://QmYdqy4AwbdK6jUB3ae7evJBcnNnut89jEjnELowX2uyZk");
    });

    it('Должен установить правильного владельца', async function () {
      expect(await nftContract.owner()).to.equal(await owner.getAddress());
    });

    it('Должен установить правильный baseTokenURI', async function () {
        expect(await nftContract.baseTokenURI()).to.equal("ipfs://QmYdqy4AwbdK6jUB3ae7evJBcnNnut89jEjnELowX2uyZk");
    });

    it('BaseURI должен обновляться, когда владелец задает его значения', async function () {
        await nftContract.setBaseURI("ipfs://QmR1gafbsd2yXwtBTEEikjeRB7Sz5NMs3FG4uwsn269rmw");
        expect(await nftContract.baseTokenURI()).to.equal("ipfs://QmR1gafbsd2yXwtBTEEikjeRB7Sz5NMs3FG4uwsn269rmw");
    });    

    it('Должна быть ошибка, если при mint NFT не отправляется достаточно эфира', async function () {
        await nftContract.setMaxSupply(100);
        await expect(
            nftContract
                .connect(user)
                .mintNFTs(5, {value: ethers.parseEther('0.004')})
        ).to.be.revertedWith("Not enough ether to purchase NFTs.");
    });

    it('Владелец должен иметь возможность выводить средства из контракта', async function () {
        await nftContract.setMaxSupply(200);
        
        await nftContract.connect(user).mintNFTs(1, {value: ethers.parseEther('0.001')});
    
        const initialBalance = await ethers.provider.getBalance(owner.getAddress());
        
        await nftContract.withdraw();
    
        const finalBalance = await ethers.provider.getBalance(owner.getAddress());
        expect(parseInt(ethers.formatEther(finalBalance)))
          .to.be.gte(parseInt(ethers.formatEther(initialBalance)));
    });
    
});
