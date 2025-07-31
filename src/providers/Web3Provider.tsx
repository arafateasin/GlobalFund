"use client";

import { createConfig, http, WagmiProvider } from "wagmi";
import { hardhat, localhost, sepolia, mainnet } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { useState, useEffect } from "react";

// Get project ID from environment variable
const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "your-project-id";

// Create wagmi config manually
const config = createConfig({
  chains: [hardhat, localhost, sepolia, mainnet],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId,
      metadata: {
        name: "Crowdfunding DApp",
        description: "A modern crowdfunding platform built on Ethereum",
        url: "https://your-app-url.com",
        icons: ["https://your-app-icon.com/icon.png"],
      },
    }),
  ],
  transports: {
    [hardhat.id]: http(),
    [localhost.id]: http(),
    [sepolia.id]: http(
      `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
    ),
    [mainnet.id]: http(
      `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
    ),
  },
  ssr: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>{children}</div>;
  }
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="auto"
          mode="light"
          customTheme={{
            "--ck-connectbutton-font-size": "16px",
            "--ck-connectbutton-border-radius": "8px",
            "--ck-primary-button-color": "#3b82f6",
            "--ck-primary-button-background": "#ffffff",
            "--ck-primary-button-border-radius": "8px",
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export { config };
