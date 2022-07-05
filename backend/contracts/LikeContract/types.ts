export interface PstState {
    likes_count: number;
    dislikes_count:number;
}

export interface PstAction {
    input: PstInput;
    caller: string;
}

export interface PstInput {
    function: PstFunction;
}

export interface PstResult {
    count: number
}

export type PstFunction = 'like' | 'dislike' | 'get_likes_count' | 'get_dislikes_count';

export type ContractResult = { state: PstState } | { result: PstResult };