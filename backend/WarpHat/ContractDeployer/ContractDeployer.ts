import { AbstractContractDeployer } from "./AbstractContractDeployer";
import { ArweaveService } from "../ArweaveServices/ArweaveService";

export class ContractDeployer extends AbstractContractDeployer {
  constructor(arweaveService: ArweaveService) {
    super(arweaveService);
  }
}
