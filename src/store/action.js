export const UPDATE_LINE_USER_PROFILE = "UPDATE_LINE_PROFILE";

// action creator
export function updateLineUserProfile(profile) {
  return {
    type: UPDATE_LINE_USER_PROFILE,
    payload: { profile }
  };
}