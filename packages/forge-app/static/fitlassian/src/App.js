import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import { Rive } from "@rive-app/canvas";


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);

    new Rive({
      // Hosted .riv asset, or a local one. Uncomment line 8 to try with
      // a local basketball.riv asset, or add your own!
      src: "https://cdn.rive.app/animations/vehicles.riv",
      // src: "basketball.riv",
      canvas: document.getElementById("canvas"),
      autoplay: true
    });
  }, []);

  return (
    <div>
      {data ? data : 'Loading...'}
      <canvas id="canvas" />
    </div>
  );
}

export default App;
