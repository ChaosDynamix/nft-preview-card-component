import "./main.css";

import WebCard from "@components/web-card";

customElements.define("web-card", WebCard, { extends: "main" });

window.addEventListener("load", () => {
  document.body.classList.remove("page--preload");
});