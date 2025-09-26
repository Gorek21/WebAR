const scenes = ["sceneImpact", "sceneVideo", "sceneOrbit", "sceneInfo"];
let current = 0;

// Präsentation starten, wenn AR läuft und Button gedrückt wird
document.querySelector("model-viewer").addEventListener("ar-status", (event) => {
  if (event.detail.status === "session-started") {
    console.log("AR Session läuft, warte auf Button...");
  }
});

document.getElementById("startButton").addEventListener("click", () => {
  const viewer = document.querySelector("model-viewer");

  // Sicherstellen, dass AR läuft
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

function startPresentation() {
  console.log("Präsentation startet...");

  // Scene 2: Impact Logo
  showScene("sceneImpact");
  setTimeout(() => {
    // Scene 3: Video
    showScene("sceneVideo");
    const vid = document.getElementById("video");
    vid.play();
    vid.onended = () => {
      setTimeout(() => {
        // Scene 4: Orbit Logos
        showScene("sceneOrbit");
        setTimeout(() => {
          // Scene 5: Final Info
          showScene("sceneInfo");
          console.log("Präsentation beendet.");
        }, 15000);
      }, 3000);
    };
  }, 5000);
}

function showScene(id) {
  scenes.forEach(s => document.getElementById(s).style.display = "none");
  document.getElementById(id).style.display = "block";
}
