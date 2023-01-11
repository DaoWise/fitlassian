import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import { Rive } from "@rive-app/canvas";

function App() {
  const [storyPoints, setStoryPoints] = useState(null);

  useEffect(() => {
    invoke("get-story-points").then(setStoryPoints);
  }, []);

  if (!storyPoints) {
    return null;
  }
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      {/* <Rive src="https://cdn.rive.app/animations/vehicles.riv" /> */}

      <div>{storyPoints}</div>
    </div>
  );
}

export default App;
