import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import Rive from "@rive-app/react-canvas";

function App() {
  const [storyPoints, setStoryPoints] = useState(null);

  useEffect(() => {
    invoke("get-story-points").then(setStoryPoints);
  }, []);

  if (!storyPoints) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        height: "90vh",
        width: "100vw",
      }}
    >
      <Rive src="https://cdn.rive.app/animations/vehicles.riv" />

      <div>{storyPoints?.toString()??0}</div>
    </div>
  );
}

export default App;
