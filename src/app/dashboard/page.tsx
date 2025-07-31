"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { CampaignCard } from "@/components/CampaignCard";
import { formatCurrency, formatTimeRemaining } from "@/lib/campaignData";
import { Campaign } from "@/types/campaign";

// Mock user data
const mockUserCampaigns: Campaign[] = [
  {
    id: "user-camp-1",
    address: "0x1111111111111111111111111111111111111111",
    title: "Local Community Water Project",
    description:
      "Building wells and water filtration systems for rural communities in our region.",
    category: "clean-water",
    imageUrl:
      "https://images.unsplash.com/photo-1541877944-ac8a0f021e10?w=800&h=400&fit=crop",
    creator: "0x1234567890123456789012345678901234567890",
    creatorName: "Your Organization",
    targetAmount: BigInt("50000000000000000000"), // 50 ETH
    currentAmount: BigInt("23500000000000000000"), // 23.5 ETH
    minimumContribution: BigInt("5000000000000000"), // 0.005 ETH
    deadline: Date.now() + 60 * 24 * 60 * 60 * 1000,
    isActive: true,
    targetReached: false,
    contributorsCount: 187,
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    tags: ["water", "community", "local"],
    location: "Rural Kenya",
    urgency: "high",
  },
];

const mockContributions = [
  {
    id: "contrib-1",
    campaignId: "camp-1",
    campaignTitle: "Emergency Relief for Children in Crisis",
    amount: BigInt("100000000000000000"), // 0.1 ETH
    date: Date.now() - 5 * 24 * 60 * 60 * 1000,
    transactionHash:
      "0xabcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234",
    message: "Hope this helps the children in need.",
  },
  {
    id: "contrib-2",
    campaignId: "camp-2",
    campaignTitle: "Clean Water for Rural Communities",
    amount: BigInt("250000000000000000"), // 0.25 ETH
    date: Date.now() - 12 * 24 * 60 * 60 * 1000,
    transactionHash:
      "0xefgh5678901234efgh5678901234efgh5678901234efgh5678901234efgh5678",
    message: "Clean water is a basic human right.",
  },
  {
    id: "contrib-3",
    campaignId: "camp-3",
    campaignTitle: "Girls Education Initiative - South Asia",
    amount: BigInt("500000000000000000"), // 0.5 ETH
    date: Date.now() - 18 * 24 * 60 * 60 * 1000,
    transactionHash:
      "0xijkl9012345678ijkl9012345678ijkl9012345678ijkl9012345678ijkl9012",
    message: "Education empowers everyone.",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "my-campaigns" | "contributions" | "analytics"
  >("overview");

  const totalContributed =
    mockContributions.reduce(
      (sum, contrib) => sum + Number(contrib.amount),
      0
    ) / 1e18;
  const totalRaised = Number(mockUserCampaigns[0]?.currentAmount || 0) / 1e18;
  const activeCampaigns = mockUserCampaigns.filter((c) => c.isActive).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-xl text-gray-600">
            Manage your campaigns and track your contributions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { key: "overview", label: "Overview" },
              { key: "my-campaigns", label: "My Campaigns" },
              { key: "contributions", label: "My Contributions" },
              { key: "analytics", label: "Analytics" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors duration-200 ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Contributed
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(totalContributed)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💝</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Raised
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(totalRaised)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Active Campaigns
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {activeCampaigns}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Impact Score
                    </p>
                    <p className="text-2xl font-bold text-orange-600">8.7</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">💰</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      New contribution received
                    </p>
                    <p className="text-sm text-gray-600">
                      0.05 ETH contributed to your water project
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>

                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">📊</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Campaign milestone reached
                    </p>
                    <p className="text-sm text-gray-600">
                      Your campaign reached 50% of its funding goal
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>

                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">❤️</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      You contributed to a campaign
                    </p>
                    <p className="text-sm text-gray-600">
                      0.1 ETH contributed to Emergency Relief for Children
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">5 days ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "my-campaigns" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Campaigns</h2>
              <a
                href="/create"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Create New Campaign
              </a>
            </div>

            {mockUserCampaigns.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockUserCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-lg">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No campaigns yet
                </h3>
                <p className="text-gray-600 mb-8">
                  Start your first campaign and make a difference in the world
                </p>
                <a
                  href="/create"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Create Your First Campaign
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === "contributions" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              My Contributions
            </h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Campaign
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockContributions.map((contribution) => (
                      <tr key={contribution.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {contribution.campaignTitle}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-green-600 font-semibold">
                            {formatCurrency(Number(contribution.amount) / 1e18)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(contribution.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={`https://etherscan.io/tx/${contribution.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            {contribution.transactionHash.slice(0, 8)}...
                            {contribution.transactionHash.slice(-6)}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {contribution.message || "No message"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contribution Trends
                </h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <p className="text-gray-600">
                      Chart visualization would go here
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Campaign Performance
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-semibold text-gray-900">12.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Contribution</span>
                    <span className="font-semibold text-gray-900">
                      0.125 ETH
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Return Visitors</span>
                    <span className="font-semibold text-gray-900">34%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Social Shares</span>
                    <span className="font-semibold text-gray-900">156</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
