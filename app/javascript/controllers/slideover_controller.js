import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [ "slideover", "form" ]
  
  connect() {
    console.log("Slideover controller connected")
    this.backgroundHtml = this.backgroundHTML()
    this.visible = false
  }

  disconnect() {
    if (this.visible) {
      this.close()
    }
  }

  open() {
    console.log("Slideover controller connected")
    this.visible = true
    document.body.insertAdjacentHTML('beforeend', this.backgroundHtml)
    this.background = document.querySelector(`#slideover-background`)
    this.toggleSlideover()
  }

  close() {
    this.visible = false
    this.toggleSlideover()
    if (this.background) {
      this.background.classList.remove("opacity-100")
      this.background.classList.add("opacity-0")
      setTimeout(() => {
        this.background.remove()
      }, 500);
    }
  }

  toggleSlideover() {
    console.log("Before toggle:", this.slideoverTarget.classList.value);
    this.slideoverTarget.classList.toggle("right-0");
    this.slideoverTarget.classList.toggle("-right-full");
    this.slideoverTarget.classList.toggle("lg:-right-1/3");
    console.log("After toggle:", this.slideoverTarget.classList.value);
  }

  backgroundHTML() {
    return `<div id="slideover-background" class="fixed top-0 left-0 w-full h-full z-20"></div>`;
  }

  handleResponse({ detail: { success } }) {
    if (success) {
      this.formTarget.reset()
      this.close()
    }
  }
}