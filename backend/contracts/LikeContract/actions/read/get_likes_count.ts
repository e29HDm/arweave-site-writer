import { ContractResult, PstState } from '../../types';

export const get_likes_count = async (
    state: PstState
): Promise<ContractResult> => {
    const count = state.likes_count;
    return { result: { count } };
};