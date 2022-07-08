import path from 'path';
import {initial_state} from "../contracts/LikeContract/initial_state";
import {ArweaveService} from "../WarpHat/ArweaveServices/ArweaveService";
import {TestContractDeployer} from "../WarpHat/ContractDeployer/TestContractDeployer";
import jwk from "../../secrets/UvyEPOcYdrym2izVMwfafecchvTbD8_D_DXaiNq1XO0.json";

(async () => {
    const contractSrcPath = path.join(__dirname, '../../dist-contracts/LikeContract/contract.js')

    const arweaveService = new ArweaveService({
        host: 'testnet.redstone.tools',
        port: 443,
        protocol: 'https',
    });
    const wallet = await arweaveService.createWallet(jwk);
    const deployer = new TestContractDeployer(arweaveService);

    const contractTxId = await deployer.deploy(contractSrcPath, initial_state(), wallet);

    console.log('Deployment on Testnet completed: ' + contractTxId);
})();