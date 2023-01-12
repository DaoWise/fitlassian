import React from "react";
import { invoke } from '@forge/bridge';

const ConnectToStrava = ({ state, dispatch }) => {
  const { assigneeAccountId } = state;
  const connect = async () => {
    await invoke('set-strava-secret', { assigneeAccountId });
    dispatch({ 
      type: "STRAVA_CONNECTED",
    });
  }

  return <button onClick={connect}>Connect To Strava</button>
}

export default ConnectToStrava;