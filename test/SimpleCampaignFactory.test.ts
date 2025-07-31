import { expect } from "chai";
import hre from "hardhat";

const { ethers } = hre;

describe("Simple Campaign Factory", function () {
  it("Should deploy the SimpleCampaignFactory contract", async function () {
    const [owner] = await ethers.getSigners();

    const SimpleCampaignFactory = await ethers.getContractFactory(
      "SimpleCampaignFactory"
    );
    const factory = await SimpleCampaignFactory.deploy();

    expect(await factory.getAddress()).to.be.a("string");
    console.log(
      "SimpleCampaignFactory deployed to:",
      await factory.getAddress()
    );
  });

  it("Should create a new simple campaign", async function () {
    const [owner, user1] = await ethers.getSigners();

    const SimpleCampaignFactory = await ethers.getContractFactory(
      "SimpleCampaignFactory"
    );
    const factory = await SimpleCampaignFactory.deploy();

    // Create a campaign
    const tx = await factory.connect(user1).createCampaign(
      ethers.parseEther("0.01"), // minimum contribution
      ethers.parseEther("10"), // target amount
      30 // duration in days
    );

    await tx.wait();

    const deployedCampaigns = await factory.getDeployedCampaigns();
    expect(deployedCampaigns.length).to.equal(1);

    const campaignCount = await factory.getCampaignCount();
    expect(campaignCount).to.equal(1);

    console.log("Simple Campaign created at:", deployedCampaigns[0]);
  });

  it("Should allow contributions to the campaign", async function () {
    const [owner, user1, user2] = await ethers.getSigners();

    const SimpleCampaignFactory = await ethers.getContractFactory(
      "SimpleCampaignFactory"
    );
    const factory = await SimpleCampaignFactory.deploy();

    // Create a campaign
    await factory
      .connect(user1)
      .createCampaign(ethers.parseEther("0.01"), ethers.parseEther("1"), 30);

    const deployedCampaigns = await factory.getDeployedCampaigns();
    const campaignAddress = deployedCampaigns[0];

    const SimpleCampaign = await ethers.getContractFactory("SimpleCampaign");
    const campaign = SimpleCampaign.attach(campaignAddress);

    // Make a contribution
    const contributionAmount = ethers.parseEther("0.1");
    await expect(
      campaign.connect(user2).contribute({ value: contributionAmount })
    ).to.emit(campaign, "ContributionMade");

    // Check campaign balance
    const balance = await ethers.provider.getBalance(campaignAddress);
    expect(balance).to.equal(contributionAmount);

    // Check summary
    const summary = await campaign.getSummary();
    expect(summary[0]).to.equal(ethers.parseEther("0.01")); // minimumContribution
    expect(summary[1]).to.equal(contributionAmount); // balance
    expect(summary[4]).to.equal(user1.address); // manager
    expect(summary[5]).to.equal(ethers.parseEther("1")); // targetAmount

    console.log("Campaign balance:", ethers.formatEther(balance), "ETH");
  });

  it("Should detect when target is reached", async function () {
    const [owner, user1, user2] = await ethers.getSigners();

    const SimpleCampaignFactory = await ethers.getContractFactory(
      "SimpleCampaignFactory"
    );
    const factory = await SimpleCampaignFactory.deploy();

    // Create a campaign with small target
    await factory.connect(user1).createCampaign(
      ethers.parseEther("0.01"),
      ethers.parseEther("0.5"), // Small target
      30
    );

    const deployedCampaigns = await factory.getDeployedCampaigns();
    const campaignAddress = deployedCampaigns[0];

    const SimpleCampaign = await ethers.getContractFactory("SimpleCampaign");
    const campaign = SimpleCampaign.attach(campaignAddress);

    // Contribute to reach target
    await expect(
      campaign.connect(user2).contribute({ value: ethers.parseEther("0.6") })
    ).to.emit(campaign, "TargetReached");

    const summary = await campaign.getSummary();
    expect(summary[8]).to.equal(true); // targetReached

    const progress = await campaign.getProgress();
    expect(progress).to.be.greaterThan(100); // Over 100%

    console.log("Progress:", progress.toString(), "%");
  });

  it("Should allow creating and approving spending requests", async function () {
    const [owner, user1, user2] = await ethers.getSigners();

    const SimpleCampaignFactory = await ethers.getContractFactory(
      "SimpleCampaignFactory"
    );
    const factory = await SimpleCampaignFactory.deploy();

    // Create a campaign
    await factory
      .connect(user1)
      .createCampaign(ethers.parseEther("0.01"), ethers.parseEther("1"), 30);

    const deployedCampaigns = await factory.getDeployedCampaigns();
    const campaignAddress = deployedCampaigns[0];

    const SimpleCampaign = await ethers.getContractFactory("SimpleCampaign");
    const campaign = SimpleCampaign.attach(campaignAddress);

    // First, contribute to have funds
    await campaign
      .connect(user2)
      .contribute({ value: ethers.parseEther("0.5") });

    // Create spending request
    await expect(
      campaign
        .connect(user1)
        .createRequest(
          "Buy development equipment",
          ethers.parseEther("0.1"),
          user1.address
        )
    ).to.emit(campaign, "RequestCreated");

    const requestsCount = await campaign.getRequestsCount();
    expect(requestsCount).to.equal(1);

    // Approve request
    await expect(campaign.connect(user2).approveRequest(0)).to.emit(
      campaign,
      "RequestApproved"
    );

    console.log("Spending request created and approved successfully");
  });
});
