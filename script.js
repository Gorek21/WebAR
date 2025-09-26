const scenes = ["scene1","scene2","scene3","scene4"];
let current = 0;

function showScene(id) {
  scenes.forEach(s => document.getElementById(s).classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Ablaufsteuerung
setTimeout(() => {
  current = 1;
  showScene(scenes[current]);
  // Scene 2 → nach 5s weiter
  setTimeout(() => {
    current = 2;
    showScene(scenes[current]);
    const vid = document.getElementById("scene3video");
    vid.onended = () => {
      setTimeout(() => {
        current = 3;
        showScene(scenes[current]);
        // Scene 4 → nach 15s automatisch Ende
        setTimeout(() => {
          alert("Ablauf beendet – hier kommt Scene 5 hin.");
        }, 15000);
      }, 5000);
    };
  }, 5000);
}, 3000);
