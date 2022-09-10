import "./main.css";
import { CSSPlugin, gsap } from "gsap";

import WebCard from "@components/web-card";
import WebLightbox from "@components/web-lightbox";

customElements.define("web-card", WebCard, { extends: "main" });
customElements.define("web-lightbox", WebLightbox, { extends: "aside" });

window.addEventListener("load", () => {
  document.body.classList.remove("page--preload");
});

gsap.registerPlugin(CSSPlugin);