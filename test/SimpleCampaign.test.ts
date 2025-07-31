import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre from "hardhat";

const { ethers } = hre;

describe("Enhanced Campaign Contracts", function () {
  async function deployCampaignFactoryFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    const factory = await CampaignFactory.deploy();

    return { factory, owner, addr1, addr2 };
  }

  describe("CampaignFactory", function () {
    it("Should create a new enhanced campaign", async function () {
      const { factory, addr1 } = await loadFixture(
        deployCampaignFactoryFixture
      );

      // Create campaign with enhanced parameters
      const tx = await factory.connect(addr1).createCampaign(
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
    });

    it("Should track deployed campaigns by creator", async function () {
      const { factory, addr1 } = await loadFixture(
        deployCampaignFactoryFixture
      );

      await factory
        .connect(addr1)
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
        .connect(addr1)
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
        addr1.address
      );
      expect(campaignsByCreator.length).to.equal(2);
    });
  });

  describe("Enhanced Campaign Features", function () {
    it("Should allow basic contributions", async function () {
      const { factory, addr1, addr2 } = await loadFixture(
        deployCampaignFactoryFixture
      );

      await factory
        .connect(addr1)
        .createCampaign(
          ethers.parseEther("0.01"),
          ethers.parseEther("1"),
          30,
          "Basic Campaign",
          "Campaign for testing basic features",
          "Technology",
          ""
        );

      const deployedCampaigns = await factory.getDeployedCampaigns();
      const campaignAddress = deployedCampaigns[0];

      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = Campaign.attach(campaignAddress);

      // Make a basic contribution
      const contributionAmount = ethers.parseEther("0.1");
      await expect(
        campaign.connect(addr2).contribute({ value: contributionAmount })
      ).to.emit(campaign, "ContributionMade");

      // Check balance
      const balance = await ethers.provider.getBalance(campaignAddress);
      expect(balance).to.equal(contributionAmount);
    });

    it("Should track campaign status", async function () {
      const { factory, addr1, addr2 } = await loadFixture(
        deployCampaignFactoryFixture
      );

      await factory
        .connect(addr1)
        .createCampaign(
          ethers.parseEther("0.01"),
          ethers.parseEther("1"),
          30,
          "Status Campaign",
          "Campaign for testing status",
          "Technology",
          ""
        );

      const deployedCampaigns = await factory.getDeployedCampaigns();
      const campaignAddress = deployedCampaigns[0];

      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = Campaign.attach(campaignAddress);

      // Check initial status
      const summary = await campaign.getSummary();
      expect(summary[0]).to.equal(ethers.parseEther("0.01")); // minimumContribution
      expect(summary[4]).to.equal(addr1.address); // manager
      expect(summary[5]).to.equal(ethers.parseEther("1")); // targetAmount
      expect(summary[7]).to.equal(true); // isActive
      expect(summary[8]).to.equal(false); // targetReached
      expect(summary[9]).to.equal(0); // totalRaised

      // Contribute 50% of target
      await campaign.connect(addr2).contribute({
        value: ethers.parseEther("0.5"),
      });

      // Check progress
      const progress = await campaign.getProgress();
      expect(progress).to.equal(50); // 50%

      // Check updated summary
      const updatedSummary = await campaign.getSummary();
      expect(updatedSummary[9]).to.equal(ethers.parseEther("0.5")); // totalRaised
    });

    it("Should detect when target is reached", async function () {
      const { factory, addr1, addr2 } = await loadFixture(
        deployCampaignFactoryFixture
      );

      await factory
        .connect(addr1)
        .createCampaign(
          ethers.parseEther("0.01"),
          ethers.parseEther("1"),
          30,
          "Target Campaign",
          "Campaign for testing target reached",
          "Education",
          ""
        );

      const deployedCampaigns = await factory.getDeployedCampaigns();
      const campaignAddress = deployedCampaigns[0];

      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = Campaign.attach(campaignAddress);

      // Contribute full target amount
      await expect(
        campaign.connect(addr2).contribute({
          value: ethers.parseEther("1"),
        })
      ).to.emit(campaign, "TargetReached");

      const summary = await campaign.getSummary();
      expect(summary[8]).to.equal(true); // targetReached
    });
  });

  describe("Spending Requests", function () {
    it("Should allow manager to create spending requests", async function () {
      const { factory, addr1, addr2 } = await loadFixture(
        deployCampaignFactoryFixture
      );

      await factory
        .connect(addr1)
        .createCampaign(
          ethers.parseEther("0.01"),
          ethers.parseEther("1"),
          30,
          "Request Campaign",
          "Campaign for testing requests",
          "Technology",
          ""
        );

      const deployedCampaigns = await factory.getDeployedCampaigns();
      const campaignAddress = deployedCampaigns[0];

      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = Campaign.attach(campaignAddress);

      // First, contribute to have funds
      await campaign.connect(addr2).contribute({
        value: ethers.parseEther("0.5"),
      });

      // Create spending request
      await expect(
        campaign
          .connect(addr1)
          .createRequest(
            "Buy development equipment",
            ethers.parseEther("0.1"),
            addr1.address
          )
      ).to.emit(campaign, "RequestCreated");

      const requestsCount = await campaign.getRequestsCount();
      expect(requestsCount).to.equal(1);
    });

    it("Should allow contributors to approve requests", async function () {
      const { factory, addr1, addr2 } = await loadFixture(
        deployCampaignFactoryFixture
      );

      await factory
        .connect(addr1)
        .createCampaign(
          ethers.parseEther("0.01"),
          ethers.parseEther("1"),
          30,
          "Approval Campaign",
          "Campaign for testing approvals",
          "Technology",
          ""
        );

      const deployedCampaigns = await factory.getDeployedCampaigns();
      const campaignAddress = deployedCampaigns[0];

      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = Campaign.attach(campaignAddress);

      // Contribute
      await campaign.connect(addr2).contribute({
        value: ethers.parseEther("0.5"),
      });

      // Create request
      await campaign
        .connect(addr1)
        .createRequest(
          "Marketing expenses",
          ethers.parseEther("0.1"),
          addr1.address
        );

      // Approve request
      await expect(campaign.connect(addr2).approveRequest(0)).to.emit(
        campaign,
        "RequestApproved"
      );

      const hasApproved = await campaign.hasApproved(0, addr2.address);
      expect(hasApproved).to.equal(true);
    });
  });
});
