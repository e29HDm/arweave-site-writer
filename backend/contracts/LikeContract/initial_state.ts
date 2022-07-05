import {LikeState} from "./types";

export const initial_state = (): LikeState => {
    return {
        "likes_count": 0,
        "dislikes_count": 0
    }
}