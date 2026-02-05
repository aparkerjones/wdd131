const STORAGE_KEY = "reviewCount";

const currentCount = Number(localStorage.getItem(STORAGE_KEY)) || 0;
const newCount = currentCount + 1;

localStorage.setItem(STORAGE_KEY, String(newCount));

const countEl = document.querySelector("#reviewCount");
if (countEl) {
  countEl.textContent = newCount;
}