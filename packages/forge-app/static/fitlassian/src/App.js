import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import Rive from "@rive-app/react-canvas";

function App() {
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

  const BASE_URL = "https://raw.githubusercontent.com/DaoWise/fitlassian/main/assets/";

  useEffect(() => {
    invoke("get-story-points").then(setStoryPoints);
  }, []);

  if (!storyPoints) {
    return <div>Loading...</div>;
  }



  return (
    <div key={level}>
      <Rive src={`${BASE_URL}${levels[level]}`} style={{ height: "90vh", width: "100vw" }} />
      <div style={{display:'flex'}}>
        {Object.keys(levels).map((level, index) => {
          return <button onClick={() => setLevel(index + 1)}>Level {index + 1}</button>
        })}
      </div>
    </div>
  );
}

export default App;
