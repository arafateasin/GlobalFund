import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { CampaignFactory__factory } from "../typechain-types/factories/Campaign.sol/CampaignFactory__factory.js";
import { Campaign__factory } from "../typechain-types/factories/Campaign.sol/Campaign__factory.js";

const { ethers } = hre;

describe("Enhanced Campaign Contracts", function () {
  async function deployCampaignFactoryFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const CampaignFactory = new CampaignFactory__factory(owner);
    const factory = await CampaignFactory.deploy();

    return { factory, owner, addr1, addr2 };
  }

  describe("CampaignFactory", function () {
    it("Should create a new enhanced campaign", async function () {
      const { factory, addr1 } = await loadFixture(
        deployCampaignFactoryFixture
      );

      // Create campaign with enhanced parameters
      await factory.connect(addr1).createCampaign(
        ethers.parseEther("0.01"), // minimum contribution
        ethers.parseEther("10"), // target amount
        30, // duration in days
        "Test Campaign", // title
        "A test campaign for crowdfunding", // description
        "Technology", // category
        "https://example.com/image.jpg" // image URL
      );

      const deployedCampaigns = await factory.getDeployedCampaigns();
      expect(deployedCampaigns.length).to.equal(1);

      const campaignCount = await factory.getCampaignCount();
      expect(campaignCount).to.equal(1);
    });

    it("Should track deployed campaigns", async function () {
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
    it("Should return campaign details", async function () {
      const { factory, addr1 } = await loadFixture(
        deployCampaignFactoryFixture
      );

      await factory
        .connect(addr1)
        .createCampaign(
          ethers.parseEther("0.01"),
          ethers.parseEther("10"),
          30,
          "Detailed Campaign",
          "A campaign with detailed information",
          "Art",
          "https://example.com/art.jpg"
        );

      const deployedCampaigns = await factory.getDeployedCampaigns();
      const campaignAddress = deployedCampaigns[0];

      const campaign = Campaign__factory.connect(campaignAddress, addr1);

      const details = await campaign.getCampaignDetails();
      expect(details[0]).to.equal("Detailed Campaign");
      expect(details[1]).to.equal("A campaign with detailed information");
      expect(details[2]).to.equal("Art");
      expect(details[3]).to.equal("https://example.com/art.jpg");
    });

    it("Should return enhanced summary", async function () {
      const { factory, addr1 } = await loadFixture(
        deployCampaignFactoryFixture
      );

      await factory
        .connect(addr1)
        .createCampaign(
          ethers.parseEther("0.01"),
          ethers.parseEther("10"),
          30,
          "Summary Campaign",
          "Campaign for testing summary",
          "Technology",
          ""
        );

      const deployedCampaigns = await factory.getDeployedCampaigns();
      const campaignAddress = deployedCampaigns[0];

      const campaign = Campaign__factory.connect(campaignAddress, addr1);

      const summary = await campaign.getSummary();
      expect(summary[0]).to.equal(ethers.parseEther("0.01")); // minimumContribution
      expect(summary[4]).to.equal(addr1.address); // manager
      expect(summary[5]).to.equal(ethers.parseEther("10")); // targetAmount
      expect(summary[7]).to.equal(true); // isActive
      expect(summary[8]).to.equal(false); // targetReached
      expect(summary[9]).to.equal(0); // totalRaised
    });

    it("Should allow contributions with messages", async function () {
      const { factory, addr1, addr2 } = await loadFixture(
        deployCampaignFactoryFixture
      );

      await factory
        .connect(addr1)
        .createCampaign(
          ethers.parseEther("0.01"),
          ethers.parseEther("1"),
          30,
          "Message Campaign",
          "Campaign for testing messages",
          "Community",
          ""
        );

      const deployedCampaigns = await factory.getDeployedCampaigns();
      const campaignAddress = deployedCampaigns[0];

      const campaign = Campaign__factory.connect(campaignAddress, addr2);

      // Contribute with message
      await expect(
        campaign["contribute(string)"]("Great project! Keep it up!", {
          value: ethers.parseEther("0.1"),
        })
      ).to.emit(campaign, "ContributionMade");

      const history = await campaign.getContributorHistory(addr2.address);
      expect(history[0][0]).to.equal(ethers.parseEther("0.1")); // amount
      expect(history[2][0]).to.equal("Great project! Keep it up!"); // message
    });

    it("Should track progress correctly", async function () {
      const { factory, addr1, addr2 } = await loadFixture(
        deployCampaignFactoryFixture
      );

      await factory
        .connect(addr1)
        .createCampaign(
          ethers.parseEther("0.01"),
          ethers.parseEther("1"),
          30,
          "Progress Campaign",
          "Campaign for testing progress",
          "Technology",
          ""
        );

      const deployedCampaigns = await factory.getDeployedCampaigns();
      const campaignAddress = deployedCampaigns[0];

      const campaign = Campaign__factory.connect(campaignAddress, addr2);

      // Contribute 50% of target
      await campaign["contribute()"]({
        value: ethers.parseEther("0.5"),
      });

      const progress = await campaign.getProgress();
      expect(progress).to.equal(50); // 50%

      const summary = await campaign.getSummary();
      expect(summary[9]).to.equal(ethers.parseEther("0.5")); // totalRaised
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

      const campaign = Campaign__factory.connect(campaignAddress, addr2);

      // Contribute full target amount
      await expect(
        campaign["contribute()"]({
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

      const campaign = Campaign__factory.connect(campaignAddress, addr1);

      // First, contribute to have funds
      await campaign.connect(addr2)["contribute()"]({
        value: ethers.parseEther("0.5"),
      });

      // Create spending request
      await expect(
        campaign.createRequest(
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

      const campaign = Campaign__factory.connect(campaignAddress, addr1);

      // Contribute
      await campaign.connect(addr2)["contribute()"]({
        value: ethers.parseEther("0.5"),
      });

      // Create request
      await campaign.createRequest(
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
