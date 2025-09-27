const scenes = ["scene1", "scene2", "scene3", "scene4"];
let current = 0;
const viewer = document.getElementById("viewer");
const startBtn = document.getElementById("startButton");

// Prüfen, ob AR unterstützt wird
const arSupported = 'xr' in navigator || viewer.canActivateAR;

if (arSupported) {
  console.log("AR-Unterstützung erkannt.");

  // Präsentation starten, wenn Button gedrückt wird und AR läuft
  startBtn.addEventListener("click", () => {
    if (viewer.arStatus === "session-started") {
      startPresentation();
    } else {
      viewer.addEventListener("ar-status", (event) => {
        if (event.detail.status === "session-started") {
          startPresentation();
        }
      }, { once: true });
    }
  });
} else {
  console.log("Kein AR verfügbar – Fallback auf Desktop-Version.");

  // Button bleibt sichtbar, startet Präsentation sofort ohne AR
  startBtn.addEventListener("click", () => {
    startPresentation();
  });
}

function startPresentation() {
  console.log("Präsentation startet...");

  // Scene 2: Impact Logo
  showScene("scene2");
  setTimeout(() => {
    // Scene 3: Video
    showScene("scene3");
    const vid = document.getElementById("scene3video");
    vid.play();
    vid.onended = () => {
      setTimeout(() => {
        // Scene 4: Orbit Logos
        showScene("scene4");
        setTimeout(() => {
          console.log("Präsentation beendet.");
          // Scene 5 hier ergänzen
        }, 15000);
      }, 3000);
    };
  }, 5000);
}

function showScene(id) {
  scenes.forEach(s => {
    document.getElementById(s).classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}
