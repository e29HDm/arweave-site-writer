import { LoggerFactory, Warp, WarpNodeFactory } from "warp-contracts";
import fs from "fs";
import { WalletIsUndefinedError } from "../Wallet/WalletIsUndefinedError";
import { JWKInterface } from "arweave/node/lib/wallet";
import { InitialState } from "../../contracts/InitialState";
import { Wallet } from "../Wallet/Wallet";
import { ArweaveService } from "../Arweave/ArweaveService";

export class AbstractContractDeployer {
  protected readonly _arweaveService: ArweaveService;
  protected _warp: Warp;

  constructor(arweaveService: ArweaveService) {
    this._arweaveService = arweaveService;
    this._warp = WarpNodeFactory.memCached(arweaveService.arweave);
    LoggerFactory.INST.logLevel("error");
  }

  async deploy(
    contractSrcPath: string,
    initialState: InitialState,
    wallet: Wallet
  ): Promise<string> {
    let contractSrc = fs.readFileSync(contractSrcPath, "utf8");

    if (wallet === undefined) {
      throw new WalletIsUndefinedError("Can't create contract");
    }

    const { contractTxId } = await this._warp.createContract.deploy({
      wallet: wallet.jwk as JWKInterface,
      initState: JSON.stringify(initialState),
      src: contractSrc,
    });

    return contractTxId;
  }
}
