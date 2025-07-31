import { Campaign, FeaturedCampaign, CampaignCategory } from "@/types/campaign";

export const CAMPAIGN_CATEGORIES: Record<
  CampaignCategory,
  {
    label: string;
    icon: string;
    color: string;
    description: string;
  }
> = {
  humanitarian: {
    label: "Humanitarian Aid",
    icon: "🤝",
    color: "bg-red-500",
    description: "Emergency relief and humanitarian assistance",
  },
  education: {
    label: "Education",
    icon: "📚",
    color: "bg-blue-500",
    description: "Educational programs and literacy initiatives",
  },
  healthcare: {
    label: "Healthcare",
    icon: "🏥",
    color: "bg-green-500",
    description: "Medical care and health infrastructure",
  },
  environment: {
    label: "Environment",
    icon: "🌍",
    color: "bg-emerald-500",
    description: "Environmental conservation and sustainability",
  },
  technology: {
    label: "Technology",
    icon: "💻",
    color: "bg-purple-500",
    description: "Technology for social good",
  },
  arts: {
    label: "Arts & Culture",
    icon: "🎨",
    color: "bg-pink-500",
    description: "Cultural preservation and artistic expression",
  },
  "disaster-relief": {
    label: "Disaster Relief",
    icon: "🚨",
    color: "bg-orange-500",
    description: "Emergency response and disaster recovery",
  },
  "childrens-rights": {
    label: "Children's Rights",
    icon: "👶",
    color: "bg-yellow-500",
    description: "Child protection and rights advocacy",
  },
  "womens-empowerment": {
    label: "Women's Empowerment",
    icon: "👩",
    color: "bg-violet-500",
    description: "Gender equality and women empowerment",
  },
  "sustainable-development": {
    label: "Sustainable Development",
    icon: "🌱",
    color: "bg-teal-500",
    description: "UN Sustainable Development Goals",
  },
  "refugee-support": {
    label: "Refugee Support",
    icon: "🏠",
    color: "bg-indigo-500",
    description: "Support for refugees and displaced persons",
  },
  "food-security": {
    label: "Food Security",
    icon: "🌾",
    color: "bg-amber-500",
    description: "Fighting hunger and malnutrition",
  },
  "clean-water": {
    label: "Clean Water",
    icon: "💧",
    color: "bg-cyan-500",
    description: "Access to clean water and sanitation",
  },
  "climate-action": {
    label: "Climate Action",
    icon: "🌡️",
    color: "bg-lime-500",
    description: "Climate change mitigation and adaptation",
  },
  "peace-building": {
    label: "Peace Building",
    icon: "🕊️",
    color: "bg-sky-500",
    description: "Conflict resolution and peace initiatives",
  },
};

export const FEATURED_CAMPAIGNS: FeaturedCampaign[] = [
  {
    id: "un-1",
    address: "0x0000000000000000000000000000000000000001",
    title: "UNICEF: Education for Every Child",
    description:
      "Help provide quality education to children in conflict zones and developing countries. Your contribution will fund schools, teacher training, and educational materials.",
    category: "childrens-rights",
    imageUrl:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop",
    creator: "0x1234567890123456789012345678901234567890",
    creatorName: "UNICEF",
    targetAmount: BigInt("1000000000000000000000"), // 1000 ETH
    currentAmount: BigInt("650000000000000000000"), // 650 ETH
    minimumContribution: BigInt("10000000000000000"), // 0.01 ETH
    deadline: Date.now() + 90 * 24 * 60 * 60 * 1000, // 90 days
    isActive: true,
    targetReached: false,
    contributorsCount: 12847,
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
    tags: ["education", "children", "global", "UN"],
    location: "Global",
    urgency: "high",
    featured: true,
    featuredUntil: Date.now() + 60 * 24 * 60 * 60 * 1000,
    organizationName: "UNICEF",
    organizationLogo: "/images/unicef-logo.png",
    impact: {
      beneficiaries: 500000,
      countries: 47,
      description:
        "Providing education to half a million children across 47 countries",
    },
  },
  {
    id: "unesco-1",
    address: "0x0000000000000000000000000000000000000002",
    title: "UNESCO: Preserve Cultural Heritage Sites",
    description:
      "Support the preservation of endangered cultural heritage sites around the world. Funds will go towards restoration, documentation, and protection efforts.",
    category: "arts",
    imageUrl:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73bb0?w=800&h=400&fit=crop",
    creator: "0x2345678901234567890123456789012345678901",
    creatorName: "UNESCO",
    targetAmount: BigInt("500000000000000000000"), // 500 ETH
    currentAmount: BigInt("320000000000000000000"), // 320 ETH
    minimumContribution: BigInt("5000000000000000"), // 0.005 ETH
    deadline: Date.now() + 120 * 24 * 60 * 60 * 1000, // 120 days
    isActive: true,
    targetReached: false,
    contributorsCount: 8932,
    createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000, // 45 days ago
    tags: ["culture", "heritage", "preservation", "UNESCO"],
    location: "Global",
    urgency: "medium",
    featured: true,
    featuredUntil: Date.now() + 45 * 24 * 60 * 60 * 1000,
    organizationName: "UNESCO",
    organizationLogo: "/images/unesco-logo.png",
    impact: {
      beneficiaries: 1000000,
      countries: 23,
      description: "Preserving cultural heritage for future generations",
    },
  },
  {
    id: "who-1",
    address: "0x0000000000000000000000000000000000000003",
    title: "WHO: Global Health Emergency Response",
    description:
      "Support WHO's rapid response to health emergencies worldwide. Funds will provide medical supplies, vaccines, and emergency healthcare services.",
    category: "healthcare",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
    creator: "0x3456789012345678901234567890123456789012",
    creatorName: "World Health Organization",
    targetAmount: BigInt("2000000000000000000000"), // 2000 ETH
    currentAmount: BigInt("1450000000000000000000"), // 1450 ETH
    minimumContribution: BigInt("20000000000000000"), // 0.02 ETH
    deadline: Date.now() + 60 * 24 * 60 * 60 * 1000, // 60 days
    isActive: true,
    targetReached: false,
    contributorsCount: 23156,
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000, // 20 days ago
    tags: ["health", "emergency", "global", "WHO"],
    location: "Global",
    urgency: "critical",
    featured: true,
    featuredUntil: Date.now() + 30 * 24 * 60 * 60 * 1000,
    organizationName: "World Health Organization",
    organizationLogo: "/images/who-logo.png",
    impact: {
      beneficiaries: 10000000,
      countries: 95,
      description: "Emergency health response reaching 10 million people",
    },
  },
  // Bangladesh campaigns as featured
  {
    id: "bd-1",
    address: "0x0000000000000000000000000000000000000BD1",
    title: "Flood Relief for Rural Bangladesh",
    description:
      "Emergency flood relief providing clean water, food supplies, and temporary shelter for families affected by severe flooding in rural Bangladesh districts.",
    category: "disaster-relief",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
    creator: "0xBD01567890123456789012345678901234567890",
    creatorName: "Bangladesh Relief Foundation",
    targetAmount: BigInt("200000000000000000000"), // 200 ETH
    currentAmount: BigInt("87000000000000000000"), // 87 ETH
    minimumContribution: BigInt("5000000000000000"), // 0.005 ETH
    deadline: 1754025600000, // Fixed timestamp: Feb 1, 2025
    isActive: true,
    targetReached: false,
    contributorsCount: 2847,
    createdAt: 1752249600000, // Fixed timestamp: Jan 11, 2025
    tags: ["bangladesh", "flood", "emergency", "rural", "disaster"],
    location: "Bangladesh",
    urgency: "critical",
    featured: true,
    featuredUntil: 1756617600000, // Fixed timestamp: Aug 31, 2025
    organizationName: "Bangladesh Relief Foundation",
    organizationLogo: "/images/brf-logo.png",
    impact: {
      beneficiaries: 50000,
      countries: 1,
      description: "Emergency relief for 50,000 flood-affected families",
    },
  },
  {
    id: "bd-2",
    address: "0x0000000000000000000000000000000000000BD2",
    title: "Educational Support for Rohingya Children",
    description:
      "Providing education and learning opportunities for Rohingya refugee children in Cox's Bazar camps, including schools, books, and teacher training.",
    category: "education",
    imageUrl:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop",
    creator: "0xBD02567890123456789012345678901234567890",
    creatorName: "BRAC Education Program",
    targetAmount: BigInt("150000000000000000000"), // 150 ETH
    currentAmount: BigInt("68000000000000000000"), // 68 ETH
    minimumContribution: BigInt("5000000000000000"), // 0.005 ETH
    deadline: 1764115200000, // Fixed timestamp: May 1, 2025
    isActive: true,
    targetReached: false,
    contributorsCount: 1924,
    createdAt: 1751126400000, // Fixed timestamp: Jan 5, 2025
    tags: ["bangladesh", "rohingya", "education", "refugees", "children"],
    location: "Cox's Bazar, Bangladesh",
    urgency: "high",
    featured: true,
    featuredUntil: 1756617600000, // Fixed timestamp: Aug 31, 2025
    organizationName: "BRAC Education Program",
    organizationLogo: "/images/brac-logo.png",
    impact: {
      beneficiaries: 15000,
      countries: 1,
      description: "Education for 15,000 Rohingya refugee children",
    },
  },
  {
    id: "bd-3",
    address: "0x0000000000000000000000000000000000000BD3",
    title: "Climate-Resilient Agriculture in Bangladesh",
    description:
      "Supporting farmers in Bangladesh to adopt climate-resilient farming techniques and drought-resistant crops to ensure food security despite climate change.",
    category: "environment",
    imageUrl:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=400&fit=crop",
    creator: "0xBD03567890123456789012345678901234567890",
    creatorName: "Sustainable Agriculture Bangladesh",
    targetAmount: BigInt("300000000000000000000"), // 300 ETH
    currentAmount: BigInt("145000000000000000000"), // 145 ETH
    minimumContribution: BigInt("10000000000000000"), // 0.01 ETH
    deadline: 1769299200000, // Fixed timestamp: Aug 1, 2025
    isActive: true,
    targetReached: false,
    contributorsCount: 3756,
    createdAt: 1750521600000, // Fixed timestamp: Dec 25, 2024
    tags: ["bangladesh", "agriculture", "climate", "farmers", "sustainability"],
    location: "Rural Bangladesh",
    urgency: "medium",
    featured: true,
    featuredUntil: 1756617600000, // Fixed timestamp: Aug 31, 2025
    organizationName: "Sustainable Agriculture Bangladesh",
    organizationLogo: "/images/sab-logo.png",
    impact: {
      beneficiaries: 25000,
      countries: 1,
      description: "Climate-resilient farming for 25,000 farmers",
    },
  },
];

// Bangladesh-specific campaigns
export const BANGLADESH_CAMPAIGNS: Campaign[] = [
  {
    id: "bd-1",
    address: "0x0000000000000000000000000000000000000BD1",
    title: "Flood Relief for Rural Bangladesh",
    description:
      "Emergency flood relief providing clean water, food supplies, and temporary shelter for families affected by severe flooding in rural Bangladesh districts.",
    longDescription: `
      <h3>Crisis Situation</h3>
      <p>Bangladesh faces severe annual flooding that displaces millions and destroys crops, homes, and infrastructure. This year's floods have been particularly devastating, affecting over 2 million people across northern and central districts.</p>
      
      <h3>Our Response</h3>
      <ul>
        <li>Emergency food packages for 50,000 families</li>
        <li>Clean water distribution and purification tablets</li>
        <li>Temporary shelter and emergency medical care</li>
        <li>Agricultural support to restore damaged crops</li>
      </ul>
      
      <h3>Your Impact</h3>
      <p>$25 - Emergency food package for one family for a week</p>
      <p>$50 - Clean water supplies for 10 families</p>
      <p>$100 - Temporary shelter materials for one family</p>
    `,
    category: "disaster-relief",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
    creator: "0xBD01567890123456789012345678901234567890",
    creatorName: "Bangladesh Relief Foundation",
    targetAmount: BigInt("200000000000000000000"), // 200 ETH
    currentAmount: BigInt("87000000000000000000"), // 87 ETH
    minimumContribution: BigInt("5000000000000000"), // 0.005 ETH
    deadline: Date.now() + 45 * 24 * 60 * 60 * 1000,
    isActive: true,
    targetReached: false,
    contributorsCount: 2847,
    createdAt: Date.now() - 18 * 24 * 60 * 60 * 1000,
    tags: ["bangladesh", "flood", "emergency", "rural", "disaster"],
    location: "Bangladesh",
    urgency: "critical",
    updates: [
      {
        id: "bd1-update1",
        title: "Emergency Teams Deployed",
        content:
          "Our emergency response teams have been deployed to the most affected areas in Rangpur and Kurigram districts. We have established temporary relief centers and begun distributing emergency supplies.",
        date: Date.now() - 3 * 24 * 60 * 60 * 1000,
        imageUrl:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=300&fit=crop",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    ],
  },
  {
    id: "bd-2",
    address: "0x0000000000000000000000000000000000000BD2",
    title: "Educational Support for Rohingya Children",
    description:
      "Providing education and learning opportunities for Rohingya refugee children in Cox's Bazar camps, including schools, books, and teacher training.",
    longDescription: `
      <h3>The Need</h3>
      <p>Over 400,000 Rohingya refugee children in Cox's Bazar camps lack access to formal education. Many have never attended school and face an uncertain future without basic literacy and numeracy skills.</p>
      
      <h3>Our Program</h3>
      <ul>
        <li>Establishing learning centers in refugee camps</li>
        <li>Training local teachers and volunteers</li>
        <li>Providing educational materials and supplies</li>
        <li>Psychosocial support for traumatized children</li>
      </ul>
    `,
    category: "education",
    imageUrl:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop",
    creator: "0xBD02567890123456789012345678901234567890",
    creatorName: "BRAC Education Program",
    targetAmount: BigInt("150000000000000000000"), // 150 ETH
    currentAmount: BigInt("68000000000000000000"), // 68 ETH
    minimumContribution: BigInt("5000000000000000"), // 0.005 ETH
    deadline: Date.now() + 120 * 24 * 60 * 60 * 1000,
    isActive: true,
    targetReached: false,
    contributorsCount: 1924,
    createdAt: Date.now() - 25 * 24 * 60 * 60 * 1000,
    tags: ["bangladesh", "rohingya", "education", "refugees", "children"],
    location: "Cox's Bazar, Bangladesh",
    urgency: "high",
  },
  {
    id: "bd-3",
    address: "0x0000000000000000000000000000000000000BD3",
    title: "Climate-Resilient Agriculture in Bangladesh",
    description:
      "Supporting farmers in Bangladesh to adopt climate-resilient farming techniques and drought-resistant crops to ensure food security despite climate change.",
    longDescription: `
      <h3>Climate Challenge</h3>
      <p>Bangladesh is one of the most climate-vulnerable countries in the world. Rising sea levels, unpredictable rainfall, and extreme weather events threaten agricultural productivity and food security.</p>
      
      <h3>Our Solution</h3>
      <ul>
        <li>Training farmers in climate-smart agriculture</li>
        <li>Providing drought and flood-resistant seeds</li>
        <li>Building irrigation and water management systems</li>
        <li>Establishing crop insurance programs</li>
      </ul>
    `,
    category: "environment",
    imageUrl:
      "https://images.unsplash.com/photo-1574263867128-a3d5c1b1defc?w=800&h=400&fit=crop",
    creator: "0xBD03567890123456789012345678901234567890",
    creatorName: "Bangladesh Agricultural Research Foundation",
    targetAmount: BigInt("300000000000000000000"), // 300 ETH
    currentAmount: BigInt("145000000000000000000"), // 145 ETH
    minimumContribution: BigInt("10000000000000000"), // 0.01 ETH
    deadline: Date.now() + 180 * 24 * 60 * 60 * 1000,
    isActive: true,
    targetReached: false,
    contributorsCount: 3756,
    createdAt: Date.now() - 35 * 24 * 60 * 60 * 1000,
    tags: ["bangladesh", "agriculture", "climate", "farmers", "sustainability"],
    location: "Rural Bangladesh",
    urgency: "medium",
  },
  {
    id: "bd-4",
    address: "0x0000000000000000000000000000000000000BD4",
    title: "Digital Healthcare for Remote Bangladesh Villages",
    description:
      "Bringing digital healthcare solutions to remote villages in Bangladesh through telemedicine, mobile health clinics, and digital health records.",
    longDescription: `
      <h3>Healthcare Challenge</h3>
      <p>Millions of people in remote Bangladesh villages lack access to quality healthcare. The nearest hospital can be hours away, and specialized medical care is often unavailable.</p>
      
      <h3>Digital Solution</h3>
      <ul>
        <li>Telemedicine consultations with city doctors</li>
        <li>Mobile health clinics with satellite connectivity</li>
        <li>Digital health records and patient tracking</li>
        <li>Training local health workers in digital tools</li>
      </ul>
    `,
    category: "healthcare",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    creator: "0xBD04567890123456789012345678901234567890",
    creatorName: "Digital Health Bangladesh",
    targetAmount: BigInt("250000000000000000000"), // 250 ETH
    currentAmount: BigInt("112000000000000000000"), // 112 ETH
    minimumContribution: BigInt("5000000000000000"), // 0.005 ETH
    deadline: Date.now() + 90 * 24 * 60 * 60 * 1000,
    isActive: true,
    targetReached: false,
    contributorsCount: 2156,
    createdAt: Date.now() - 22 * 24 * 60 * 60 * 1000,
    tags: ["bangladesh", "healthcare", "digital", "telemedicine", "rural"],
    location: "Rural Bangladesh",
    urgency: "high",
  },
];

// All campaigns include both featured and regular campaigns
export const ALL_CAMPAIGNS = [...FEATURED_CAMPAIGNS];

export function formatEther(value: bigint): string {
  return (Number(value) / 1e18).toFixed(4);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value * 3000); // Assuming 1 ETH = $3000 for display
}

export function formatTimeRemaining(deadline: number): string {
  const now = Date.now();
  const diff = deadline - now;

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

  if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"} left`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"} left`;
  } else {
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    return `${minutes} minute${minutes === 1 ? "" : "s"} left`;
  }
}

export function formatProgress(current: bigint, target: bigint): number {
  if (target === BigInt(0)) return 0;
  return Math.min(100, Number((current * BigInt(100)) / target));
}

export function getDaysRemaining(deadline: number): number {
  const now = Date.now();
  const diff = deadline - now;
  return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
}

export function getUrgencyColor(urgency: string): string {
  switch (urgency) {
    case "critical":
      return "text-red-600 bg-red-50";
    case "high":
      return "text-orange-600 bg-orange-50";
    case "medium":
      return "text-yellow-600 bg-yellow-50";
    case "low":
      return "text-green-600 bg-green-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
}
