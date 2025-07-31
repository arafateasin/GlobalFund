import { expect } from "chai";
import hre from "hardhat";

const { ethers } = hre;

describe("Enhanced Campaign Factory", function () {
  it("Should deploy the CampaignFactory contract", async function () {
    const [owner] = await ethers.getSigners();

    const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    const factory = await CampaignFactory.deploy();

    expect(await factory.getAddress()).to.be.a("string");
    console.log("CampaignFactory deployed to:", await factory.getAddress());
  });

  it("Should create a new campaign", async function () {
    const [owner, user1] = await ethers.getSigners();

    const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    const factory = await CampaignFactory.deploy();

    // Create a campaign
    const tx = await factory.connect(user1).createCampaign(
      ethers.parseEther("0.01"), // minimum contribution
      ethers.parseEther("10"), // target amount
      30, // duration in days
      "Test Campaign", // title
      "A test campaign for crowdfunding", // description
      "Technology", // category
      "https://example.com/image.jpg" // image URL
    );

    await tx.wait();

    const deployedCampaigns = await factory.getDeployedCampaigns();
    expect(deployedCampaigns.length).to.equal(1);

    const campaignCount = await factory.getCampaignCount();
    expect(campaignCount).to.equal(1);

    console.log("Campaign created at:", deployedCampaigns[0]);
  });

  it("Should track campaigns by creator", async function () {
    const [owner, user1] = await ethers.getSigners();

    const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    const factory = await CampaignFactory.deploy();

    // Create two campaigns
    await factory
      .connect(user1)
      .createCampaign(
        ethers.parseEther("0.01"),
        ethers.parseEther("5"),
        15,
        "Campaign 1",
        "First campaign",
        "Education",
        ""
      );

    await factory
      .connect(user1)
      .createCampaign(
        ethers.parseEther("0.05"),
        ethers.parseEther("15"),
        45,
        "Campaign 2",
        "Second campaign",
        "Healthcare",
        ""
      );

    const campaignsByCreator = await factory.getCampaignsByCreator(
      user1.address
    );
    expect(campaignsByCreator.length).to.equal(2);

    console.log("Campaigns by creator:", campaignsByCreator.length);
  });
});
