const App = () => {
  const index = [1, 2, 2, 3, 3, 3];
  const string = 'abc' 
  return index.map((idx) => <div key={idx * Math.random()}>{idx} test commit</div>);
};

export default App;
