import "./style.css";

function App() {
  const appTitle = "Today I Learned";
  return (
    <>
      {/* HEADER - to be moved to a component */}
      <header className="header">
        <div className="logo">
          <img
            src="logo.png"
            alt="Today I learned logo"
            height="68px"
            width="68px"
          />
          <h1>{appTitle}</h1>
        </div>

        <button className="btn btn-large share-fact">Share A Fact</button>
      </header>
      <NewFactForm />
      <main className="main">
        <CategoryFilter />
        <FactsList />
      </main>
    </>
  );
}

function NewFactForm() {
  return (
    <form action="" className="fact-form">
      <input type="text" placeholder="Share a fact with the world" />
      <span>200</span>
      <input type="text" placeholder="Trustworthy source..." />
      <select name="" id="">
        <option value="">Choose Category</option>
        <option value="technology">Technology</option>
        <option value="science">Science</option>
        <option value="finance">Finance</option>
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>
        <li className="category">
          <button className="btn btn-category">Technology</button>
        </li>
        <li className="category">
          <button className="btn btn-category">Science</button>
        </li>
      </ul>
    </aside>
  );
}

function FactsList() {
  return (
    <section>
      <ul className="facts-list">
        <li className="fact">
          <p className="fact-text">
            React is being developed by Meta (formerly facebook)
            <a
              className="source"
              href="https://opensource.fb.com/"
              target="_blank"
            >
              (Source)
            </a>
          </p>
          <span className="tag">technology</span>
          <div className="vote-buttons">
            <button className="votes-interesting">👍 24</button>
            <button className="votes-mindblowing">🧐 9</button>
            <button className="votes-false">⛔️ 4</button>
          </div>
        </li>
        <li className="fact">
          <p>
            Millennial dads spend 3 times as much time with their kids than
            their fathers spent with them. In 1982, 43% of fathers had never
            changed a diaper. Today, that number is down to 3%
            <a
              className="source"
              target="_blank"
              href="https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids"
            >
              (Source)
            </a>
          </p>
          <span className="tag">society</span>
          <div className="vote-buttons">
            <button>👍 11</button>
            <button>🧐 2</button>
            <button>⛔️ 0</button>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default App;
