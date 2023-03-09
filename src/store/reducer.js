import { UPDATE_LINE_USER_PROFILE } from "./action";

const initialState = {
    lineUserProfile: null
};

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_LINE_USER_PROFILE: {
          console.log("update store lineprofile")
          return {
            lineUserProfile: state.profile
          };
        }
        default:
            return state
      }
    
}