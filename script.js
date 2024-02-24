import CATEGORIES from "./data.js";
import { initialFacts } from "./data.js";

// SELECTING DOM ELEMENTS
const form = document.querySelector(".fact-form");
const shareFact = document.querySelector(".share-fact");

const factsList = document.querySelector(".facts-list");

// CREATE DOM ELEMENTS: render items from data.js
factsList.innerHTML = "";

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
        <span class="tag" style="background-color: ${CATEGORIES.map(
          (category) => (category.name === fact.category ? category.color : "")
        )}"
          >${fact.category}</span>
    
    </li>`
  );

  const html = htmlArr.join("");

  factsList.insertAdjacentHTML("afterbegin", html);
}

createFactsList(initialFacts);

// console.log(htmlArr);

// console.log(html);

// factsList.insertAdjacentHTML("afterbegin", "<li>Tomasz</li>");
// factsList.insertAdjacentHTML("afterbegin", "<li>Mike</li>");
// factsList.insertAdjacentHTML("afterbegin", "<li>John</li>");

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
