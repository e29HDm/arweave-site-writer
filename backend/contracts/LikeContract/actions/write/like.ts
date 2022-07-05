import { ContractResult, LikeState } from '../../types';

export const like = async (
    state: LikeState,
): Promise<ContractResult> => {
    state.likes_count += 1;
    return { state };
};