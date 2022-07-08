import {Contract, LoggerFactory, Warp, WarpNodeFactory} from "warp-contracts";
import {InitialState} from "../../contracts/InitialState";
import {LikeState} from "../../contracts/LikeContract/types";
import {Wallet} from "../Wallet/Wallet";
import {ArweaveService} from "./ArweaveService";
import {TestContractDeployer} from "../ContractDeployer/TestContractDeployer";

export class ArweaveTestingService {
    private readonly contractSrcPath: string;
    private readonly _initialState: InitialState;
    private _wallet: Wallet|undefined;
    private readonly _arweaveService: ArweaveService;
    private readonly _warp: Warp;
    private _contract: Contract<LikeState>|undefined;

    constructor(contractSourcePath: string, initialState: InitialState) {
        this.contractSrcPath = contractSourcePath;
        this._initialState = initialState;
        this._arweaveService = new ArweaveService();
        this._warp = WarpNodeFactory.forTesting(this._arweaveService.arweave);
        this._contract = undefined;
    }

    async init(): Promise<void> {
        LoggerFactory.INST.logLevel('error');
        this._wallet = await this._arweaveService.createWallet();
        await this.deployContract();
    }

    async mineBlock(): Promise<void> {
        await this._arweaveService.mineBlock();
    }

    private async deployContract(): Promise<void> {
        const deployer = new TestContractDeployer(this.arweaveService);
        this._contract = await deployer.createAndMineContract(this.contractSrcPath, this._initialState, this.wallet) as Contract<LikeState>;
    }

    get initialState(): InitialState {
        return this._initialState;
    }

    get wallet(): Wallet {
        if (this._wallet === undefined) {
            throw new Error("Wallet is undefined. Call init method first.")
        }
        return this._wallet;
    }

    get arweaveService(): ArweaveService {
        return this._arweaveService;
    }

    get warp(): Warp {
        return this._warp;
    }

    get contract(): Contract<InitialState> {
        if (this._contract === undefined) {
            throw new Error("Contract is undefined. Call init method first.")
        }
        return this._contract;
    }
}
