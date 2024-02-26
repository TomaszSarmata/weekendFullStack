import "./style.css";

function App() {
  return (
    <header className="header">
      <div className="logo">
        <img
          src="logo.png"
          alt="Today I learned logo"
          height="68px"
          width="68px"
        />
        <h1>Today I learned</h1>
      </div>

      <button className="btn btn-large share-fact">Share A Fact</button>
    </header>
  );
}

export default App;
