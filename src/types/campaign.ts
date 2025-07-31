export interface Campaign {
  id: string;
  address: string;
  title: string;
  description: string;
  longDescription?: string;
  category: CampaignCategory;
  imageUrl: string;
  creator: string;
  creatorName: string;
  targetAmount: bigint;
  currentAmount: bigint;
  minimumContribution: bigint;
  deadline: number;
  isActive: boolean;
  targetReached: boolean;
  contributorsCount: number;
  createdAt: number;
  tags: string[];
  location?: string;
  urgency: "low" | "medium" | "high" | "critical";
  updates?: CampaignUpdate[];
  gallery?: string[];
}

export interface CampaignUpdate {
  id: string;
  title: string;
  content: string;
  date: number;
  imageUrl?: string;
}

export interface Contribution {
  id: string;
  campaignId: string;
  contributor: string;
  amount: bigint;
  message?: string;
  timestamp: number;
  transactionHash: string;
}

export interface SpendingRequest {
  id: number;
  campaignId: string;
  description: string;
  amount: bigint;
  recipient: string;
  approvalCount: number;
  isComplete: boolean;
  createdAt: number;
}

export type CampaignCategory =
  | "humanitarian"
  | "education"
  | "healthcare"
  | "environment"
  | "technology"
  | "arts"
  | "disaster-relief"
  | "childrens-rights"
  | "womens-empowerment"
  | "sustainable-development"
  | "refugee-support"
  | "food-security"
  | "clean-water"
  | "climate-action"
  | "peace-building";

export interface FeaturedCampaign extends Campaign {
  featured: true;
  featuredUntil: number;
  organizationName: string;
  organizationLogo: string;
  impact: {
    beneficiaries: number;
    countries: number;
    description: string;
  };
}
