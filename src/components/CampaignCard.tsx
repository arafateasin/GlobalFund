"use client";

import { Campaign, FeaturedCampaign } from "@/types/campaign";
import {
  CAMPAIGN_CATEGORIES,
  formatEther,
  formatProgress,
  getDaysRemaining,
  getUrgencyColor,
} from "@/lib/campaignData";
import Link from "next/link";

interface CampaignCardProps {
  campaign: Campaign | FeaturedCampaign;
  featured?: boolean;
}

export function CampaignCard({
  campaign,
  featured = false,
}: CampaignCardProps) {
  const progress = formatProgress(
    campaign.currentAmount,
    campaign.targetAmount
  );
  const daysRemaining = getDaysRemaining(campaign.deadline);
  const category = CAMPAIGN_CATEGORIES[campaign.category];
  const isFeatured = "featured" in campaign && campaign.featured;

  return (
    <div
      className={`
      bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]
      ${featured ? "border-2 border-blue-200" : "border border-gray-200"}
      ${isFeatured ? "ring-2 ring-yellow-400 ring-opacity-50" : ""}
    `}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />

        {/* Urgency Badge */}
        <div
          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(
            campaign.urgency
          )}`}
        >
          {campaign.urgency.toUpperCase()}
        </div>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
            ⭐ FEATURED
          </div>
        )}

        {/* Category Badge */}
        <div
          className={`absolute bottom-3 left-3 ${category.color} text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1`}
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Organization Info for Featured Campaigns */}
        {isFeatured && "organizationName" in campaign && (
          <div className="flex items-center gap-2 mb-3 p-2 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {campaign.organizationName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-900">
                {campaign.organizationName}
              </p>
              <p className="text-xs text-blue-600">Official Campaign</p>
            </div>
          </div>
        )}

        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {campaign.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {campaign.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Progress
            </span>
            <span className="text-sm font-bold text-green-600">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Funding Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Raised</p>
            <p className="text-lg font-bold text-gray-900">
              {formatEther(campaign.currentAmount)} ETH
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Goal</p>
            <p className="text-lg font-bold text-gray-900">
              {formatEther(campaign.targetAmount)} ETH
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span>👥</span>
            <span>
              {campaign.contributorsCount.toLocaleString()} contributors
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>⏰</span>
            <span>{daysRemaining} days left</span>
          </div>
        </div>

        {/* Impact for Featured Campaigns */}
        {isFeatured && "impact" in campaign && (
          <div className="bg-green-50 p-3 rounded-lg mb-4">
            <p className="text-xs text-green-600 font-semibold mb-1">IMPACT</p>
            <p className="text-sm text-green-800">
              {campaign.impact.description}
            </p>
            <div className="flex gap-4 mt-2 text-xs text-green-600">
              <span>
                👥 {campaign.impact.beneficiaries.toLocaleString()} people
              </span>
              <span>🌍 {campaign.impact.countries} countries</span>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {campaign.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {campaign.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{campaign.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Action Button */}
        <Link href={`/campaigns/${campaign.id}`}>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
            <span>Support Campaign</span>
            <span>→</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export function CampaignCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-pulse">
      <div className="h-48 bg-gray-300" />
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-2" />
        <div className="h-4 bg-gray-300 rounded mb-4" />
        <div className="h-3 bg-gray-300 rounded mb-4" />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="h-8 bg-gray-300 rounded" />
          <div className="h-8 bg-gray-300 rounded" />
        </div>
        <div className="h-10 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
