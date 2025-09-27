const scenes = ["scene1", "scene2", "scene3", "scene4"];
let current = 0;

// Präsentation starten, wenn AR läuft und Button gedrückt wird
document.getElementById("startButton").addEventListener("click", () => {
  const viewer = document.getElementById("viewer");

  // Prüfen ob AR-Session läuft
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
          // hier kannst du Scene 5 ergänzen
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
