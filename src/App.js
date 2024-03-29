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

  const [isLoading, setIsLoading] = useState(false);

  const [currentCategory, setCurrentCategory] = useState("all");

  const appTitle = "Today I Learned";

  useEffect(() => {
    getFacts();
  }, [currentCategory]);

  const getFacts = async () => {
    setIsLoading(true);

    let query = supabase.from("facts").select("*");

    if (currentCategory !== "all") {
      query = query.eq("category", `${currentCategory}`);
    }

    let { data: facts, error } = await query
      .order("votes_interesting", { ascending: false })
      .limit(100);

    if (error) console.error("error:", error);
    else setFactsArr(facts);
    setIsLoading(false);
    if (facts.length === 0) {
      setShowForm(true);
    }
  };

  // const handleCategory = async (category) => {
  //   setIsLoading(true);
  //   if (category === "all") {
  //     let { data: facts, error } = await supabase
  //       .from("facts")
  //       .select("*")
  //       .order("votes_interesting", { ascending: false })
  //       .limit(100);
  //     if (error) console.error("error:", error);
  //     else setFactsArr(facts);
  //     setIsLoading(false);
  //   } else {
  //     let { data: facts, error } = await supabase
  //       .from("facts")
  //       .select("*")
  //       .ilike("category", `%${category}%`);

  //     if (error) console.error("error:", error);
  //     else setFactsArr(facts);
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <Header
        appTitle={appTitle}
        setShowForm={setShowForm}
        showForm={showForm}
        setFormErrorMessage={setFormErrorMessage}
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
        <CategoryFilter
          // handleCategory={handleCategory}

          setCurrentCategory={setCurrentCategory}
        />
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <FactsList factsArr={factsArr} setFactsArr={setFactsArr}></FactsList>
        )}
      </main>
    </>
  );
}

function Loading() {
  return <div className="loader">loading...</div>;
}

function Header({ appTitle, showForm, setShowForm, setFormErrorMessage }) {
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
        onClick={() => {
          setShowForm(!showForm);
          setFormErrorMessage("");
        }}
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
  const [isUploading, setIsUploading] = useState(false);

  //Validate the url link as a valid source
  const isValidUrl = (link) => {
    try {
      const url = new URL(link);

      return url.protocol === "http:" || url.protocol === "https:";
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    // 1. Prevent the browser reload
    e.preventDefault();

    // 2. Check if data valid. If so, create a new fact (will have to create a state for the initialFacts and set the default to the variable that holds the initialFacts)
    if (!inputFact || !inputSource || !category) {
      setFormErrorMessage(
        "Please make sure you provide the fact along with the source link and choose the right category"
      );
      setTimeout(() => {
        setFormErrorMessage("");
      }, 5000);
    } else if (!isValidUrl(inputSource)) {
      setFormErrorMessage("Please provide a valid source link");
      setTimeout(() => {
        setFormErrorMessage("");
      }, 5000);
    } else {
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text: inputFact, source: inputSource, category: category }])
        .select();
      if (!error) {
        setFactsArr([newFact[0], ...factsArr]);
      }

      setIsUploading(false);
    }

    setInputFact("");
    setInputSource("");
    setCategory("");
    setTimeout(() => {
      setShowForm(!showForm);
    }, 1000);

    // setFormErrorMessage("");

    // 3. Create a new fact object and push it to the list of variable that holds initialFacts

    // 4. Update the UI

    // 5. Reset the input fileds to empty strings

    // 6. Close the form
  };

  return (
    <form action="" className="fact-form" onSubmit={handleSubmit}>
      <input
        disabled={isUploading}
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
        disabled={isUploading}
        value={inputSource}
        onChange={(e) => {
          setInputSource(e.target.value);
        }}
        type="text"
        placeholder="Trustworthy source..."
      />
      <select
        disabled={isUploading}
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
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ handleCategory, setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            onClick={() => {
              setCurrentCategory("all");
              // handleCategory("all");
            }}
            className="btn btn-all-categories"
          >
            All
          </button>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category.name} className="category">
            <button
              onClick={() => {
                setCurrentCategory(category.name);
                // handleCategory(category.name);
              }}
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

function FactsList({ factsArr, setFactsArr }) {
  if (factsArr.length === 0) {
    return (
      <div className="loader">
        There are currently no facts in this category. Use the form above to add
        a new fact ✌️
      </div>
    );
  }
  return (
    <section>
      <ul className="facts-list">
        {factsArr.map((fact) => (
          <Fact
            fact={fact}
            key={fact.id}
            factsArr={factsArr}
            setFactsArr={setFactsArr}
          ></Fact>
        ))}
      </ul>
      <p>there are {factsArr.length} facts in total</p>
    </section>
  );
}

function Fact({ fact, factsArr, setFactsArr }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const isDisputed =
    fact.votes_false > fact.votes_interesting + fact.votes_mind_blowing;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);
    if (!error)
      setFactsArr((factsArr) =>
        factsArr.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

  return (
    <li key={fact.id} className="fact">
      <p className="fact-text">
        {isDisputed ? <span className="disputed">[⛔️ DISPUTED]</span> : null}
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
        <button
          onClick={() => handleVote("votes_interesting")}
          disabled={isUpdating}
          className="votes-interesting"
        >
          👍 {fact.votes_interesting}
        </button>
        <button
          className="votes-mind_blowing"
          onClick={() => handleVote("votes_mind_blowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votes_mind_blowing}
        </button>
        <button
          className="votes-false"
          onClick={() => handleVote("votes_false")}
          disabled={isUpdating}
        >
          ⛔️ {fact.votes_false}
        </button>
      </div>
    </li>
  );
}

export default App;
