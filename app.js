// --- Configuration / storage helpers ---
const DEFAULT_CODE = "1234";
const CODE_KEY = "doorcode.code";
const MAX_LEN = 12;

const readCode = () => localStorage.getItem(CODE_KEY) || DEFAULT_CODE;
const saveCode = (v) => localStorage.setItem(CODE_KEY, String(v));

// --- UI elements ---
const dots = document.getElementById("dots");
const statusEl = document.getElementById("status");
const pad = document.getElementById("pad");
const codeInput = document.getElementById("codeInput");
const saveBtn = document.getElementById("saveCode");
const resetBtn = document.getElementById("reset");

let input = "";
let correctCode = readCode();
codeInput.value = correctCode;

// Render dots equal to code length
function renderDots() {
  dots.innerHTML = "";
  for (let i = 0; i < correctCode.length; i++) {
    const d = document.createElement("div");
    d.className = "dot" + (i < input.length ? " filled" : "");
    dots.appendChild(d);
  }
}
renderDots();

// Build keypad
const rows = [
  ["1","2","3"],
  ["4","5","6"],
  ["7","8","9"],
  ["⌫","0","↵"]
];
rows.flat().forEach((k) => {
  const b = document.createElement("button");
  b.className = "key";
  b.textContent = k;
  b.addEventListener("click", () => onKey(k));
  pad.appendChild(b);
});

function setStatus(msg, cls="") {
  statusEl.textContent = msg;
  statusEl.className = "status " + cls;
}

function onKey(k) {
  if (k === "⌫") {
    input = input.slice(0, -1);
  } else if (k === "↵") {
    check();
  } else {
    if (input.length < correctCode.length && input.length < MAX_LEN) {
      input += k;
      if (input.length === correctCode.length) check();
    }
  }
  renderDots();
  if (!statusEl.classList.contains("ok") && !statusEl.classList.contains("bad")) {
    setStatus("Enter the code");
  }
}

function check() {
  if (input === correctCode) {
    setStatus("✅ Correct!", "ok");
    if (window.navigator && "vibrate" in navigator) { navigator.vibrate(30); }
  } else {
    setStatus("❌ Try again", "bad");
    setTimeout(() => {
      input = "";
      renderDots();
      setStatus("Enter the code");
    }, 650);
  }
}

// Settings
saveBtn.addEventListener("click", () => {
  const v = (codeInput.value || "").replace(/\D/g, "").slice(0, MAX_LEN);
  if (!v) return alert("Enter at least one digit");
  correctCode = v;
  saveCode(v);
  input = "";
  renderDots();
  alert("Saved!");
});
resetBtn.addEventListener("click", () => {
  input = "";
  renderDots();
  setStatus("Enter the code");
});

// --- PWA: register service worker for offline ---
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(console.error);
  });
}
