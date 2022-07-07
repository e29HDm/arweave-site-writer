import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import {Contract, LoggerFactory, Warp, WarpNodeFactory} from "warp-contracts";
import fs from "fs";
import {InitialState} from "../../contracts/InitialState";
import {LikeState} from "../../contracts/LikeContract/types";

export class ArweaveTestingService {
    private readonly contractSrcPath: string;
    private readonly _initialState: InitialState;
    private _wallet: JWKInterface|undefined;
    private _walletAddress: string;
    private readonly _arweave: Arweave;
    private readonly _warp: Warp;
    private _contract: Contract<LikeState>|undefined;

    constructor(contractSourcePath: string, initialState: InitialState) {
        this.contractSrcPath = contractSourcePath;
        this._initialState = initialState;
        this._wallet = undefined;
        this._walletAddress = "";
        this._arweave = Arweave.init({
            host: 'localhost',
            port: 1820,
            protocol: 'http',
        });
        this._warp = WarpNodeFactory.forTesting(this._arweave);
        this._contract = undefined;
    }

    async init(): Promise<void> {
        LoggerFactory.INST.logLevel('error');
        await this.setupWallet();
        await this.addFunds();
        await this.createContract();
        await this.mineBlock();
    }

    private async setupWallet(): Promise<void> {
        this._wallet = await this._arweave.wallets.generate();
        this._walletAddress = await this._arweave.wallets.jwkToAddress(this._wallet);
    }

    async addFunds(): Promise<void> {
        const walletAddress = await this._arweave.wallets.getAddress(this._wallet);
        await this._arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
    }

    async mineBlock(): Promise<void> {
        await this._arweave.api.get('mine');
    }

    private async createContract(): Promise<void> {
        let contractSrc = fs.readFileSync(this.contractSrcPath, 'utf8');
        const {contractTxId} = await this._warp.createContract.deploy({
            wallet: this._wallet as JWKInterface,
            initState: JSON.stringify(this._initialState),
            src: contractSrc,
        });

        this._contract = this._warp.contract(contractTxId);
        this._contract.connect(this._wallet as JWKInterface);
    }

    get initialState(): InitialState {
        return this._initialState;
    }

    get wallet(): JWKInterface {
        if (this._wallet === undefined) {
            throw new Error("Wallet is undefined. Call init method first.")
        }
        return this._wallet;
    }

    get walletAddress(): string {
        return this._walletAddress;
    }

    get arweave(): Arweave {
        return this._arweave;
    }

    get warp(): Warp {
        return this._warp;
    }

    get contract(): Contract<LikeState> {
        if (this._contract === undefined) {
            throw new Error("Contract is undefined. Call init method first.")
        }
        return this._contract;
    }
}
