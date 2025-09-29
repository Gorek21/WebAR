// Komponente: platziert Modell per Hit-Test
AFRAME.registerComponent('place-on-hit', {
  init: function () {
    const el = this.el;
    const sceneEl = this.el.sceneEl;

    sceneEl.addEventListener('ar-hit-test-select', (e) => {
      el.setAttribute('position', e.detail.position);
      el.setAttribute('visible', true);
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const scenes = ["scene1", "scene2", "scene3", "scene4", "scene5"];

  function showScene(id) {
    scenes.forEach(s => {
      const el = document.getElementById(s);
      if (el) el.setAttribute("visible", false);
    });
    document.getElementById(id).setAttribute("visible", true);
  }

  // Start-Button
  document.getElementById("startBtn").addEventListener("click", () => {
    startPresentation();
  });

  function startPresentation() {
    console.log("Präsentation startet…");
    showScene("scene2");

    // Impact-Modell aktivieren (mit AR-Hit-Test)
    const impactModel = document.getElementById("impactModel");
    impactModel.setAttribute("place-on-hit", "");

    // Szene 2 für 5 Sekunden
    setTimeout(() => {
      showScene("scene3");
      const vid = document.getElementById("promo");
      vid.play();

      vid.onended = () => {
        setTimeout(() => {
          showScene("scene4");

          // Orbit-Logos rotieren
          const orbit = document.getElementById("orbitSystem");
          orbit.setAttribute("animation", {
            property: "rotation",
            to: "0 360 0",
            loop: true,
            dur: 15000
          });

          setTimeout(() => {
            showScene("scene5");
          }, 15000);
        }, 3000);
      };
    }, 5000);
  }

  // iOS QuickLook Fallback
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isIOS) {
    document.querySelector("a-scene").style.display = "none";
    document.getElementById("ios-ar-button").style.display = "block";
  } else {
    document.getElementById("ios-ar-button").style.display = "none";
  }
});
