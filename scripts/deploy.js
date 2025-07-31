// Standard Hardhat deployment script for a single contract
const hre = require("hardhat");

async function main() {
  // Replace 'CampaignFactory' with your contract name if different
  const Contract = await hre.ethers.getContractFactory("CampaignFactory");
  const contract = await Contract.deploy();
  await contract.waitForDeployment();
  console.log("Contract deployed to:", await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
