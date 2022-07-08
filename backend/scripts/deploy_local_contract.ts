import path from "path";
import { initial_state } from "../contracts/LikeContract/initial_state";
import { TestContractDeployer } from "../WarpHat/Deployer/TestContractDeployer";
import { ArweaveService } from "../WarpHat/Arweave/ArweaveService";

(async () => {
  const contractSrcPath = path.join(
    __dirname,
    "../../dist-contracts/LikeContract/contract.js"
  );

  const arweaveService = new ArweaveService();
  const wallet = await arweaveService.createWallet();
  const deployer = new TestContractDeployer(arweaveService);

  const contract = await deployer.createAndMineContract(
    contractSrcPath,
    initial_state(),
    wallet
  );

  console.log(`Contract deployed on ArLocal completed:  ${contract.txId()}`);
})();
