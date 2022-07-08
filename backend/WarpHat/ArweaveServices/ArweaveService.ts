import { Wallet } from "../Wallet/Wallet";
import { JWKInterface } from "arweave/node/lib/wallet";
import Arweave from "arweave";
import { ApiConfig } from "arweave/node/lib/api";

export class ArweaveService {
  private readonly _arweave: Arweave;

  constructor(config?: ApiConfig) {
    if (config === undefined) {
      config = {
        host: "localhost",
        port: 1984,
        protocol: "http",
      };
    }

    this._arweave = Arweave.init(config);
  }

  get arweave(): Arweave {
    return this._arweave;
  }

  async createWallet(
    jwk: JWKInterface | undefined = undefined
  ): Promise<Wallet> {
    let wallet: JWKInterface;
    let address: string;

    if (jwk === undefined) {
      wallet = await this._arweave.wallets.generate();
      await this.addFunds(wallet);
    } else {
      wallet = jwk as JWKInterface;
    }

    address = await this.getWalletAddress(wallet);

    return new Wallet(wallet, address);
  }

  async addFunds(
    wallet: JWKInterface,
    winston: number = 1_000_000_000_000_000
  ): Promise<void> {
    const walletAddress = await this._arweave.wallets.getAddress(wallet);
    await this._arweave.api.get(`/mint/${walletAddress}/${winston}`);
  }

  async mineBlock(): Promise<void> {
    await this._arweave.api.get("mine");
  }

  private async getWalletAddress(wallet: JWKInterface): Promise<string> {
    return await this._arweave.wallets.jwkToAddress(wallet);
  }
}
