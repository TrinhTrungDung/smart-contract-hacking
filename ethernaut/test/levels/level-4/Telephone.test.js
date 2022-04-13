
const Telephone = artifacts.require('./levels/level-4/Telephone.sol')
const TelephoneFactory = artifacts.require('./levels/level-4/TelephoneFactory.sol')
const TelephoneAttack = artifacts.require('./levels/level-4/TelephoneAttack.sol')

const Ethernaut = artifacts.require('./Ethernaut.sol')
const utils = require('../../utils/TestUtils')


contract('Telephone', function(accounts) {

  let ethernaut
  let level
  let player = accounts[0]

  before(async function() {
    ethernaut = await Ethernaut.new();
    level = await TelephoneFactory.new()
    await ethernaut.registerLevel(level.address)
  });

  it('should fail if the player did not solve the level', async function() {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Telephone)

    const completed = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player
    )

    assert.isFalse(completed)
  });


  it('should allow the player to solve the level', async function() {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Telephone)

    const attacker = await TelephoneAttack.new()
    await attacker.attack(instance.address, player)

    const completed = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player
    )
    
    assert.isTrue(completed)
  });

});