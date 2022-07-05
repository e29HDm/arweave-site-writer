import { ContractResult, PstState } from '../../types';

export const dislike = async (
    state: PstState,
): Promise<ContractResult> => {
    state.dislikes_count += 1;
    return { state };
};