import { ContractResult, LikeState } from "../../types";

export const get_likes_count = async (
  state: LikeState
): Promise<ContractResult> => {
  const count = state.likes_count;
  return { result: { count } };
};
