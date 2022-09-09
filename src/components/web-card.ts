import { CSSPlugin, gsap } from "gsap";
import WebLightbox from "@components/web-lightbox";

gsap.registerPlugin(CSSPlugin);

class WebCard extends HTMLElement {
  webLightbox: WebLightbox;
  buttonElement: HTMLButtonElement;

  constructor() {
    super();
    this.webLightbox = <WebLightbox>document.createElement("aside", { is: "web-lightbox" });
    this.buttonElement = <HTMLButtonElement>this.querySelector("#lightbox-button");
    this.openLightbox = this.openLightbox.bind(this);
  }

  connectedCallback() {
    gsap.from(this, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power3",
      clearProps: "all",
    });
    this.buttonElement.addEventListener("click", this.openLightbox);
  }

  disconnectedCallback() {
    this.buttonElement.removeEventListener("click", this.openLightbox);
  }

  openLightbox() {
    document.body.style.overflow = "hidden";
    this.after(this.webLightbox);
  }
}

export default WebCard;