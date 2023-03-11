import { UPDATE_LINE_USER_PROFILE } from "./action";

const initialState = {
    // lineUserProfile: {
    //   displayName: "李佩芸",
    //   pictureUrl: "https://profile.line-scdn.net/0h1kk-zWtGbkRGVEViOIsQOzYEbS5lJTdWPWUhI3tcN3J_YCkXOWJ1cHNVYiApMykTb2EiKnZWOHJKRxkiWAKScEFkMHN8ZS8Tazclqg",
    //   statusMessage: "☀️🏖️😎👋🥲",
    //   userId: "U18204365d05108a3841a98aa1514fbb3"
    // }
    lineUserProfile: null
};

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_LINE_USER_PROFILE: {
          console.log("update store lineprofile")
          return {
            lineUserProfile: action.payload.profile
          };
        }
        default:
            return state
      }
    
}