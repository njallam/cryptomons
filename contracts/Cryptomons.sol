pragma solidity >=0.5.0 <0.7.0;

/// @title Cryptomons game
/// @author Nicholas Allam
contract Cryptomons {
    enum Type {
        NORMAL, // 0
        FIGHTING, // 1
        FLYING, // 2
        POISON, // 3
        GROUND, // 4
        ROCK, // 5
        BUG, // 6
        GHOST, // 7
        STEEL, // 8
        FIRE, // 9
        WATER, // 10
        GRASS, // 11
        ELECTRIC, // 12
        PSYCHIC, // 13
        ICE, // 14
        DRAGON, // 15
        DARK, // 16
        FAIRY // 17
    }

    struct Species {
        Type type1;
        Type type2;
        uint256 maxHealth;
        uint256 attack;
        uint256 defence;
    }

    struct Cryptomon {
        uint256 species;
        address payable owner;
        uint256 price;
        uint256 health;
    }

    /// @notice Manager of the contract
    address payable public manager;
    /// @notice Mapping of all known species
    mapping(uint256 => Species) public speciess;
    /// @notice Mapping of all exiting cryptomons
    mapping(uint256 => Cryptomon) public cryptomons;
    /// @notice Total number of cryptomons
    uint256 public total = 0;

    /// @dev Manager initialised to the deployer of the contract
    constructor() public {
        manager = msg.sender;
    }

    /// @dev Modifier to restrict calling to only the manager
    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can call this");
        _;
    }

    /// @notice Add a new species to the game
    /// @dev Species 1-151 are supported only
    /// @param id Species ID
    /// @param type1 Main type
    /// @param type2 Secondary type or same same as main type
    /// @param maxHealth Maximum health value
    /// @param attack Attack value
    /// @param defence Defence value
    function addSpecies(uint256 id, Type type1, Type type2, uint256 maxHealth, uint256 attack, uint256 defence) public onlyManager {
        require(id >= 1 && id <= 151, "Invalid species ID");
        speciess[id] = Species(type1, type2, maxHealth, attack, defence);
    }

    /// @dev Cryptomon is not fully initialised by this function, owner and price must be set
    /// @param species ID of the species to be created
    /// @return ID of the new cryptomon
    function createNew(uint256 species) private returns (uint newId) {
        require(species >= 1 && species <= 151, "Unknown species");
        uint256 id = total++;
        Cryptomon storage cryptomon = cryptomons[id];
        cryptomon.species = species;
        cryptomon.health = speciess[species].maxHealth;
        return id;
    }

    /// @notice Create a new cryptomon
    /// @param species ID of the species to be created
    /// @param price Price to sell cryptomon ('0' if not for sale)
    function create(uint256 species, uint256 price) public onlyManager {
        uint256 id = createNew(species);
        Cryptomon storage cryptomon = cryptomons[id];
        cryptomon.price = price;
        cryptomon.owner = manager;
    }

    /// @notice Purchase a cryptomon which is for sale
    /// @param id ID of cryptomon to buy
    function buy(uint256 id) public payable {
        require(id < total, "Cryptomon does not exist");
        Cryptomon storage cryptomon = cryptomons[id];
        require(cryptomon.owner != msg.sender, "Cryptomon already owned");
        require(cryptomon.price > 0, "Cryptomon not for sale");
        require(msg.value >= cryptomon.price, "Message value too low");

        cryptomon.owner.transfer(cryptomon.price);
        cryptomon.owner = msg.sender;
        cryptomon.price = 0;
    }

    /// @notice List a cryptomon for sale
    /// @param id ID of cryptomon to list for sale
    /// @param price Price to sell cryptomon ('0' if not for sale)
    function sell(uint256 id, uint256 price) public {
        require(id < total, "Cryptomon does not exist");
        Cryptomon storage cryptomon = cryptomons[id];
        require(cryptomon.owner == msg.sender, "Cryptomon not owned");

        cryptomon.price = price;
    }

    /// @notice Breed two cryptomons of the same species, owned by the sender
    /// @param firstId ID of the first cryptomon
    /// @param secondId ID of the first cryptomon
    function breed(uint256 firstId, uint256 secondId) public payable {
        require(firstId < total, "First cryptomon does not exist");
        require(secondId < total, "Second cryptomon not exist");
        require(firstId != secondId, "Cryptomon cannot breed with itself");
        require(msg.value >= 50 ether, "Message value too low");
        Cryptomon memory first = cryptomons[firstId];
        Cryptomon memory second = cryptomons[secondId];
        require(first.species == second.species, "Both cryptomons must be of same species");
        require(first.owner == msg.sender, "You do not own the first cryptomon");
        require(second.owner == msg.sender, "You do not own the second cryptomon");
        require(first.health > 0, "First cryptomon has no health");
        require(second.health > 0, "Second cryptomon has no health");

        uint256 id = createNew(first.species);
        Cryptomon storage cryptomon = cryptomons[id];
        cryptomon.owner = msg.sender;
        cryptomon.price = 0;
    }

    /// @notice Attack, using a cryptomon owned by the sender, a defending cryptomon owned by another player
    /// @param attackerId ID of the attacking cryptomon (owned by the sender)
    /// @param defenderId ID of the defending cryptomon (not owned by the sender)
    function fight(uint256 attackerId, uint256 defenderId) public {
        require(attackerId < total, "Attacker does not exist");
        require(defenderId < total, "Defender does not exist");
        Cryptomon storage attacker = cryptomons[attackerId];
        Cryptomon storage defender = cryptomons[defenderId];
        require(attacker.owner == msg.sender, "You do not own the attacking cryptomon");
        require(attacker.health > 0, "Attacker has no health");
        require(defender.owner != msg.sender, "You own the defending cryptomon");
        require(defender.health > 0, "Defender has no health");

        Species memory attackerSpecies = speciess[attacker.species];
        Species memory defenderSpecies = speciess[defender.species];

        defender.health = safeSub(defender.health, (10 * attackerSpecies.attack / defenderSpecies.defence));
        if (defender.health > 0) {
            attacker.health = safeSub(attacker.health, (10 * defenderSpecies.attack / attackerSpecies.defence));
        }
    }

    /// @dev Safely subtract two uints
    /// @param a Minuend
    /// @param b Subtrahend
    /// @return 0 if subtrahend > minuend, otherwise difference
    function safeSub(uint256 a, uint256 b) private pure returns (uint256 c) {
        if (b >= a) {
            return 0;
        } else {
            return a - b;
        }
    }
}
