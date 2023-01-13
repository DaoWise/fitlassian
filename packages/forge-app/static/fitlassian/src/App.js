import React, { useEffect, useReducer, useState } from "react";
import { invoke } from "@forge/bridge";

import { appReducer } from "./reducers/appReducer";
import { APP_STATES } from './constants';
import InitializingScreen from './components/InitializingScreen';
import CheckStravaIntegration from './components/CheckStravaIntegration';
import ConnectToStrava from './components/ConnectToStrava';
import RenderAvatar from './components/RenderAvatar';

const initialState = {
  appState: APP_STATES.INITIALIZING,
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  

  useEffect(() => {
    (async () => {
      const assigneeAccountId = await invoke("get-assignee-account-id");
      dispatch({
        type: 'SET_USER_ACCOUNT_ID',
        payload: {
          assigneeAccountId,
        }
      })
    })();
  }, []);

  switch(state.appState) {
    case APP_STATES.INITIALIZING:
      return <InitializingScreen />
    case APP_STATES.CHECK_STRAVA_INTEGRATION:
      return <CheckStravaIntegration state={state} dispatch={dispatch} />
    case APP_STATES.CONNECT_TO_STRAVA:
      return <ConnectToStrava state={state} dispatch={dispatch} />
    case APP_STATES.RENDER_AVATAR:
      return <RenderAvatar state={state} dispatch={dispatch} />
    default:
      return null;
  }
}

export default App;
