import { JWKInterface } from "arweave/node/lib/wallet";

export class Wallet {
  private readonly _jwk: JWKInterface;
  private readonly _address: string;

  constructor(jwk: JWKInterface, address: string) {
    this._jwk = jwk;
    this._address = address;
  }

  get jwk(): JWKInterface {
    return this._jwk;
  }

  get address(): string {
    return this._address;
  }
}
