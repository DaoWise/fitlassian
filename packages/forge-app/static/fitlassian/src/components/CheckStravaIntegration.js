import React from "react";
import { invoke } from "@forge/bridge";

const CheckStravaIntegration = ({ state, dispatch }) => {
  const { assigneeAccountId } = state;

  React.useEffect(() => {
    (async () => {
      const isStravaConnected = await invoke("check-is-strava-connected");
      if(isStravaConnected) {
        dispatch({
          type: 'STRAVA_CONNECTED',
        })
      } else {
        dispatch({
          type: 'STRAVA_NOT_CONNECTED',
        })
      }
    })();
  }, [assigneeAccountId]);

  return (
    <div className="animate-pulse text-2xl text-gray-700 h-full w-full flex items-center justify-center italic">Checking Strava Integration...</div>
  );
}

export default CheckStravaIntegration;