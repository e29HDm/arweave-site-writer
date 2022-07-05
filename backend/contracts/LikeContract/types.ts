import {Contract} from "warp-contracts";

export interface LikeState {
    likes_count: number;
    dislikes_count:number;
}

export interface LikeAction {
    input: LikeInput;
    caller: string;
}

export interface LikeInput {
    function: LikeFunction;
}

export interface LikeResult {
    count: number
}

export type LikeFunction = 'like' | 'dislike' | 'get_likes_count' | 'get_dislikes_count';

export type ContractResult = { state: LikeState } | { result: LikeResult };