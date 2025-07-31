"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { ContributeModal } from "@/components/ContributeModal";
import {
  FEATURED_CAMPAIGNS,
  formatCurrency,
  formatTimeRemaining,
} from "@/lib/campaignData";
import { Campaign } from "@/types/campaign";

// Mock campaign data for demonstration
const mockCampaignDetail: Campaign = {
  id: "camp-detail-1",
  address: "0x0000000000000000000000000000000000000001",
  title: "Emergency Relief for Children in Crisis",
  description:
    "UNICEF is working around the clock to provide life-saving support to children and families affected by humanitarian crises worldwide. Your contribution will help provide clean water, nutritious food, medical care, education materials, and emergency shelter to children who need it most.",
  category: "childrens-rights",
  imageUrl:
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop",
  creator: "0x1234567890123456789012345678901234567890",
  creatorName: "UNICEF",
  targetAmount: BigInt("1000000000000000000000"), // 1000 ETH
  currentAmount: BigInt("678000000000000000000"), // 678 ETH
  minimumContribution: BigInt("5000000000000000"), // 0.005 ETH
  deadline: Date.now() + 45 * 24 * 60 * 60 * 1000,
  isActive: true,
  targetReached: false,
  contributorsCount: 12567,
  createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
  tags: ["children", "emergency", "unicef", "humanitarian"],
  location: "Global",
  urgency: "critical",
  longDescription: `
    <h3>The Situation</h3>
    <p>Millions of children around the world are facing unprecedented challenges due to conflicts, natural disasters, and humanitarian crises. These vulnerable children lack access to basic necessities like clean water, nutritious food, healthcare, and education.</p>
    
    <h3>Our Response</h3>
    <p>UNICEF is on the ground in over 190 countries and territories, working tirelessly to:</p>
    <ul>
      <li>Provide emergency water, sanitation, and hygiene services</li>
      <li>Deliver life-saving medical care and nutrition support</li>
      <li>Ensure children can continue their education even in crisis</li>
      <li>Protect children from violence, exploitation, and abuse</li>
      <li>Reunite separated children with their families</li>
    </ul>
    
    <h3>Your Impact</h3>
    <p>Every contribution makes a difference:</p>
    <ul>
      <li><strong>$50</strong> - Provides clean water for a family of 5 for one month</li>
      <li><strong>$100</strong> - Supplies therapeutic food for 10 malnourished children</li>
      <li><strong>$250</strong> - Delivers education materials for 50 children</li>
      <li><strong>$500</strong> - Provides emergency medical care for 25 children</li>
    </ul>
  `,
  updates: [
    {
      id: "update-1",
      title: "Emergency Response in East Africa",
      content:
        "We have deployed emergency teams to provide immediate assistance to children affected by the recent crisis in East Africa. Over 5,000 children have received clean water and medical care.",
      date: Date.now() - 7 * 24 * 60 * 60 * 1000,
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=300&fit=crop",
    },
    {
      id: "update-2",
      title: "Education Program Launch",
      content:
        "We have successfully launched our mobile education program, bringing learning opportunities directly to displaced children in refugee camps.",
      date: Date.now() - 14 * 24 * 60 * 60 * 1000,
      imageUrl:
        "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=300&fit=crop",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=400&fit=crop",
  ],
};

export default function CampaignDetailPage() {
  const params = useParams();
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "about" | "updates" | "contributors"
  >("about");
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<
    string | null
  >(null);

  // In a real app, you would fetch the campaign data based on params.id
  const campaign = mockCampaignDetail;

  const progressPercentage = Number(
    (campaign.currentAmount * BigInt(100)) / campaign.targetAmount
  );
  const timeRemaining = formatTimeRemaining(campaign.deadline);
  const progressWidth = Math.min(progressPercentage, 100);

  // Progress bar component for dynamic width
  const ProgressBar = ({ percentage }: { percentage: number }) => (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
      {/* eslint-disable-next-line */}
      <div
        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campaign Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={campaign.imageUrl}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      campaign.urgency === "critical"
                        ? "bg-red-500"
                        : campaign.urgency === "high"
                        ? "bg-orange-500"
                        : campaign.urgency === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {campaign.urgency.toUpperCase()} URGENCY
                  </span>
                  <span className="text-sm opacity-90">
                    {campaign.location}
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-2">{campaign.title}</h1>
                <p className="text-lg opacity-90">by {campaign.creatorName}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex border-b border-gray-200 mb-6">
                {[
                  { key: "about", label: "About" },
                  {
                    key: "updates",
                    label: `Updates (${campaign.updates?.length || 0})`,
                  },
                  {
                    key: "contributors",
                    label: `Contributors (${campaign.contributorsCount})`,
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-6 py-3 font-semibold border-b-2 transition-colors duration-200 ${
                      activeTab === tab.key
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "about" && (
                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {campaign.description}
                    </p>
                  </div>

                  {campaign.longDescription && (
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: campaign.longDescription,
                      }}
                    />
                  )}

                  {/* Gallery */}
                  {campaign.gallery && campaign.gallery.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Photo Gallery
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {campaign.gallery.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedGalleryImage(image)}
                            className="relative h-32 rounded-lg overflow-hidden hover:opacity-80 transition-opacity duration-200"
                          >
                            <img
                              src={image}
                              alt={`Gallery image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {campaign.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "updates" && (
                <div className="space-y-6">
                  {campaign.updates && campaign.updates.length > 0 ? (
                    campaign.updates.map((update) => (
                      <div
                        key={update.id}
                        className="border-b border-gray-200 pb-6 last:border-b-0"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {update.title}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {new Date(update.date).toLocaleDateString()}
                          </span>
                        </div>
                        {update.imageUrl && (
                          <img
                            src={update.imageUrl}
                            alt={update.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        )}
                        <p className="text-gray-700">{update.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No updates available yet.</p>
                  )}
                </div>
              )}

              {activeTab === "contributors" && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    This campaign has received support from{" "}
                    {campaign.contributorsCount} contributors.
                  </p>
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">👥</div>
                    <p className="text-gray-500">
                      Contributor details are private for security reasons.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(Number(campaign.currentAmount) / 1e18)}
                  </span>
                  <span className="text-sm text-gray-600">
                    of {formatCurrency(Number(campaign.targetAmount) / 1e18)}{" "}
                    goal
                  </span>
                </div>
                <ProgressBar percentage={progressWidth} />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{progressPercentage.toFixed(1)}% funded</span>
                  <span>{timeRemaining}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {campaign.contributorsCount}
                  </div>
                  <div className="text-sm text-gray-600">Contributors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.floor(
                      (Date.now() - campaign.createdAt) / (24 * 60 * 60 * 1000)
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Days Running</div>
                </div>
              </div>

              <button
                onClick={() => setIsContributeModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
              >
                Contribute Now
              </button>

              <div className="text-xs text-gray-500 text-center">
                Minimum contribution:{" "}
                {(Number(campaign.minimumContribution) / 1e18).toFixed(3)} ETH
              </div>
            </div>

            {/* Campaign Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Campaign Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Creator</span>
                  <span className="font-medium text-gray-900">
                    {campaign.creatorName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-gray-900">
                    {campaign.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium text-gray-900">
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deadline</span>
                  <span className="font-medium text-gray-900">
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Share This Campaign
              </h3>
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  Twitter
                </button>
                <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  Facebook
                </button>
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contribute Modal */}
      {isContributeModalOpen && (
        <ContributeModal
          campaign={campaign}
          onClose={() => setIsContributeModalOpen(false)}
        />
      )}

      {/* Gallery Modal */}
      {selectedGalleryImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl z-10"
            >
              ✕
            </button>
            <img
              src={selectedGalleryImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
