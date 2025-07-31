"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount, useBalance } from "wagmi";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CampaignCard } from "@/components/CampaignCard";
import { FEATURED_CAMPAIGNS, CAMPAIGN_CATEGORIES } from "@/lib/campaignData";
import Link from "next/link";

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  const featuredCampaigns = FEATURED_CAMPAIGNS.slice(0, 6); // Show more featured campaigns
  const categories = Object.entries(CAMPAIGN_CATEGORIES).slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Fund the Future,
            <br />
            <span className="text-yellow-300">Change the World</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Join the world's largest decentralized crowdfunding platform.
            Support verified campaigns from leading organizations and make a
            real impact with transparent, blockchain-powered donations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/campaigns">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105">
                Explore Campaigns
              </button>
            </Link>
            <Link href="/create">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105">
                Start a Campaign
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">
                $2.5M+
              </div>
              <div className="text-sm md:text-base opacity-80">
                Total Raised
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">
                15K+
              </div>
              <div className="text-sm md:text-base opacity-80">
                Contributors
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">
                500+
              </div>
              <div className="text-sm md:text-base opacity-80">Campaigns</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">
                95%
              </div>
              <div className="text-sm md:text-base opacity-80">
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Campaigns
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Support verified campaigns from leading international
              organizations making real impact worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                featured={true}
              />
            ))}
          </div>

          <div className="text-center">
            <Link href="/featured">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105">
                View All Featured Campaigns
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Campaign Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover campaigns across various categories and find causes that
              matter to you
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(([key, category]) => (
              <Link
                key={key}
                href={`/campaigns?category=${key}`}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of changemakers who are already using our platform to
            create positive impact. Whether you want to support a cause or start
            your own campaign, we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105">
                Start Your Campaign
              </button>
            </Link>
            <Link href="/campaigns">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105">
                Support a Cause
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
