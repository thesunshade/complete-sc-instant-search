import { exactData } from "./data/exact.js";
import { normalizedData } from "./data/normalized.js";
import normalizeString from "./functions/normalizeString.js";

const inputElement = document.getElementById("searchInput");
const dropdown = document.getElementById("dropdown");

let activeIndex = -1;
let results = [];

// Debounce function
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Search function
function performSearch(query) {
  const normalizedQuery = normalizeString(query);

  if (normalizedQuery.length >= 2) {
    results = normalizedData.map((normStr, index) => ({ normStr, exact: exactData[index] })).filter(item => item.normStr.includes(normalizedQuery));

    displayResults(results);
  } else {
    dropdown.style.display = "none";
  }
}

// Display dropdown results
function displayResults(results) {
  dropdown.innerHTML = ""; // Clear previous results
  results.forEach((result, index) => {
    const item = document.createElement("div");
    item.classList.add("dropdown-item");
    item.textContent = result.exact;
    item.addEventListener("click", () => selectResult(result.exact));
    dropdown.appendChild(item);
  });
  dropdown.style.display = results.length > 0 ? "block" : "none";
}

// Handle result selection
function selectResult(exactValue) {
  const baseUrl = "https://suttacentral.net/";
  const firstPart = exactValue.split(" ")[0];
  const url = `${baseUrl}${firstPart}/xx/xx`;
  window.location.href = url; // Redirect to the built URL
}

// Keyboard navigation
function handleKeyDown(e) {
  const items = dropdown.querySelectorAll(".dropdown-item");
  if (items.length === 0) return;

  switch (e.key) {
    case "ArrowDown":
      activeIndex = (activeIndex + 1) % items.length;
      break;
    case "ArrowUp":
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      break;
    case "Enter":
      if (activeIndex >= 0) {
        selectResult(results[activeIndex].exact);
      }
      break;
    default:
      return;
  }

  items.forEach(item => item.classList.remove("active"));
  if (activeIndex >= 0) {
    items[activeIndex].classList.add("active");
  }
}

// Debounced search function
const debouncedSearch = debounce(performSearch, 300);

// Event listeners
inputElement.addEventListener("input", e => debouncedSearch(e.target.value));
inputElement.addEventListener("keydown", handleKeyDown);
