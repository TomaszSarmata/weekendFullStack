import "./style.css";

function App() {
  return (
    <>
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
      <CategoryFilter />
    </>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li class="category">
          <button class="btn btn-all-categories">All</button>
        </li>
        <li class="category">
          <button
            class="btn btn-category"
            styleName="background-color: #3b82f6"
          >
            Technology
          </button>
        </li>
        <li class="category">
          <button
            class="btn btn-category"
            styleName="background-color: #16a34a"
          >
            Science
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default App;
