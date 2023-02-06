import React from "react";

const App = () => {
  const index = [1, 2, 2, 3, 3, 3];
  const string = "12";

  index.map((idx) => (
    <div key={idx * Math.random()}>
      {idx} {string}
    </div>
  ));
};

export default App;
