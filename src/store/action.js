export const UPDATE_LINE_USER_PROFILE = "UPDATE_LINE_PROFILE";

// action creator
export function updateLineUserProfile(profile) {
  return {
    type: UPDATE_LINE_USER_PROFILE,
    payload: { profile }
  };
}

export const UPDATE_TASK_LIST = "UPDATE_TASK_LIST";

// action creator
export function updateTaskList(taskList) {
  return {
    type: UPDATE_TASK_LIST,
    payload: { taskList }
  };
}