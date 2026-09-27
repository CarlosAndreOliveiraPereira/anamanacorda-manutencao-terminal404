(() => {
  "use strict";

  const TARGET = new Date("2026-10-21T00:00:00-03:00").getTime();
  const $ = (id) => document.getElementById(id);
  const parts = {
    days: $("days"),
    hours: $("hours"),
    minutes: $("minutes"),
    seconds: $("seconds")
  };

  function pad(v){ return String(Math.max(0, v)).padStart(2, "0"); }

  function updateCountdown(){
    const remaining = TARGET - Date.now();
    if (remaining <= 0) {
      Object.values(parts).forEach(el => el.textContent = "00");
      return;
    }
    const total = Math.floor(remaining / 1000);
    parts.days.textContent = pad(Math.floor(total / 86400));
    parts.hours.textContent = pad(Math.floor((total % 86400) / 3600));
    parts.minutes.textContent = pad(Math.floor((total % 3600) / 60));
    parts.seconds.textContent = pad(total % 60);
  }

  const root = document.documentElement;
  const modeButton = $("modeToggle");
  const modeLabel = $("modeLabel");
  const saved = localStorage.getItem("ana-theme");
  if (saved === "midnight") root.dataset.theme = "midnight";

  function syncMode(){
    modeLabel.textContent = root.dataset.theme === "midnight" ? "MIDNIGHT" : "BLACK";
  }
  syncMode();

  modeButton.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "midnight" ? "black" : "midnight";
    localStorage.setItem("ana-theme", root.dataset.theme);
    syncMode();
  });

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();