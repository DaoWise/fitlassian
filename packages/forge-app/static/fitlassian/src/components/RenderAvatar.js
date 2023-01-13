import React from 'react';
import { invoke } from '@forge/bridge';
import Rive from "@rive-app/react-canvas";
import {RiShutDownLine} from 'react-icons/ri';

import { BASE_URL } from '../constants';

const RenderAvatar = ({ state, dispatch }) => {
  const [assigneeHealthGoal, setAssigneeHealthGoal] = React.useState();
  const [totalDistanceCovered, setTotalDistanceCovered] = React.useState();
  const [showDisconnect, setShowDisconnect] = React.useState(false);

  const { assigneeAccountId } = state;

  React.useEffect(() => {
    (async () => {
      const totalDistanceCoveredFromStrava = await invoke('get-total-distance-covered', {assigneeAccountId});
      setTotalDistanceCovered(totalDistanceCoveredFromStrava);
    })();
  }, [state]);


  const getTotalHealthGoal = async () => {
    const totalHealthGoal = await invoke('get-total-healthGoal', {assigneeAccountId});
    setAssigneeHealthGoal(totalHealthGoal);
  }

  React.useEffect(() => {
    (async () => {
      await getTotalHealthGoal();
    })();
  }, [state]);

  React.useEffect(() => {
    (async () => {
      const currentUserId = await invoke('get-current-user-id');
      setShowDisconnect(currentUserId == assigneeAccountId);
    })();
  }, [state]);

  if(!totalDistanceCovered) {
    return null;
  }

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

  const getLevel = (distanceCovered) => {
    if(distanceCovered < 2.5) {
      return 1;
    }
    if(distanceCovered >= 2.5 && distanceCovered <= 7.5) {
      return 2;
    }
    if(distanceCovered >= 7.6 && distanceCovered <= 15) {
      return 3;
    }
    if(distanceCovered >= 15.1 && distanceCovered <= 25) {
      return 4;
    }
    if(distanceCovered >= 25.1 && distanceCovered <= 40) {
      return 5;
    }
    if(distanceCovered >= 40.1 && distanceCovered <= 60) {
      return 6;
    }
    if(distanceCovered >= 60.1 && distanceCovered <= 90) {
      return 7;
    }
    if(distanceCovered >= 90.1 && distanceCovered <= 150) {
      return 8;
    }
    if(distanceCovered >= 150.1 && distanceCovered <= 250) {
      return 9;
    }
    if(distanceCovered >= 250.1 && distanceCovered <= 450) {
      return 10;
    }
  }

  return (
    <div className="w-full h-full flex justify-center">
      <Rive src={`${BASE_URL}${levels[getLevel(totalDistanceCovered)]}`} className="flex-1 h-full" />
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center justify-center text-4xl space-x-2">
          <span className>{totalDistanceCovered}</span>
          <span>/</span>
          <span>{assigneeHealthGoal}</span>
        </div>
        <div className="flex items-center justify-center text-xs font-bold space-x-2">
          <span className="text-right">Total Distance Covered</span>
          <span>/</span>
          <span>Health Goal</span>
        </div>
        <div className='flex items-center justify-center space-x-4'>

        <button className="btn btn-info btn-outline btn-sm" onClick={async () => await getTotalHealthGoal()}>Refresh</button>
        {
          showDisconnect && 
          <div className="tooltip" data-tip="Disconnect Strava">
            <button className='btn btn-circle btn-sm btn-error' onClick={() => invoke("disconnect-strava", {assigneeAccountId: state.assigneeAccountId})}><RiShutDownLine /></button>
          </div>
        }
        </div>
      </div>
    </div>
  );
}

export default RenderAvatar;