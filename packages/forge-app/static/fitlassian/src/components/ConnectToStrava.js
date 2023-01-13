import React from "react";
import { invoke } from '@forge/bridge';

const ConnectToStrava = ({ state, dispatch }) => {
  const { assigneeAccountId } = state;
  const [showLoading, setShowLoading] = React.useState(false);
  const connect = async () => {
    setShowLoading(true)
    await invoke('set-strava-secret', { assigneeAccountId });
    setTimeout(() => {
      setShowLoading(false);
      dispatch({ 
        type: "STRAVA_CONNECTED",
      });
    }, 3000);
  }

  return <div className="h-full w-full flex items-center justify-center">
    <button onClick={connect} className={`btn btn-primary ${showLoading ? 'loading' : ''}`}>
      {!showLoading ? 'Connect To Strava' : 'Connecting'}
    </button>
  </div>
}

export default ConnectToStrava;