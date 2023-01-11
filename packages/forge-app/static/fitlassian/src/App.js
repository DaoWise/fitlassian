import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import { Rive } from "@rive-app/canvas";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke("getText", { example: "my-invoke-variable" }).then(setData);
  }, []);

  if (!data) {
    return (
      <Card>
        <LoadingContainer>
          <Spinner size="large" />
        </LoadingContainer>
      </Card>
    );
  }
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <Rive src="https://cdn.rive.app/animations/vehicles.riv" />
    </div>
  );
}

export default App;
