import path from "path";
import { initial_state } from "../contracts/LikeContract/initial_state";
import jwk from "../../secrets/UvyEPOcYdrym2izVMwfafecchvTbD8_D_DXaiNq1XO0.json";
import { ContractDeployer } from "../WarpHat/Deployer/ContractDeployer";
import { ArweaveService } from "../WarpHat/Arweave/ArweaveService";

(async () => {
  const contractSrcPath = path.join(
    __dirname,
    "../../dist-contracts/LikeContract/contract.js"
  );

  const arweaveService = new ArweaveService({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
  const wallet = await arweaveService.createWallet(jwk);
  const deployer = new ContractDeployer(arweaveService);

  const contractTxId = await deployer.deploy(
    contractSrcPath,
    initial_state(),
    wallet
  );

  console.log("Deployment on Mainnet completed: " + contractTxId);
})();
