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
