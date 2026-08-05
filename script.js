const micBtn = document.getElementById("micBtn");
const status = document.getElementById("status");

micBtn.addEventListener("click", () => {
  status.textContent = "Status: Listening..."
});