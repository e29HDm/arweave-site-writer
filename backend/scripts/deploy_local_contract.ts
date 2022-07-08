import path from 'path';
import {initial_state} from "../contracts/LikeContract/initial_state";
import {ArweaveService} from "../WarpHat/ArweaveServices/ArweaveService";
import {TestContractDeployer} from "../WarpHat/ContractDeployer/TestContractDeployer";

(async () => {
    const contractSrcPath = path.join(__dirname, '../../dist-contracts/LikeContract/contract.js')

    const arweaveService = new ArweaveService();
    const wallet = await arweaveService.createWallet();
    const deployer = new TestContractDeployer(arweaveService);

    const contract = await deployer.createAndMineContract(contractSrcPath, initial_state(), wallet);

    console.log(`Contract deployed on ArLocal completed:  ${contract.txId()}`);
})();