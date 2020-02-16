pragma solidity >=0.5.0 <0.7.0;

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

    address payable public manager;
    mapping(uint256 => Species) public speciess;
    mapping(uint256 => Cryptomon) public cryptomons;
    uint256 public total = 0;

    constructor() public {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can call this.");
        _;
    }

    function addSpecies(uint256 id, Type type1, Type type2, uint256 maxHealth, uint256 attack, uint256 defence) public {
        speciess[id] = Species(type1, type2, maxHealth, attack, defence);
    }

    function createNew(uint256 species) private returns (uint newId) {
        require(species >= 1 && species <= 151, "Unknown species.");
        uint256 id = total++;
        Cryptomon storage cryptomon = cryptomons[id];
        cryptomon.species = species;
        cryptomon.health = speciess[species].maxHealth;
        return id;
    }

    function create(uint256 species, uint256 price) public onlyManager {
        uint256 id = createNew(species);
        Cryptomon storage cryptomon = cryptomons[id];
        cryptomon.price = price;
        cryptomon.owner = manager;
    }

    function buy(uint256 id) public payable {
        require(id < total, "Cryptomon does not exist.");
        Cryptomon storage cryptomon = cryptomons[id];
        require(cryptomon.owner != msg.sender, "Cryptomon already owned.");
        require(cryptomon.price > 0, "Cryptomon not for sale.");
        require(msg.value >= cryptomon.price, "Message value too low.");
        cryptomon.owner.transfer(cryptomon.price);
        cryptomon.owner = msg.sender;
        cryptomon.price = 0;
    }

    function sell(uint256 id, uint256 price) public {
        require(id < total, "Cryptomon does not exist.");
        Cryptomon storage cryptomon = cryptomons[id];
        require(cryptomon.owner == msg.sender, "Cryptomon not owned.");
        cryptomon.price = price;
    }

    function breed(uint256 firstId, uint256 secondId) public payable {
        require (firstId < total, "First cryptomon does not exist");
        require (secondId < total, "Second cryptomon not exist");
        require(msg.value >= 50 ether, "Message value too low.");
        Cryptomon memory first = cryptomons[firstId];
        Cryptomon memory second = cryptomons[secondId];
        require(first.species == second.species, "Both cryptomons must be of same species.");
        require(first.health > 0, "First cryptomon has no health.");
        require(second.health > 0, "Second cryptomon has no health.");
        uint256 id = createNew(first.species);
        Cryptomon storage cryptomon = cryptomons[id];
        cryptomon.owner = msg.sender;
    }

    function fight(uint256 attackerId, uint256 defenderId) public {
        require (attackerId < total, "Attacker does not exist.");
        require (defenderId < total, "Defender does not exist/");
        Cryptomon storage attacker = cryptomons[attackerId];
        Cryptomon storage defender = cryptomons[defenderId];
        require(attacker.owner == msg.sender, "You do not own the attacking cryptomon.");
        require(attacker.health > 0, "Attacker has no health.");
        require(defender.owner != msg.sender, "You own the defending cryptomon.");
        require(defender.health > 0, "Defender has no health.");

        Species memory attackerSpecies = speciess[attacker.species];
        Species memory defenderSpecies = speciess[defender.species];

        defender.health = safeSub(defender.health, 10 * (attackerSpecies.attack / defenderSpecies.defence));
        if (defender.health > 0) {
            attacker.health = safeSub(attacker.health, 10 * (defenderSpecies.attack / attackerSpecies.defence));
        }
    }

    function safeSub(uint256 a, uint256 b) private pure returns (uint256 c) {
        if (b >= a) {
            return 0;
        } else {
            return a - b;
        }
    }
}
