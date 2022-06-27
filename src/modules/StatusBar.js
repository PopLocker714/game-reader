export default class StatusBar {
  constructor(options) {
    this.container = options.container
  }

  create() {
    const html = `
      <header class="header">
        <span class="material-symbols-outlined">
          currency_bitcoin
        </span>
        <span class="material-symbols-outlined">
          settings_accessibility
        </span>
        <span class="material-symbols-outlined">
          extension
        </span>
        <span class="material-symbols-outlined">
          emoji_objects
        </span>
      </header>
    `
    this.container.innerHTML += html

  }
}
