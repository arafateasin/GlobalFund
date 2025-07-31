// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleCampaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    uint public targetAmount;
    uint public deadline;
    bool public isActive;
    bool public targetReached;

    event ContributionMade(address contributor, uint amount);
    event RequestCreated(uint requestIndex, string description, uint value);
    event RequestApproved(uint requestIndex, address approver);
    event RequestFinalized(uint requestIndex);
    event TargetReached(uint totalRaised);

    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this");
        _;
    }

    modifier activeOnly() {
        require(isActive, "Campaign is not active");
        require(block.timestamp < deadline, "Campaign has ended");
        _;
    }

    constructor(
        uint minimum,
        uint target,
        uint durationInDays,
        address creator
    ) {
        manager = creator;
        minimumContribution = minimum;
        targetAmount = target;
        deadline = block.timestamp + (durationInDays * 1 days);
        isActive = true;
        targetReached = false;
    }

    function contribute() public payable activeOnly {
        require(msg.value >= minimumContribution, "Contribution below minimum");

        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }

        if (address(this).balance >= targetAmount && !targetReached) {
            targetReached = true;
            emit TargetReached(address(this).balance);
        }

        emit ContributionMade(msg.sender, msg.value);
    }

    function createRequest(
        string memory description,
        uint value,
        address payable recipient
    ) public restricted {
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;

        emit RequestCreated(requests.length - 1, description, value);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender], "Must be a contributor");
        require(!request.approvals[msg.sender], "Already approved");

        request.approvals[msg.sender] = true;
        request.approvalCount++;

        emit RequestApproved(index, msg.sender);
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2), "Not enough approvals");
        require(!request.complete, "Request already completed");
        require(address(this).balance >= request.value, "Insufficient funds");

        request.complete = true;
        request.recipient.transfer(request.value);

        emit RequestFinalized(index);
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address, uint, uint, bool, bool, uint
    ) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager,
            targetAmount,
            deadline,
            isActive,
            targetReached,
            address(this).balance
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

    function getProgress() public view returns (uint) {
        if (targetAmount == 0) return 0;
        return (address(this).balance * 100) / targetAmount;
    }
}

contract SimpleCampaignFactory {
    address[] public deployedCampaigns;
    mapping(address => address[]) public campaignsByCreator;

    event CampaignCreated(address campaignAddress, address creator);

    function createCampaign(
        uint minimum,
        uint target,
        uint durationInDays
    ) public {
        address newCampaign = address(new SimpleCampaign(
            minimum,
            target,
            durationInDays,
            msg.sender
        ));

        deployedCampaigns.push(newCampaign);
        campaignsByCreator[msg.sender].push(newCampaign);

        emit CampaignCreated(newCampaign, msg.sender);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }

    function getCampaignsByCreator(address creator) public view returns (address[] memory) {
        return campaignsByCreator[creator];
    }

    function getCampaignCount() public view returns (uint) {
        return deployedCampaigns.length;
    }
}
