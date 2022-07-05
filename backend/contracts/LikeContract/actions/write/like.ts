import { ContractResult, PstState } from '../../types';

export const like = async (
    state: PstState,
): Promise<ContractResult> => {
    state.likes_count += 1;
    return { state };
};