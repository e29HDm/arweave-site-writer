import { ContractResult, PstState } from '../../types';

export const get_dislikes_count = async (
    state: PstState
): Promise<ContractResult> => {
    const count = state.dislikes_count;
    return { result: { count } };
};