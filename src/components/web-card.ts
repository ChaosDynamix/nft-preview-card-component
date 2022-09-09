import { gsap } from "gsap";

class WebCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    gsap.from(this, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power3",
    });
  }
}

export default WebCard;