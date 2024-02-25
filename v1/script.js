import CATEGORIES from "./data.js";
import { initialFacts } from "./data.js";

// SELECTING DOM ELEMENTS
const form = document.querySelector(".fact-form");
const shareFact = document.querySelector(".share-fact");

const factsList = document.querySelector(".facts-list");

// CREATE DOM ELEMENTS: render items from data.js
factsList.innerHTML = "";

//load data from supabase

async function loadFacts() {
  const res = await fetch(
    `https://tjtiuhuupegrrmkwvvgz.supabase.co/rest/v1/facts`,
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGl1aHV1cGVncnJta3d2dmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MTU3NzQsImV4cCI6MjAyNDE5MTc3NH0.dMtRdCq_6OVsEBVCrySwyaQ3X5t9bqbyDLE-Rr7JiIM",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGl1aHV1cGVncnJta3d2dmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MTU3NzQsImV4cCI6MjAyNDE5MTc3NH0.dMtRdCq_6OVsEBVCrySwyaQ3X5t9bqbyDLE-Rr7JiIM",
      },
    }
  );

  const data = await res.json();

  // const filteredData = data.filter((fact) => fact.category === "society");

  // console.log(filteredData);

  createFactsList(data);
}

loadFacts();

function createFactsList(data) {
  const htmlArr = data.map(
    (fact) => `<li class="fact">
  
        <p class="fact-text">
        ${fact.text}
          <a
            class="source"
            href=${fact.source}
            target="_blank"
            >(Source)</a
          >
        </p>
        <span class="tag" style="background-color: ${
          CATEGORIES.find((category) => category.name === fact.category).color
        }"
          >${fact.category}</span>
    
    </li>`
  );

  const html = htmlArr.join("");

  factsList.insertAdjacentHTML("afterbegin", html);
}

// const ourArray = [7, 64, 6, -23, 11].filter((number) => number > 10);

// console.log(ourArray);

// const ourNumber = [7, 64, 6, -23, 11].find((number) => number > 10);

// console.log(ourNumber);

//TOGGLE FORM VISIBILITY
shareFact.addEventListener("click", () => {
  form.classList.toggle("hidden");
  if (form.classList.contains("hidden")) {
    shareFact.textContent = "Share a Fact";
  } else {
    shareFact.textContent = "Close";
  }
});

// const allCategories = CATEGORIES.map((category) => category.name);

// console.log(allCategories);

// const facts = initialFacts.map((fact) => fact.text);
// const factAges = initialFacts.map((fact) => {
//   const now = new Date().getFullYear();
//   const age = now - fact.createdIn;
//   return age;
// });

// console.log(facts);
// console.log(factAges.join(" & "));

// const fact = ["lisbone is the capital", 2015, true];
// console.log(fact[fact.length - 1]);
// const [text, createdIn, x] = fact;
// console.log(text, createdIn, x);

// const newFact = [...fact, "society"];
// console.log(newFact);

// [2, 4, 6, 8].forEach((n) => console.log(n * 2));
// const map = [2, 4, 6, 8].map((n) => n * 2);
// console.log(map);

// const factObject = {
//   text: "lisbone is the capital of Portugal",
//   category: "society",
//   createdIn: 2015,
//   isCorrect: true,
//   createSummary: function () {
//     return `The fact "${
//       this.text
//     }" is from the category ${this.category.toUpperCase()}`;
//   },
// };

// console.log(factObject.text);
// console.log(factObject["text"]);

// const { category, isCorrect } = factObject;

// console.log(factObject.createSummary());
