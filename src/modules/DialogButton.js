import Hammer from 'hammerjs'

export default class DialogButton {
  constructor(params) {
    this.title = params.title
    this.posX = params.posX
    this.posY = params.posY
    this.choiceId = params.choiceId
  }

  start() {
    const div = document.createElement('button')
    div.classList.add('drag')
    div.id = this.choiceId
    div.innerHTML = this.title

    const dialog = new Hammer(div)
    dialog.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) )
    dialog.on('pan', _handleDrag)

    // start position
    div.style.left = this.posX + 'px'
    div.style.top = this.posY + 'px'

    div.dataset.isChoice = false

    let lastPosX = 0
    let isDragging = false

    function _handleDrag(ev) {
      let elem = ev.target

      if (!isDragging) {
        elem.classList.remove('drag_back')
        isDragging = true
        lastPosX = elem.offsetLeft
      }

      // устанавливаем позицию объекта относительно его последнего известного положения.
      let posX = ev.deltaX + lastPosX

      // двигаем наш элемент в эту позицию
      elem.style.left = posX + 'px'

      // DRAG ENDED
      // здесь мы просто забываем, что мы тащим
      if (ev.isFinal) {
        isDragging = false

        const dragFinalPosX = +elem.style.left.replace('px', '')
        if (dragFinalPosX < -180) {
          elem.classList.add('drag_hide')
          dialog.destroy()
          elem.dataset.isChoice = true
          // console.log(elem)
          console.log(elem)
        }
        if (dragFinalPosX > 180) {
          elem.classList.add('drag_hide')
          dialog.destroy()
          elem.dataset.isChoice = true
          // console.log(elem)
        }
        elem.classList.add('drag_back')
        elem.style.left = lastPosX + 'px'
      }
    }

    return dialog
  }
}





