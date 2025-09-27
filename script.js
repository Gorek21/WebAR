window.addEventListener("DOMContentLoaded", () => {
  const scenes = ["scene1", "scene2", "scene3", "scene4", "scene5"];

  function showScene(id) {
    scenes.forEach(s => {
      const el = document.getElementById(s);
      if (el) el.setAttribute("visible", false);
    });
    document.getElementById(id).setAttribute("visible", true);
  }

  // Klick-Event direkt auf die Plane (Button)
  document.getElementById("startBtn").addEventListener("click", () => {
    startPresentation();
  });

  function startPresentation() {
    console.log("Präsentation startet…");
    showScene("scene2");

    // Szene 2: Impact Logo -> nach 5s weiter
    setTimeout(() => {
      showScene("scene3");
      const vid = document.getElementById("promo");
      vid.play();

      // Warten bis Video fertig ist
      vid.onended = () => {
        setTimeout(() => {
          showScene("scene4");

          // Orbit-Logos rotieren lassen
          const orbit = document.getElementById("orbitSystem");
          orbit.setAttribute("animation", {
            property: "rotation",
            to: "0 360 0",
            loop: true,
            dur: 15000
          });

          // Nach 15s weiter
          setTimeout(() => {
            showScene("scene5");
          }, 15000);
        }, 3000);
      };
    }, 5000);
  }
});
