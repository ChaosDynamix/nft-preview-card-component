import { CSSPlugin, gsap } from "gsap";
import illustration from "@images/image-equilibrium.jpg";

gsap.registerPlugin(CSSPlugin);

class WebLightbox extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  overlayElement: HTMLDivElement;
  pictureElement: HTMLImageElement;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-lightbox");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.overlayElement = <HTMLDivElement>this.#templateFragment.querySelector("#lightbox-overlay");
    this.pictureElement = <HTMLImageElement>this.#templateFragment.querySelector("#lightbox-picture");
    this.pictureElement.setAttribute("src", illustration);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("lightbox");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    const timeline = gsap.timeline();
    timeline.from(this.overlayElement, {
      opacity: 0,
      duration: 0.3,
      ease: "power3",
      clearProps: "all",
    }, "start");
    timeline.from(this.pictureElement, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power3",
      clearProps: "all",
    }, "start");
    this.overlayElement.addEventListener("click", this.closeLightbox);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  disconnectedCallback() {
    this.overlayElement.removeEventListener("click", this.closeLightbox);
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  closeLightbox() {
    const timeline = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
        this.remove();
      }
    });
    timeline.to(this.overlayElement, {
      opacity: 0,
      duration: 0.3,
      ease: "power3",
      clearProps: "all",
    }, "end");
    timeline.to(this.pictureElement, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power3",
      clearProps: "all",
    }, "end");
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.closeLightbox();
    }
  }
}

export default WebLightbox;