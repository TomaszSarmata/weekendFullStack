import CATEGORIES from "./data.js";
import { initialFacts } from "./data.js";

const form = document.querySelector(".fact-form");
const shareFact = document.querySelector(".share-fact");

shareFact.addEventListener("click", () => {
  form.classList.toggle("hidden");
  if (form.classList.contains("hidden")) {
    shareFact.textContent = "Share a Fact";
  } else {
    shareFact.textContent = "Close";
  }
});

const allCategories = CATEGORIES.map((category) => category.name);

console.log(allCategories);

const facts = initialFacts.map((fact) => fact.text);

console.log(facts);

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
