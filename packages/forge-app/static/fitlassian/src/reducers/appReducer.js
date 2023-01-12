import { APP_STATES } from "../constants";

export const appReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case 'SET_USER_ACCOUNT_ID':
      return {
        ...state,
        assigneeAccountId: payload.assigneeAccountId,
        appState: APP_STATES.CHECK_STRAVA_INTEGRATION,
      }
    case 'STRAVA_CONNECTED':
      return {
        ...state,
        appState: APP_STATES.RENDER_AVATAR,
        isStravaConnected: true,
      }
    case 'STRAVA_NOT_CONNECTED':
      return {
        ...state,
        appState: APP_STATES.CONNECT_TO_STRAVA,
        isStravaConnected: true,
      }
    default:
      return state;
  }
};