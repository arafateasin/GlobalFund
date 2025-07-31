"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { CampaignCard, CampaignCardSkeleton } from "@/components/CampaignCard";
import {
  FEATURED_CAMPAIGNS,
  ALL_CAMPAIGNS,
  CAMPAIGN_CATEGORIES,
} from "@/lib/campaignData";
import { Campaign, CampaignCategory } from "@/types/campaign";

// Mock additional campaigns for demonstration
const mockCampaigns: Campaign[] = [
  {
    id: "camp-1",
    address: "0x0000000000000000000000000000000000000004",
    title: "Clean Water for Rural Communities",
    description:
      "Providing access to clean and safe drinking water for rural communities in developing countries through sustainable well construction and water purification systems.",
    category: "clean-water",
    imageUrl:
      "https://images.unsplash.com/photo-1541877944-ac8a0f021e10?w=800&h=400&fit=crop",
    creator: "0x4567890123456789012345678901234567890123",
    creatorName: "WaterAid Global",
    targetAmount: BigInt("250000000000000000000"), // 250 ETH
    currentAmount: BigInt("127000000000000000000"), // 127 ETH
    minimumContribution: BigInt("5000000000000000"), // 0.005 ETH
    deadline: Date.now() + 75 * 24 * 60 * 60 * 1000,
    isActive: true,
    targetReached: false,
    contributorsCount: 3421,
    createdAt: Date.now() - 25 * 24 * 60 * 60 * 1000,
    tags: ["water", "rural", "sustainability", "health"],
    location: "Sub-Saharan Africa",
    urgency: "high",
  },
  {
    id: "camp-2",
    address: "0x0000000000000000000000000000000000000005",
    title: "Climate Action: Reforestation Initiative",
    description:
      "Large-scale reforestation project to combat climate change by planting 1 million trees across deforested areas and creating sustainable forest ecosystems.",
    category: "climate-action",
    imageUrl:
      "https://images.unsplash.com/photo-1574263867128-a3d5c1b1defc?w=800&h=400&fit=crop",
    creator: "0x5678901234567890123456789012345678901234",
    creatorName: "Climate Forest Initiative",
    targetAmount: BigInt("800000000000000000000"), // 800 ETH
    currentAmount: BigInt("445000000000000000000"), // 445 ETH
    minimumContribution: BigInt("10000000000000000"), // 0.01 ETH
    deadline: Date.now() + 150 * 24 * 60 * 60 * 1000,
    isActive: true,
    targetReached: false,
    contributorsCount: 8976,
    createdAt: Date.now() - 40 * 24 * 60 * 60 * 1000,
    tags: ["climate", "forest", "environment", "trees"],
    location: "Global",
    urgency: "critical",
  },
  {
    id: "camp-3",
    address: "0x0000000000000000000000000000000000000006",
    title: "Emergency Food Relief - East Africa",
    description:
      "Urgent food assistance for families affected by drought and food insecurity in East Africa. Providing nutritious meals and agricultural support.",
    category: "food-security",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=400&fit=crop",
    creator: "0x6789012345678901234567890123456789012345",
    creatorName: "World Food Programme",
    targetAmount: BigInt("600000000000000000000"), // 600 ETH
    currentAmount: BigInt("234000000000000000000"), // 234 ETH
    minimumContribution: BigInt("5000000000000000"), // 0.005 ETH
    deadline: Date.now() + 30 * 24 * 60 * 60 * 1000,
    isActive: true,
    targetReached: false,
    contributorsCount: 5643,
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    tags: ["food", "emergency", "africa", "relief"],
    location: "East Africa",
    urgency: "critical",
  },
  {
    id: "camp-4",
    address: "0x0000000000000000000000000000000000000007",
    title: "Girls Education Initiative - South Asia",
    description:
      "Empowering girls through education by building schools, training teachers, and providing scholarships to girls in rural South Asian communities.",
    category: "education",
    imageUrl:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop",
    creator: "0x7890123456789012345678901234567890123456",
    creatorName: "Malala Fund",
    targetAmount: BigInt("400000000000000000000"), // 400 ETH
    currentAmount: BigInt("187000000000000000000"), // 187 ETH
    minimumContribution: BigInt("5000000000000000"), // 0.005 ETH
    deadline: Date.now() + 90 * 24 * 60 * 60 * 1000,
    isActive: true,
    targetReached: false,
    contributorsCount: 4521,
    createdAt: Date.now() - 35 * 24 * 60 * 60 * 1000,
    tags: ["education", "girls", "women", "empowerment"],
    location: "South Asia",
    urgency: "medium",
  },
  {
    id: "camp-5",
    address: "0x0000000000000000000000000000000000000008",
    title: "Refugee Tech Training Program",
    description:
      "Providing technology skills training and job placement assistance to refugees, helping them rebuild their lives through digital literacy and employment.",
    category: "refugee-support",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    creator: "0x8901234567890123456789012345678901234567",
    creatorName: "TechRefugees",
    targetAmount: BigInt("300000000000000000000"), // 300 ETH
    currentAmount: BigInt("145000000000000000000"), // 145 ETH
    minimumContribution: BigInt("5000000000000000"), // 0.005 ETH
    deadline: Date.now() + 120 * 24 * 60 * 60 * 1000,
    isActive: true,
    targetReached: false,
    contributorsCount: 2876,
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    tags: ["refugees", "technology", "training", "employment"],
    location: "Europe & Middle East",
    urgency: "medium",
  },
  {
    id: "camp-6",
    address: "0x0000000000000000000000000000000000000009",
    title: "Medical Supplies for War-Torn Regions",
    description:
      "Urgent medical supplies and healthcare equipment for hospitals and clinics in conflict-affected areas. Supporting frontline healthcare workers.",
    category: "healthcare",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    creator: "0x9012345678901234567890123456789012345678",
    creatorName: "Doctors Without Borders",
    targetAmount: BigInt("750000000000000000000"), // 750 ETH
    currentAmount: BigInt("423000000000000000000"), // 423 ETH
    minimumContribution: BigInt("10000000000000000"), // 0.01 ETH
    deadline: Date.now() + 45 * 24 * 60 * 60 * 1000,
    isActive: true,
    targetReached: false,
    contributorsCount: 7890,
    createdAt: Date.now() - 28 * 24 * 60 * 60 * 1000,
    tags: ["medical", "emergency", "conflict", "healthcare"],
    location: "Middle East & Africa",
    urgency: "critical",
  },
];

const allCampaigns = [...ALL_CAMPAIGNS, ...mockCampaigns];

export default function CampaignsPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<
    CampaignCategory | "all"
  >("all");
  const [sortBy, setSortBy] = useState<
    "newest" | "ending-soon" | "most-funded" | "urgent"
  >("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Handle URL search parameters
  useEffect(() => {
    const category = searchParams?.get("category");
    const featured = searchParams?.get("featured");
    const search = searchParams?.get("search");

    if (category && category !== "all") {
      setSelectedCategory(category as CampaignCategory);
    }
    if (featured === "true") {
      setShowFeaturedOnly(true);
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const filteredAndSortedCampaigns = useMemo(() => {
    let filtered = allCampaigns;

    // Filter by featured status
    if (showFeaturedOnly) {
      filtered = filtered.filter(
        (campaign) => "featured" in campaign && campaign.featured
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (campaign) => campaign.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          campaign.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          campaign.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Sort campaigns
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt - a.createdAt;
        case "ending-soon":
          return a.deadline - b.deadline;
        case "most-funded":
          return Number(b.currentAmount - a.currentAmount);
        case "urgent":
          const urgencyOrder = { critical: 3, high: 2, medium: 1, low: 0 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, sortBy, searchQuery, showFeaturedOnly]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Campaigns
          </h1>
          <p className="text-xl text-gray-600">
            Discover and support impactful campaigns from around the world
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Campaigns
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value as CampaignCategory | "all"
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {Object.entries(CAMPAIGN_CATEGORIES).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Toggle */}
            <div className="lg:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter Options
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Featured Only
                </label>
              </div>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <label
                htmlFor="sort"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="ending-soon">Ending Soon</option>
                <option value="most-funded">Most Funded</option>
                <option value="urgent">Most Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedCampaigns.length} campaign
            {filteredAndSortedCampaigns.length !== 1 ? "s" : ""}
            {selectedCategory !== "all" && (
              <span> in {CAMPAIGN_CATEGORIES[selectedCategory]?.label}</span>
            )}
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </p>
        </div>

        {/* Campaigns Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <CampaignCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredAndSortedCampaigns.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No campaigns found
            </h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your search criteria or browse all categories
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setSortBy("newest");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredAndSortedCampaigns.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Load More Campaigns
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
