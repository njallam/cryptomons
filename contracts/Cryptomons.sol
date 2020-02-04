pragma solidity >=0.5.0 <0.7.0;

contract Cryptomons {
    struct Cryptomon {
        uint256 species;
        address payable owner;
        uint256 price;
    }

    address payable public manager;

    mapping(uint256 => Cryptomon) public cryptomons;
    uint256 public total = 0;

    constructor() public {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can call this.");
        _;
    }

    function create(uint256 species, uint256 price) public onlyManager {
        require(species >= 1 && species <= 151, "Unknown species.");
        Cryptomon storage cryptomon = cryptomons[total++];
        cryptomon.species = species;
        cryptomon.owner = manager;
        cryptomon.price = price;
    }

    function buy(uint256 id) public payable {
        Cryptomon storage cryptomon = cryptomons[id];
        require(cryptomon.owner != msg.sender, "Cryptomon already owned.");
        require(cryptomon.price > 0, "Cryptomon not for sale.");
        require(msg.value >= cryptomon.price, "Message value too low.");
        cryptomon.owner = msg.sender;
        cryptomon.price = 0;
        cryptomon.owner.transfer(cryptomon.price);
    }

    function sell(uint256 id, uint256 price) public {
        require(price > 0, "Price must be non-zero.");
        Cryptomon storage cryptomon = cryptomons[id];
        require(cryptomon.owner == msg.sender, "Cryptomon not owned.");
        cryptomon.price = price;
    }
}
