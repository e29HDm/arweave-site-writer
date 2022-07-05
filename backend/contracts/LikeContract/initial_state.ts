import {PstState} from "./types";

export const initial_state = (): PstState => {
    return {
        "likes_count": 0,
        "dislikes_count": 0
    }
}