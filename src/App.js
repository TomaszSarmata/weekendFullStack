import "./style.css";
import CATEGORIES from "./data";
import { initialFacts } from "./data";
import { useState } from "react";

function App() {
  const [showForm, setShowForm] = useState(false);

  const appTitle = "Today I Learned";

  return (
    <>
      <Header
        appTitle={appTitle}
        setShowForm={setShowForm}
        showForm={showForm}
      ></Header>

      {showForm ? <NewFactForm /> : null}

      <main className="main">
        <CategoryFilter />
        <FactsList />
      </main>
    </>
  );
}

function Header({ appTitle, showForm, setShowForm }) {
  return (
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

      <button
        onClick={() => setShowForm(!showForm)}
        className="btn btn-large share-fact"
      >
        {showForm ? "close" : "share a fact"}
      </button>
    </header>
  );
}

function NewFactForm() {
  const [inputFact, setInputFact] = useState("");
  const [inputSource, setInputSource] = useState("");
  const [category, setCategory] = useState("");
  return (
    <form action="" className="fact-form">
      <input
        value={inputFact}
        onChange={(e) => {
          setInputFact(e.target.value);
        }}
        type="text"
        placeholder="Share a fact with the world"
      />
      <span>200</span>
      <input
        value={inputSource}
        onChange={(e) => {
          setInputSource(e.target.value);
        }}
        type="text"
        placeholder="Trustworthy source..."
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        name=""
        id=""
      >
        <option defaultChecked={true} value="">
          Choose Category
        </option>
        {CATEGORIES.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name.toLocaleUpperCase()}
          </option>
        ))}
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
