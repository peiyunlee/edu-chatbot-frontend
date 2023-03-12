import { UPDATE_LINE_USER_PROFILE, UPDATE_TASK_LIST }from "./action";

const initialState = {
    // lineUserProfile: {
    //   displayName: "李佩芸",
    //   pictureUrl: "https://profile.line-scdn.net/0h1kk-zWtGbkRGVEViOIsQOzYEbS5lJTdWPWUhI3tcN3J_YCkXOWJ1cHNVYiApMykTb2EiKnZWOHJKRxkiWAKScEFkMHN8ZS8Tazclqg",
    //   statusMessage: "☀️🏖️😎👋🥲",
    //   userId: "U18204365d05108a3841a98aa1514fbb3"
    // },
    lineUserProfile: null,
    taskList: [{
      student_id: null,
      tasks:[],
      title:'尚未分配！'
    }]
}

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_LINE_USER_PROFILE: {
          console.log("update store lineprofile")
          return {
            ...state,
            lineUserProfile: action.payload.profile
          };
        }
        case UPDATE_TASK_LIST: {
          console.log("update store taskLists")
          console.log(action.payload.taskList)
          return {
            ...state,
            taskList: action.payload.taskList
          };
        }
        default:
            return state
      }
    
}