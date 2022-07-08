import { Contract } from "warp-contracts";
import { InitialState } from "../../contracts/InitialState";
import { LikeState } from "../../contracts/LikeContract/types";
import { Wallet } from "../Wallet/Wallet";
import { ArweaveService } from "./ArweaveService";
import { TestContractDeployer } from "../Deployer/TestContractDeployer";

export class ArweaveTestingService {
  private readonly contractSrcPath: string;
  private readonly _initialState: InitialState;
  private readonly _arweaveService: ArweaveService;

  constructor(contractSourcePath: string, initialState: InitialState) {
    this.contractSrcPath = contractSourcePath;
    this._initialState = initialState;
    this._arweaveService = new ArweaveService();
    this._contract = undefined;
  }

  private _wallet: Wallet | undefined;

  get wallet(): Wallet {
    if (this._wallet === undefined) {
      throw new Error("Wallet is undefined. Call init method first.");
    }
    return this._wallet;
  }

  private _contract: Contract<LikeState> | undefined;

  get contract(): Contract<InitialState> {
    if (this._contract === undefined) {
      throw new Error("Contract is undefined. Call init method first.");
    }
    return this._contract;
  }

  get arweaveService(): ArweaveService {
    return this._arweaveService;
  }

  async init(): Promise<void> {
    this._wallet = await this._arweaveService.createWallet();
    await this.deployContract();
  }

  private async deployContract(): Promise<void> {
    const deployer = new TestContractDeployer(this.arweaveService);
    this._contract = (await deployer.createAndMineContract(
      this.contractSrcPath,
      this._initialState,
      this.wallet
    )) as Contract<LikeState>;
  }
}
