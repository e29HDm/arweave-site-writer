import ArLocal from 'arlocal';
import {runArLocalAndCreateContract, stopArlocal} from './helpers';
import {LikeState} from "../contracts/LikeContract/types";
import {Contract} from "warp-contracts";
import {initial_state} from "../contracts/LikeContract/initial_state";


describe('Testing the Like Contract', function () {
    let contractSourcePath: string = '../../contracts-dist/LikeContract/contract.js';
    let initialState: LikeState = initial_state();
    let arlocal: ArLocal;
    let contract: Contract<LikeState>;

    beforeAll(async () => {
        [arlocal, contract] = await runArLocalAndCreateContract(contractSourcePath, initialState);
    });

    afterAll(async () => {
        await stopArlocal(arlocal);
    });

    it('should read contract state', async () => {
        expect((await (contract).readState()).state).toEqual(initialState);
    });
});