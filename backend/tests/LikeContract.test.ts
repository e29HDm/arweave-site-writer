import {LikeResult, LikeState} from "../contracts/LikeContract/types";
import {initial_state} from "../contracts/LikeContract/initial_state";
import {ArLocalServer} from "./ArweaveTestingService/ArLocalServer";
import {ArweaveTestingService} from "./ArweaveTestingService/ArweaveTestingService";
import {Contract} from "warp-contracts";
import path from "path";


describe('Testing the Like Contract', function () {
    const arlocal: ArLocalServer = new ArLocalServer();
    const contractSrcPath = path.join(__dirname, '../../dist-contracts/LikeContract/contract.js');
    let testService: ArweaveTestingService = new ArweaveTestingService(contractSrcPath, initial_state());
    let contract: Contract<LikeState>;

    beforeAll(async () => {
        await arlocal.start();
        await testService.init();
        contract = testService.contract;
    });

    afterAll(async () => {
        await arlocal.stop();
    });

    it('should read contract state', async () => {
        expect((await contract.readState()).state).toEqual(initial_state());
    });

    it('should read current likes and dislikes counts', async () => {
        let result: unknown;

        ({result: result}  = (await contract.viewState({
            function: 'get_likes_count',
        })));
        expect((result as LikeResult).count).toEqual(0);

        ({result: result} = (await contract.viewState({
            function: 'get_dislikes_count',
        })));
        expect((result as LikeResult).count).toEqual(0);
    });

    it('should add a like', async () => {
        let result: unknown;

        // likes count should be equal to 0
        ({result: result}  = (await contract.viewState({
            function: 'get_likes_count',
        })));
        expect((result as LikeResult).count).toEqual(0);

        // add a like
        await contract.writeInteraction({
            function: 'like',
        })

        await testService.mineBlock();

        // likes count should be equal to 1
        ({result: result}  = (await contract.viewState({
            function: 'get_likes_count',
        })));
        expect((result as LikeResult).count).toEqual(1);
    });

    it('should add a dislike', async () => {
        let result: unknown;

        // dislike count should be equal to 0
        ({result: result}  = (await contract.viewState({
            function: 'get_dislikes_count',
        })));
        expect((result as LikeResult).count).toEqual(0);

        // add a dislike
        await contract.writeInteraction({
            function: 'dislike',
        })

        await testService.mineBlock();

        // dislike count should be equal to 1
        ({result: result}  = (await contract.viewState({
            function: 'get_dislikes_count',
        })));
        expect((result as LikeResult).count).toEqual(1);
    });

    it('should add a dislike and likes', async () => {
        let like_count: unknown;
        let dislikes_count: unknown;

        // likes count should be equal to 1
        ({result: like_count}  = (await contract.viewState({
            function: 'get_likes_count',
        })));
        expect((like_count as LikeResult).count).toEqual(1);

        // dislike count should be equal to 1
        ({result: dislikes_count}  = (await contract.viewState({
            function: 'get_dislikes_count',
        })));
        expect((dislikes_count as LikeResult).count).toEqual(1);

        // add 2 like
        await contract.writeInteraction({
            function: 'like',
        })

        await contract.writeInteraction({
            function: 'like',
        })

        // add 3 dislike
        await contract.writeInteraction({
            function: 'dislike',
        })

        await contract.writeInteraction({
            function: 'dislike',
        })

        await contract.writeInteraction({
            function: 'dislike',
        })

        await testService.mineBlock();

        // likes count should be equal to 3
        ({result: like_count}  = (await contract.viewState({
            function: 'get_likes_count',
        })));
        expect((like_count as LikeResult).count).toEqual(3);

        // dislike count should be equal to 4
        ({result: dislikes_count}  = (await contract.viewState({
            function: 'get_dislikes_count',
        })));
        expect((dislikes_count as LikeResult).count).toEqual(4);
    });

    it("should dry write like action", async () => {
        let result: unknown;
        const newWallet = await testService.arweave.wallets.generate();
        const overwrittenCaller = await testService.arweave.wallets.jwkToAddress(newWallet);

        // likes count should be equal to 0
        ({result: result} = (await contract.viewState({
            function: 'get_likes_count',
        })));
        expect((result as LikeResult).count).toEqual(3);

        // add a like dry run
        const {state: state} = await contract.dryWrite({
            function: 'like',
        }, overwrittenCaller);

        expect(state.likes_count).toEqual(4);
        expect((await contract.readState()).state.likes_count).toEqual(3);
    })
});