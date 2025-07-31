// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title CampaignFactory
 * @dev Factory contract to create and manage crowdfunding campaigns
 */
contract CampaignFactory {
    address payable[] public deployedCampaigns;
    mapping(address => address[]) public creatorToCampaigns;
    mapping(address => bool) public verifiedCreators;
    address public admin;
    
    event CampaignCreated(
        address indexed campaignAddress,
        address indexed creator,
        uint256 minimumContribution,
        uint256 targetAmount,
        uint256 deadline,
        string title,
        string category,
        uint256 timestamp
    );
    
    event CreatorVerified(address indexed creator, uint256 timestamp);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    /**
     * @dev Creates a new campaign contract with enhanced parameters
     */
    function createCampaign(
        uint256 minimum,
        uint256 targetAmount,
        uint256 durationInDays,
        string memory title,
        string memory description,
        string memory category,
        string memory imageUrl
    ) external {
        require(minimum > 0, "Minimum contribution must be greater than 0");
        require(targetAmount > minimum, "Target amount must be greater than minimum contribution");
        require(durationInDays > 0 && durationInDays <= 365, "Duration must be between 1-365 days");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        
        uint256 deadline = block.timestamp + (durationInDays * 1 days);
        
        Campaign newCampaign = new Campaign(
            minimum,
            targetAmount,
            deadline,
            title,
            description,
            category,
            imageUrl,
            msg.sender
        );
        
        address campaignAddress = address(newCampaign);
        deployedCampaigns.push(payable(campaignAddress));
        creatorToCampaigns[msg.sender].push(campaignAddress);
        
        emit CampaignCreated(
            campaignAddress,
            msg.sender,
            minimum,
            targetAmount,
            deadline,
            title,
            category,
            block.timestamp
        );
    }

    /**
     * @dev Verifies a creator (admin only)
     */
    function verifyCreator(address creator) external onlyAdmin {
        verifiedCreators[creator] = true;
        emit CreatorVerified(creator, block.timestamp);
    }

    /**
     * @dev Returns campaigns created by a specific creator
     */
    function getCampaignsByCreator(address creator) external view returns (address[] memory) {
        return creatorToCampaigns[creator];
    }

    /**
     * @dev Returns all deployed campaign addresses
     * @return Array of deployed campaign addresses
     */
    function getDeployedCampaigns() external view returns (address payable[] memory) {
        return deployedCampaigns;
    }

    /**
     * @dev Returns the total number of deployed campaigns
     * @return Number of deployed campaigns
     */
    function getCampaignCount() external view returns (uint256) {
        return deployedCampaigns.length;
    }
}

/**
 * @title Campaign
 * @dev Individual crowdfunding campaign contract with enhanced features
 */
contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
        uint256 createdAt;
    }

    struct Contribution {
        uint256 amount;
        uint256 timestamp;
        string message;
    }

    Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    uint256 public targetAmount;
    uint256 public deadline;
    string public title;
    string public description;
    string public category;
    string public imageUrl;
    bool public isActive;
    bool public targetReached;
    uint256 public totalRaised;
    
    mapping(address => bool) public approvers;
    mapping(address => uint256) public contributions;
    mapping(address => Contribution[]) public contributorHistory;
    address[] public contributorsList;
    uint256 public approversCount;
    
    event ContributionMade(address indexed contributor, uint256 amount, uint256 timestamp, string message);
    event RequestCreated(uint256 indexed requestIndex, string description, uint256 value, address recipient);
    event RequestApproved(uint256 indexed requestIndex, address indexed approver);
    event RequestFinalized(uint256 indexed requestIndex, address recipient, uint256 value);
    event CampaignClosed(uint256 timestamp, bool targetReached);
    event RefundIssued(address indexed contributor, uint256 amount, uint256 timestamp);
    event TargetReached(uint256 amount, uint256 timestamp);

    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    modifier validContributor() {
        require(approvers[msg.sender], "You must be a contributor to call this function");
        _;
    }

    modifier campaignActive() {
        require(isActive, "Campaign is not active");
        require(block.timestamp < deadline, "Campaign deadline has passed");
        _;
    }

    /**
     * @dev Enhanced constructor for campaign with full details
     */
    constructor(
        uint256 minimum,
        uint256 target,
        uint256 deadlineTimestamp,
        string memory campaignTitle,
        string memory campaignDescription,
        string memory campaignCategory,
        string memory campaignImageUrl,
        address creator
    ) {
        require(minimum > 0, "Minimum contribution must be greater than 0");
        require(target > minimum, "Target must be greater than minimum contribution");
        require(deadlineTimestamp > block.timestamp, "Deadline must be in the future");
        require(creator != address(0), "Creator address cannot be zero");
        require(bytes(campaignTitle).length > 0, "Title cannot be empty");
        
        manager = creator;
        minimumContribution = minimum;
        targetAmount = target;
        deadline = deadlineTimestamp;
        title = campaignTitle;
        description = campaignDescription;
        category = campaignCategory;
        imageUrl = campaignImageUrl;
        isActive = true;
        targetReached = false;
        totalRaised = 0;
    }

    /**
     * @dev Enhanced contribute function with optional message
     */
    function contribute(string memory message) external payable campaignActive {
        require(msg.value >= minimumContribution, "Contribution must be at least minimum amount");

        // Add to contributors if first time
        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            contributorsList.push(msg.sender);
            approversCount++;
        }
        
        // Update contribution tracking
        contributions[msg.sender] += msg.value;
        contributorHistory[msg.sender].push(Contribution({
            amount: msg.value,
            timestamp: block.timestamp,
            message: message
        }));
        
        totalRaised += msg.value;
        
        // Check if target reached
        if (!targetReached && totalRaised >= targetAmount) {
            targetReached = true;
            emit TargetReached(totalRaised, block.timestamp);
        }
        
        emit ContributionMade(msg.sender, msg.value, block.timestamp, message);
    }

    /**
     * @dev Legacy contribute function for backwards compatibility
     */
    function contribute() external payable campaignActive {
        require(msg.value >= minimumContribution, "Contribution must be at least minimum amount");

        // Add to contributors if first time
        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            contributorsList.push(msg.sender);
            approversCount++;
        }

        // Track contribution
        contributions[msg.sender] += msg.value;
        totalRaised += msg.value;

        // Add to contribution history
        contributorHistory[msg.sender].push(Contribution({
            amount: msg.value,
            timestamp: block.timestamp,
            message: ""
        }));

        // Check if target reached
        if (!targetReached && totalRaised >= targetAmount) {
            targetReached = true;
            emit TargetReached(totalRaised, block.timestamp);
        }

        emit ContributionMade(msg.sender, msg.value, block.timestamp, "");
    }

    /**
     * @dev Creates a new spending request
     */
    function createRequest(
        string memory requestDescription,
        uint256 value,
        address payable recipient
    ) external restricted {
        require(bytes(requestDescription).length > 0, "Description cannot be empty");
        require(value > 0, "Value must be greater than 0");
        require(recipient != address(0), "Recipient address cannot be zero");
        require(value <= address(this).balance, "Insufficient campaign balance");

        Request storage newRequest = requests.push();
        newRequest.description = requestDescription;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
        newRequest.createdAt = block.timestamp;
        
        emit RequestCreated(requests.length - 1, requestDescription, value, recipient);
    }

    /**
     * @dev Allows contributors to approve a spending request
     */
    function approveRequest(uint256 index) external validContributor {
        require(index < requests.length, "Request does not exist");
        
        Request storage request = requests[index];
        require(!request.approvals[msg.sender], "You have already approved this request");
        require(!request.complete, "Request is already complete");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
        
        emit RequestApproved(index, msg.sender);
    }

    /**
     * @dev Finalizes a spending request if it has enough approvals
     */
    function finalizeRequest(uint256 index) external restricted {
        require(index < requests.length, "Request does not exist");
        
        Request storage request = requests[index];
        require(!request.complete, "Request is already complete");
        require(request.approvalCount > (approversCount / 2), "Request needs more approvals");
        require(request.value <= address(this).balance, "Insufficient campaign balance");

        request.recipient.transfer(request.value);
        request.complete = true;
        
        emit RequestFinalized(index, request.recipient, request.value);
    }

    /**
     * @dev Allows contributors to request refunds if campaign fails
     */
    function requestRefund() external validContributor {
        require(block.timestamp > deadline, "Campaign is still active");
        require(!targetReached, "Campaign reached its target");
        require(contributions[msg.sender] > 0, "No contributions to refund");
        
        uint256 refundAmount = contributions[msg.sender];
        contributions[msg.sender] = 0;
        approvers[msg.sender] = false;
        approversCount--;
        
        payable(msg.sender).transfer(refundAmount);
        emit RefundIssued(msg.sender, refundAmount, block.timestamp);
    }

    /**
     * @dev Closes the campaign (manager only)
     */
    function closeCampaign() external restricted {
        isActive = false;
        emit CampaignClosed(block.timestamp, targetReached);
    }

    /**
     * @dev Returns campaign summary with enhanced information
     */
    function getSummary() external view returns (
        uint256,  // minimumContribution
        uint256,  // balance
        uint256,  // requestsCount
        uint256,  // approversCount
        address,  // manager
        uint256,  // targetAmount
        uint256,  // deadline
        bool,     // isActive
        bool,     // targetReached
        uint256   // totalRaised
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
            totalRaised
        );
    }

    /**
     * @dev Returns campaign details
     */
    function getCampaignDetails() external view returns (
        string memory,  // title
        string memory,  // description
        string memory,  // category
        string memory   // imageUrl
    ) {
        return (title, description, category, imageUrl);
    }

    /**
     * @dev Returns contributor's contribution history
     */
    function getContributorHistory(address contributor) external view returns (
        uint256[] memory amounts,
        uint256[] memory timestamps,
        string[] memory messages
    ) {
        Contribution[] storage history = contributorHistory[contributor];
        uint256 length = history.length;
        
        amounts = new uint256[](length);
        timestamps = new uint256[](length);
        messages = new string[](length);
        
        for (uint256 i = 0; i < length; i++) {
            amounts[i] = history[i].amount;
            timestamps[i] = history[i].timestamp;
            messages[i] = history[i].message;
        }
        
        return (amounts, timestamps, messages);
    }

    /**
     * @dev Returns all contributors
     */
    function getContributors() external view returns (address[] memory) {
        return contributorsList;
    }

    /**
     * @dev Returns request details
     */
    function getRequest(uint256 index) external view returns (
        string memory requestDescription,
        uint256 value,
        address recipient,
        bool complete,
        uint256 approvalCount
    ) {
        require(index < requests.length, "Request does not exist");
        
        Request storage request = requests[index];
        return (
            request.description,
            request.value,
            request.recipient,
            request.complete,
            request.approvalCount
        );
    }

    /**
     * @dev Returns the number of requests
     */
    function getRequestsCount() external view returns (uint256) {
        return requests.length;
    }

    /**
     * @dev Checks if an address has approved a specific request
     */
    function hasApproved(uint256 requestIndex, address approver) external view returns (bool) {
        require(requestIndex < requests.length, "Request does not exist");
        return requests[requestIndex].approvals[approver];
    }

    /**
     * @dev Returns campaign progress percentage (0-100)
     */
    function getProgress() external view returns (uint256) {
        if (targetAmount == 0) return 0;
        return (totalRaised * 100) / targetAmount;
    }

    /**
     * @dev Returns time remaining in seconds
     */
    function getTimeRemaining() external view returns (uint256) {
        if (block.timestamp >= deadline) return 0;
        return deadline - block.timestamp;
    }

    /**
     * @dev Returns current balance
     */
    function campaignBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Emergency withdraw (only after deadline and if target not reached)
     */
    function emergencyWithdraw() external restricted {
        require(block.timestamp > deadline + 30 days, "Emergency period not reached");
        require(!targetReached, "Cannot withdraw if target was reached");
        
        payable(manager).transfer(address(this).balance);
    }
}
