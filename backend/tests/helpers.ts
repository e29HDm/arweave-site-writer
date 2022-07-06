import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import ArLocal from "arlocal";
import {Contract, LoggerFactory, Warp, WarpNodeFactory} from "warp-contracts";
import fs from "fs";
import path from "path";
import {InitialState} from "../contracts/InitialState";
import {LikeState} from "../contracts/LikeContract/types";

export async function addFunds(arweave: Arweave, wallet: JWKInterface) {
    const walletAddress = await arweave.wallets.getAddress(wallet);
    await arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
}

export async function mineBlock(arweave: Arweave) {
    await arweave.api.get('mine');
}

export async function runArLocalAndCreateContract(contractSourcePath: string, initialState: InitialState): Promise<[ArLocal, Contract<LikeState>]> {
    let contractSrc: string;
    let wallet: JWKInterface;
    let walletAddress: string;
    let arweave: Arweave;
    let warp: Warp;
    let arlocal: ArLocal;
    let contract: Contract<LikeState>;

    arlocal = new ArLocal(1820);
    await arlocal.start();

    arweave = Arweave.init({
        host: 'localhost',
        port: 1820,
        protocol: 'http',
    });

    LoggerFactory.INST.logLevel('error');

    warp = WarpNodeFactory.forTesting(arweave);
    wallet = await arweave.wallets.generate();
    await addFunds(arweave, wallet);
    walletAddress = await arweave.wallets.jwkToAddress(wallet);

    contractSrc = fs.readFileSync(path.join(__dirname, contractSourcePath), 'utf8');
    const {contractTxId} = await warp.createContract.deploy({
        wallet,
        initState: JSON.stringify(initialState),
        src: contractSrc,
    });

    contract = warp.contract(contractTxId);
    contract.connect(wallet);

    await mineBlock(arweave);

    return [arlocal, contract];
}

export async function stopArlocal(arlocal: ArLocal) {
    await arlocal.stop();
}