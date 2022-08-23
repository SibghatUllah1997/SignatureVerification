const Signature = artifacts.require("Signature");



module.exports = async (deployer) => {

    deployer.deploy(Signature)
}