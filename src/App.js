import "./style.css";
import CATEGORIES from "./data";
import { initialFacts } from "./data";
import { useEffect, useState } from "react";
import supabase from "./supabase";

function App() {
  const [showForm, setShowForm] = useState(false);
  // Create variable to hold initial facts from db
  const [factsArr, setFactsArr] = useState([]);

  const [formErrorMessage, setFormErrorMessage] = useState("");

  const appTitle = "Today I Learned";

  useEffect(() => {
    getFacts();
  }, []);

  const getFacts = async () => {
    let { data: facts, error } = await supabase.from("facts").select("*");
    if (error) console.error("error:", error);
    else setFactsArr(facts);
  };

  return (
    <>
      <Header
        appTitle={appTitle}
        setShowForm={setShowForm}
        showForm={showForm}
      ></Header>

      {showForm ? (
        <NewFactForm
          factsArr={factsArr}
          setFactsArr={setFactsArr}
          showForm={showForm}
          setShowForm={setShowForm}
          formErrorMessage={formErrorMessage}
          setFormErrorMessage={setFormErrorMessage}
        />
      ) : null}
      {formErrorMessage ? (
        <p style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
          {formErrorMessage}
        </p>
      ) : null}

      <main className="main">
        <CategoryFilter />
        <FactsList factsArr={factsArr} />
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

function NewFactForm({
  factsArr,
  setFactsArr,
  showForm,
  setShowForm,
  formErrorMessage,
  setFormErrorMessage,
}) {
  const [inputFact, setInputFact] = useState("");
  const [inputSource, setInputSource] = useState("http://example.com");
  const [category, setCategory] = useState("");

  //Validate the url link as a valid source
  const isValidUrl = (link) => {
    try {
      const url = new URL(link);

      return url.protocol === "http:" || url.protocol === "https:";
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    // 1. Prevent the browser reload
    e.preventDefault();

    // 2. Check if data valid. If so, create a new fact (will have to create a state for the initialFacts and set the default to the variable that holds the initialFacts)
    if (!inputFact || !inputSource || !category) {
      setFormErrorMessage(
        "Please make sure you provide the fact along with the source link and choose the right category"
      );
    } else if (!isValidUrl(inputSource)) {
      setFormErrorMessage("Please provide a valid source link");
    } else {
      const newFact = {
        id: `fact-${Date.now()}`,
        text: inputFact,
        source: inputSource,
        category: category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };
      setFactsArr([newFact, ...factsArr]);
      setInputFact("");
      setInputSource("");
      setCategory("");
      setShowForm(!showForm);
      setFormErrorMessage("");
    }

    // 3. Create a new fact object and push it to the list of variable that holds initialFacts

    // 4. Update the UI

    // 5. Reset the input fileds to empty strings

    // 6. Close the form
  };

  return (
    <form action="" className="fact-form" onSubmit={handleSubmit}>
      <input
        value={inputFact}
        onChange={(e) => {
          if (inputFact.length <= 200) {
            setInputFact(e.target.value);
          } else if (inputFact.length > 200) {
            setFormErrorMessage(
              "Please make sure your fact is no longer than 200 characters"
            );
          }
          if (inputFact.length <= 200) {
            setFormErrorMessage("");
          }
        }}
        type="text"
        placeholder="Share a fact with the world"
      />
      <span>{200 - inputFact.length}</span>
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
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        name=""
        id=""
      >
        <option value="">Choose Category</option>
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

function FactsList({ factsArr }) {
  return (
    <section>
      <ul className="facts-list">
        {factsArr.map((fact) => (
          <Fact fact={fact} key={fact.id}></Fact>
        ))}
      </ul>
      <p>there are {factsArr.length} facts in total</p>
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
