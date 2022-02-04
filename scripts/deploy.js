const hre = require('hardhat');

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();

    console.log('Deploying contracts with the account: ', deployer.address);

    const WavePortal = await hre.ethers.getContractFactory('WavePortal');
    const wave = await WavePortal.deploy();

    await wave.deployed();

    console.log(`Wave portal deployed to: ${wave.address}`)
}

main()
.then(() => {process.exit(0)})
.catch((err) => {
    console.error(err);
    process.exit(1);
});