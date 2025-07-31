"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { CAMPAIGN_CATEGORIES } from "@/lib/campaignData";
import { CampaignCategory } from "@/types/campaign";

export default function CreateCampaignPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "" as CampaignCategory | "",
    targetAmount: "",
    minimumContribution: "",
    deadline: "",
    location: "",
    urgency: "medium" as "low" | "medium" | "high" | "critical",
    tags: "",
    imageUrl: "",
    organizationName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, you would deploy the campaign contract here
      // Example smart contract deployment logic:
      /*
      const campaignFactory = useContract({ address: factoryAddress, abi: factoryAbi });
      const tx = await campaignFactory.write.createCampaign([
        parseEther(formData.targetAmount),
        parseEther(formData.minimumContribution),
        Math.floor(new Date(formData.deadline).getTime() / 1000)
      ]);
      await tx.wait();
      */

      // For demo purposes, just simulate the deployment
      await new Promise((resolve) => setTimeout(resolve, 3000));

      alert("Campaign created successfully!");
      // In a real app, redirect to the new campaign page
      // router.push(`/campaigns/${newCampaignAddress}`);
    } catch (error) {
      console.error("Campaign creation failed:", error);
      alert("Failed to create campaign. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.category &&
    formData.targetAmount &&
    formData.deadline &&
    formData.organizationName;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create New Campaign
          </h1>
          <p className="text-xl text-gray-600">
            Launch your crowdfunding campaign and make a difference
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Campaign Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a compelling campaign title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="organizationName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Organization Name *
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Your organization or name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {Object.entries(CAMPAIGN_CATEGORIES).map(
                    ([key, category]) => (
                      <option key={key} value={key}>
                        {category.icon} {category.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Global, United States, Kenya"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="urgency"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Urgency Level
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Short Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write a brief, compelling description of your campaign"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="longDescription"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Detailed Description
                </label>
                <textarea
                  id="longDescription"
                  name="longDescription"
                  rows={8}
                  value={formData.longDescription}
                  onChange={handleInputChange}
                  placeholder="Provide detailed information about your campaign, goals, and how funds will be used"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Campaign Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., education, children, emergency (comma-separated)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate tags with commas to help people find your campaign
                </p>
              </div>
            </div>
          </div>

          {/* Funding Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Funding Details
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="targetAmount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Target Amount (ETH) *
                </label>
                <input
                  type="number"
                  id="targetAmount"
                  name="targetAmount"
                  step="0.001"
                  min="0.001"
                  value={formData.targetAmount}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="minimumContribution"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Minimum Contribution (ETH)
                </label>
                <input
                  type="number"
                  id="minimumContribution"
                  name="minimumContribution"
                  step="0.001"
                  min="0.001"
                  value={formData.minimumContribution}
                  onChange={handleInputChange}
                  placeholder="e.g., 0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Deadline *
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Funding Breakdown */}
            {formData.targetAmount && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Funding Breakdown
                </h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <div className="flex justify-between">
                    <span>Target Amount:</span>
                    <span>
                      {formData.targetAmount} ETH (~$
                      {(Number(formData.targetAmount) * 3000).toLocaleString()})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (2.5%):</span>
                    <span>
                      {(Number(formData.targetAmount) * 0.025).toFixed(3)} ETH
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-blue-200 pt-1 mt-2">
                    <span>You'll Receive:</span>
                    <span>
                      {(Number(formData.targetAmount) * 0.975).toFixed(3)} ETH
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Terms and Submit */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Terms of Service
                  </a>{" "}
                  and confirm that all information provided is accurate. I
                  understand that funds will be held in a smart contract and
                  released according to the campaign terms.
                </span>
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                className="flex-1 py-3 px-6 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                  isFormValid && !isLoading
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Campaign...
                  </div>
                ) : (
                  "Launch Campaign"
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Your campaign will be reviewed and published within 24 hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
