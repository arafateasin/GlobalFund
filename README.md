# Crowd-Funding DApp

This is a decentralized crowdfunding platform built with [Next.js](https://nextjs.org), Solidity smart contracts, and web3 wallet integration. Users can create, browse, and contribute to campaigns transparently on the blockchain.

## Features

- Create and manage fundraising campaigns
- Browse and search featured and global campaigns
- Contribute securely with your crypto wallet (ConnectKit, wagmi)
- View campaign progress, contributors, and updates
- Responsive UI for desktop and mobile

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Smart Contracts

Solidity contracts are located in the `contracts/` directory. You can deploy and test them using Hardhat:

```bash
npm install
npx hardhat test
```

---

**Project maintained by [arafateasin](https://github.com/arafateasin).**
