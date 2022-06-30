
import StatusBar from './StatusBar'
// import DialogList from './DialogList'
import ReaderData from './ReaderData'
import jsonPart1 from '../assets/data/part-1.json'

export default class Game {
  constructor(options) {
    this.container = options.container
  }

  run() {
    const statusBar  = new StatusBar({container: this.container})
    const readerData = new ReaderData({container: document.querySelector('.list_dialog')})
    
    statusBar.create()
    readerData.read(jsonPart1)

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