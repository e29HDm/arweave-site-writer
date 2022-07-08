import { ContractResult, LikeState } from "../../types";

export const get_dislikes_count = async (
  state: LikeState
): Promise<ContractResult> => {
  const count = state.dislikes_count;
  return { result: { count } };
};
