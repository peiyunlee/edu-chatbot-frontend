export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

// action creator
export function updateUserProfile(profile) {
  return {
    type: UPDATE_USER_PROFILE,
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