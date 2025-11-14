const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("JRiojasIronMindCreationsNFTContract", async function () {
  let JRiojasIronMindCreationsNFTContractFactory;
  let jriojasIronMindCreationsNFTContract;
  let args = {
    mint_price: "20000000000000000", // 0.02 ETH
    max_tokens: 3,
    base_token_uri: "ipfs.io/ipfs/bafkreidr5a7hvyiilxfug2yqpbkdowcahpbsw4jszstz6iur5ae5dx7b54",
    royaltyArtist: "0x94848CEe6eA7dBcc5322f0B13015A42ec63bC3BB",
    royaltyBasis: 500,
  };
  this.beforeEach(async function () {
    JRiojasIronMindCreationsNFTContractFactory = await ethers.getContractFactory(
      "JRiojasIronMindCreationsNFTContract"
    );
    JRiojasIronMindCreationsNFTContract = await JRiojasIronMindCreationsNFTContractFactory.deploy(
      args.mint_price,
      args.max_tokens,
      args.base_token_uri,
      args.royaltyArtist,
      args.royaltyBasis
    );
    await JRiojasIronMindCreationsNFTContract.waitForDeployment(
        args.mint_price,
        args.max_tokens,
        args.base_token_uri,
        args.royaltyArtist,
        args.royaltyBasis   
    );
  });
  describe("construction and initialization", async function () {
    this.beforeEach(async function () {
        JRiojasIronMindCreationsNFTContractFactory = await ethers.getContractFactory(
          "JRiojasIronMindCreationsNFTContract"
        );
        JRiojasIronMindCreationsNFTContract = await JRiojasIronMindCreationsNFTContractFactory.deploy(
          args.mint_price,
          args.max_tokens,
          args.base_uri,
          args.royaltyArtist,
          args.royaltyBasis
        );
    });

    it("should be named JRiojasIronMindCreationsNFTContract", async function () {
        const expectedValue = "JRiojasIronMindCreationsNFTContract";
        const currentValue = await JRiojasIronMindCreationsNFTContract.name();
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("should have symbol JRIMC", async function () {
        const expectedValue = "JRIMC";
        const currentValue = await JRiojasIronMindCreationsNFTContract.symbol();
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("should have a mint price set when constructed", async function () {
        const expectedValue = args.mint_price;
        const currentValue = await JRiojasIronMindCreationsNFTContract.getMintPrice();
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("should have a max tokens set when constructed", async function () {
        const expectedValue = args.max_tokens;
        const currentValue = await JRiojasIronMindCreationsNFTContract.getMaxSupply();
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("should have a base URI set when constructed", async function () {
        const expectedValue = args.base_uri;
        const currentValue = await JRiojasIronMindCreationsNFTContract.getBaseURI();
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("should set royalty artist when constructed", async function () {
        let tokenID = 1;
        const expectedValue = args.royaltyArtist;
        const royaltyInfo = await JRiojasIronMindCreationsNFTContract.royaltyInfo(
          1,
          ethers.parseUnits("0.02", "ether")
        );
        assert.equal(currentValue[0].toString(), expectedValue);
    });

    it("should set royalty share when constructed", async function () {
        const expectedValue = (args.royaltyBasis * args.mint_price) / 10000;
        const currentValue = await JRiojasIronMindCreationsNFTContract.royaltyInfo(
            1,
            ethers.parseUnits("0.02", "ether")
        );
        assert.equal(currentValue[1].toString(), expectedValue);
    });

    it("should set owner to deployer's address when constructed", async function () {
        const expectedValue = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        const currentValue = await JRiojasIronMindCreationsNFTContract.owner();
        assert.equal(currentValue.toString(), expectedValue);
    });
});
describe("receive function", async function () {
    this.beforeEach(async function () {
        JRiojasIronMindCreationsNFTContractFactory = await ethers.getContractFactory(
          "JRiojasIronMindCreationsNFTContract"
        );
        JRiojasIronMindCreationsNFTContract = await JRiojasIronMindCreationsNFTContractFactory.deploy(
          args.mint_price,
          args.max_tokens,
          args.base_uri,
          args.royaltyArtist,
          args.royaltyBasis
        );
        await JRiojasIronMindCreationsNFTContract.waitForDeployment(
            args.mint_price,
            args.max_tokens,
            args.base_uri,
            args.royaltyArtist,
            args.royaltyBasis   
        );
    });

    it("should be called and revert if called from low-level transaction", async function () {
        let contractAddress = await JRiojasIronMindCreationsNFTContract.getAddress();
        const [owner, artist, buyer] = await ethers.getSigners();
        expect(
            buyer.sendTransaction({
                to: contractAddress,
                value: ethers.parseUnits("2.0", "ether"),
            })
        ).to.be.revertedWithCustomError;
        });
    });

    describe("fallback function", async function () {
        this.beforeEach(async function () {
            JRiojasIronMindCreationsNFTContractFactory = await ethers.getContractFactory(
              "JRiojasIronMindCreationsNFTContract"
            );
            JRiojasIronMindCreationsNFTContract = await JRiojasIronMindCreationsNFTContractFactory.deploy(
              args.mint_price,
              args.max_tokens,
              args.base_uri,
              args.royaltyArtist,
              args.royaltyBasis
            );
            await JRiojasIronMindCreationsNFTContract.waitForDeployment(
