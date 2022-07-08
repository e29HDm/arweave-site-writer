import { AbstractContractDeployer } from "./AbstractContractDeployer";
import { InitialState } from "../../contracts/InitialState";
import { Wallet } from "../Wallet/Wallet";
import { Contract, WarpNodeFactory } from "warp-contracts";
import { JWKInterface } from "arweave/node/lib/wallet";
import { ArweaveService } from "../Arweave/ArweaveService";

export class TestContractDeployer extends AbstractContractDeployer {
  constructor(arweaveService: ArweaveService) {
    super(arweaveService);
    this._warp = WarpNodeFactory.forTesting(this._arweaveService.arweave);
  }

  async createAndMineContract(
    contractSrcPath: string,
    initialState: InitialState,
    wallet: Wallet
  ): Promise<Contract> {
    const contractTxId = await super.deploy(
      contractSrcPath,
      initialState,
      wallet
    );
    const contract = this._warp.contract(contractTxId);
    contract.connect(wallet.jwk as JWKInterface);
    await this._arweaveService.mineBlock();
    return contract;
  }
}
