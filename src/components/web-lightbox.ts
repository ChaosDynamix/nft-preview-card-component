import { CSSPlugin, gsap } from "gsap";

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
    this.overlayElement = <HTMLDivElement>this.#templateFragment.firstElementChild;
    this.pictureElement = <HTMLImageElement>this.#templateFragment.lastElementChild;
    this.closeLightbox = this.closeLightbox.bind(this);
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
  }

  disconnectedCallback() {
    this.overlayElement.removeEventListener("click", this.closeLightbox);
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
}

export default WebLightbox;