
import { ContractResult, PstAction, PstState } from './types';
import {like} from "./actions/write/like";
import {dislike} from "./actions/write/dislike";
import {get_likes_count} from "./actions/read/get_likes_count";
import {get_dislikes_count} from "./actions/read/get_dislikes_count";

declare const ContractError;

export async function handle(state: PstState, action: PstAction): Promise<ContractResult> {
    const input = action.input;

    switch (input.function) {
        case 'like':
            return await like(state);
        case "dislike":
            return await dislike(state);
        case "get_likes_count":
            return await get_likes_count(state);
        case "get_dislikes_count":
            return await get_dislikes_count(state);
        default:
            throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
    }
}