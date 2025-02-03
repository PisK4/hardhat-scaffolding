import { network } from "hardhat";
import { ethers } from "hardhat";

async function main() {
    console.log("Starting deployment of ExampleToken contract...");

    const [deployer] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);

    const ExampleToken = await ethers.getContractFactory("ExampleToken");
    const token = await ExampleToken.deploy(
        "Example Token", // name
        "EXT", // symbol
        ethers.parseEther("1000000") // initial supply: 1,000,000 tokens
    );

    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();

    console.log("ExampleToken deployed successfully!");
    console.log("Contract address:", tokenAddress);

    // Print contract information
    console.log("\nContract Information:");
    console.log("- Name:", await token.name());
    console.log("- Symbol:", await token.symbol());
    console.log("- Total Supply:", ethers.formatEther(await token.totalSupply()), "EXT");
    console.log("- Deployer Balance:", ethers.formatEther(await token.balanceOf(deployer.address)), "EXT");

    // Verification parameters
    console.log("\nVerification Command:");
    console.log(`npx hardhat verify --network ${network.name} ${tokenAddress} "Example Token" "EXT" ${ethers.parseEther("1000000")}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}); 