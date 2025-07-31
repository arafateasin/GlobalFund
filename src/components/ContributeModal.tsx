"use client";

import { useState } from "react";
import { Campaign } from "@/types/campaign";
import { formatCurrency } from "@/lib/campaignData";

interface ContributeModalProps {
  campaign: Campaign;
  onClose: () => void;
}

export function ContributeModal({ campaign, onClose }: ContributeModalProps) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const presetAmounts = [0.01, 0.05, 0.1, 0.25, 0.5, 1.0];
  const minimumEth = Number(campaign.minimumContribution) / 1e18;

  const handlePresetClick = (presetAmount: number) => {
    setAmount(presetAmount.toString());
    setSelectedPreset(presetAmount);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setSelectedPreset(null);
  };

  const handleContribute = async () => {
    if (!amount || Number(amount) < minimumEth) {
      alert(`Minimum contribution is ${minimumEth} ETH`);
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, you would integrate with wagmi/ethers here
      // Example:
      // const contract = useContract({ address: campaign.address, abi: campaignAbi });
      // await contract.write.contribute({ value: parseEther(amount) });

      // For demo purposes, just simulate the transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert(`Successfully contributed ${amount} ETH to ${campaign.title}!`);
      onClose();
    } catch (error) {
      console.error("Contribution failed:", error);
      alert("Contribution failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isValidAmount = amount && Number(amount) >= minimumEth;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Contribute to Campaign
              </h2>
              <p className="text-gray-600">{campaign.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Campaign Progress */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-semibold text-gray-900">
                {formatCurrency(Number(campaign.currentAmount) / 1e18)} /{" "}
                {formatCurrency(Number(campaign.targetAmount) / 1e18)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    Number(
                      (campaign.currentAmount * BigInt(100)) /
                        campaign.targetAmount
                    ),
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Preset Amounts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quick Select Amount (ETH)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePresetClick(preset)}
                  className={`py-2 px-3 rounded-lg border font-medium transition-colors duration-200 ${
                    selectedPreset === preset
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400 text-gray-700"
                  }`}
                >
                  {preset} ETH
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Custom Amount (ETH)
            </label>
            <input
              type="number"
              id="amount"
              step="0.001"
              min={minimumEth}
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder={`Minimum ${minimumEth} ETH`}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum contribution: {minimumEth} ETH
            </p>
          </div>

          {/* Contribution Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Message (Optional)
            </label>
            <textarea
              id="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share why you're supporting this campaign..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Impact Estimate */}
          {isValidAmount && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Your Impact</h4>
              <p className="text-sm text-green-700">
                Your contribution of {amount} ETH (
                {formatCurrency(Number(amount) * 3000)}) will help provide
                essential support to those in need.
              </p>
            </div>
          )}

          {/* Transaction Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">
              Transaction Details
            </h4>
            <div className="space-y-1 text-sm text-blue-700">
              <div className="flex justify-between">
                <span>Contribution Amount:</span>
                <span>{amount || "0"} ETH</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Gas Fee:</span>
                <span>~0.002 ETH</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-blue-200 pt-1 mt-2">
                <span>Total:</span>
                <span>
                  ~{amount ? (Number(amount) + 0.002).toFixed(3) : "0.002"} ETH
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleContribute}
              disabled={!isValidAmount || isLoading}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                isValidAmount && !isLoading
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Contributing...
                </div>
              ) : (
                "Contribute Now"
              )}
            </button>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-500 text-center">
            By contributing, you agree to our terms of service. Contributions
            are processed via smart contracts on the Ethereum blockchain.
          </div>
        </div>
      </div>
    </div>
  );
}
