import React, { useEffect, useReducer, useState } from "react";
import { invoke } from "@forge/bridge";
import Rive from "@rive-app/react-canvas";

import { appReducer } from "./reducers/appReducer";
import { APP_STATES } from './constants';
import InitializingScreen from './components/InitializingScreen';
import CheckStravaIntegration from './components/CheckStravaIntegration';
import ConnectToStrava from './components/ConnectToStrava';

const initialState = {
  appState: APP_STATES.INITIALIZING,
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [storyPoints, setStoryPoints] = useState(null);
  const [level, setLevel] = useState(1)
  const levels = {
    10: 'level10.riv',
    9: 'level09.riv',
    8: 'level08.riv',
    7: 'level07.riv',
    6: 'level06.riv',
    5: 'level05.riv',
    4: 'level04.riv',
    3: 'level03.riv',
    2: 'level02.riv',
    1: 'level01.riv'
  }

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
  }

  const BASE_URL = "https://raw.githubusercontent.com/DaoWise/fitlassian/main/assets/";

  return (
    <div key={level}>
      <Rive src={`${BASE_URL}${levels[level]}`} style={{ height: "90vh", width: "100vw" }} />
      <div style={{display:'flex'}}>
        {Object.keys(levels).map((level, index) => {
          return <button onClick={() => setLevel(index + 1)}>Level {index + 1}</button>
        })}

      </div>
      <div className="flex items-center justify-around">
        <button onClick={() => invoke("get-story-points").then(setStoryPoints)}>Refresh</button>
        {/* Remove this button */}
        <button onClick={() => invoke("disconnect-strava", state.assigneeAccountId)}>Disconnect Strava</button>
      </div>
    </div>
  );
}

export default App;
