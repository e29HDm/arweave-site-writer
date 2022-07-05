import fs from 'fs';
import ArLocal from 'arlocal';
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import path from 'path';
import { addFunds, mineBlock } from './helpers';
import {
    Warp,
    WarpNodeFactory,
    LoggerFactory,
    InteractionResult, Contract,
} from 'warp-contracts';
import {initial_state} from "../contracts/LikeContract/initial_state";
import {LikeState} from "../contracts/LikeContract/types";

describe('Testing the Like Contract', function () {
    let contractSrc: string;
    let wallet: JWKInterface;
    let walletAddress: string;
    let initialState: LikeState;
    let arweave: Arweave;
    let arlocal: ArLocal;
    let warp: Warp;
    let contract: Contract<LikeState>;

    beforeAll(async () => {
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

        contractSrc = fs.readFileSync(path.join(__dirname, '../../contracts-dist/LikeContract/contract.js'), 'utf8');
        initialState = initial_state();

        const {contractTxId} = await warp.createContract.deploy({
            wallet,
            initState: JSON.stringify(initialState),
            src: contractSrc,
        });

        contract = warp.contract(contractTxId);
        contract.connect(wallet);

        await mineBlock(arweave);
    });

    afterAll(async () => {
        await arlocal.stop();
    });

    it('should read pst state and balance data', async () => {
        expect((await (contract).readState()).state).toEqual(initialState);
    });
});