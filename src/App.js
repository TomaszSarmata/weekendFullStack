import "./style.css";
import CATEGORIES from "./data";
import { initialFacts } from "./data";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ width: "10%" }}>
      <div style={{ backgroundColor: "red", textAlign: "center" }}>{count}</div>
      <button style={{ width: "100%" }} onClick={() => setCount(count + 1)}>
        Increase the count!
      </button>
    </div>
  );
}

function App() {
  const appTitle = "Today I Learned";
  return (
    <>
      <Counter></Counter>
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
        {CATEGORIES.map((category) => (
          <li key={category.name} className="category">
            <button
              style={{ backgroundColor: category.color }}
              className="btn btn-category"
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactsList() {
  const facts = initialFacts;

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact fact={fact} key={fact.id}></Fact>
        ))}
      </ul>
      <p>there are {facts.length} facts in total</p>
    </section>
  );
}

function Fact({ fact }) {
  return (
    <li key={fact.id} className="fact">
      <p className="fact-text">
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: `${
            CATEGORIES.find((category) => category.name === fact.category).color
          }`,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button className="votes-interesting">
          👍 {fact.votesInteresting}
        </button>
        <button className="votes-mindblowing">
          🤯 {fact.votesMindblowing}
        </button>
        <button className="votes-false">⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
