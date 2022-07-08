import { AbstractContractDeployer } from "./AbstractContractDeployer";
import { ArweaveService } from "../Arweave/ArweaveService";

export class ContractDeployer extends AbstractContractDeployer {
  constructor(arweaveService: ArweaveService) {
    super(arweaveService);
  }
}
