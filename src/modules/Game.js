
import StatusBar from './StatusBar'
import DialogList from './DialogList'
import json from '../assets/data/script-dialogs-part1.json'

export default class Game {
  constructor(options) {
    this.container = options.container
  }

  run() {
    const statusBar = new StatusBar({container: this.container})
    const dialogList = new DialogList({container: document.querySelector('.list_dialog'), data: json})

    const html = `
    <div class="dialog_wrapp">
      <p class="dialog_text">Text for dialog as a fa asf afad  fasdsdf  a ssfas fs dfafdas d</p>
    </div>
    `


    statusBar.create()
    dialogList.startPart(1)
    // dialogList.start()
    // this.container.append(itemDialog.start())
    // this.container.append(item2Dialog.start())


  }

  preview() {
    const html = `
    <h1 class="title">Title</h1>
    <button class="start_btn">start</button>
    `


    this.container.innerHTML = html
  }

  previewClose() {
    this.container.innerHTML = ``
  }


}