import {
  LitElement,
  html,
  customElement,
  property
} from 'lit-element'
import styles from './index.pcss'

@customElement('wc-stories-story')
class Story extends LitElement {

  /**
   * @description image absolute or relative url
   */
  @property({ type: String }) src = ''

  /**
   * @description placeholder for lazy loading
   * Use low quality image placeholders for this.
   * It can be an URL or a base64 string
   */
  @property({ type: String }) placeholder = ''

  /**
   * @description checks if an image is available to show
   */
  @property({ type: Boolean }) visible = false

  /**
   * @description determines if an image was uploaded
   */
  private loaded = false

  /**
   * Executed on load event.
   * Remove the preview class.
   */
  onImageLoad = () => {
    const img = this.shadowRoot.querySelector('.placeholder')
    img.classList.add('invisible')
    setTimeout(() => {
      this
      .shadowRoot
      .querySelector('.placeholder')
      .remove()
    }, 250) /* Delay time of opacity of the placeholder */
    this.loaded = true;
  }

  /**
   * If the current image is not loaded yet,
   * we add the url to the src attribute and
   * add a preview class to show a blur
   */
  updated() {
    if (this.visible && !this.loaded) {
      const img = this.shadowRoot.querySelector('.story');
      (<HTMLImageElement> img).src = img.getAttribute('data-src')
    }
  }

  render() {
    const opacity = /* this.visible ? 1 : 0 */ 1

    return html`
      <div class="${this.cssClass}">
        <img class="story" data-src="${this.src}" .onload="${this.onImageLoad}"/>
        <img class="placeholder" src="${this.placeholder}" />
      </div>
      <style>
        ${styles.toString()}
        :host {
          opacity: ${opacity};
        }
      </style>
    `
  }

  get cssClass() {
    return [
      'stories__container__story',
      this.visible ? 'visible' : ''
    ].join(' ')
  }
}

export { Story }
