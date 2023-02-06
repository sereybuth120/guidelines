import React from "react";

const App = () => {
  const index = [1, 2, 2, 3, 3, 3];

  return index.map((idx) => <div key={idx * Math.random()}>{idx} test commit</div>);
};

export default App;
