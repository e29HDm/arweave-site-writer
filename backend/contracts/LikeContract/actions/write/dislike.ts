import { ContractResult, LikeState } from '../../types';

export const dislike = async (
    state: LikeState,
): Promise<ContractResult> => {
    state.dislikes_count += 1;
    return { state };
};