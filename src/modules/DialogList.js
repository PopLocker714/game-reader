// import DialogButton from "./DialogButton"
import Hammer from 'hammerjs'

export default class DialogList {
  constructor(options) {
    this.container = options.container
    this.data = options.data
  }

  startPart(number) {
    const container = this.container
    this.data.parts.forEach(el => {
      if (el.partNumber === number) {
        readPart(el.data, container)
      }
    })
  }
}

function readPart(data, container) {
  let clickble = true
  let nextChain = 1
  let currentItem

  container.addEventListener('click', function() {
    if(clickble) {
      currentItem = getCurrentItem(data, nextChain)
      const itemObj = createDialogItem(currentItem)
      container.append(itemObj.html)
      nextChain = itemObj.nextChain
      scrollDown(itemObj.html)
    }
  })

  function createDialogItem(options) {
    let html

    if(options.type === '_MESSAGE_') {
      html = createMessageHtml(options.personName, options.view[0].value)
    }
    else if (options.type === '_DIALOG_CHOICE_') {
      html = createDialogChoiceHtml(options.view)
      clickble = false
    }

    return {
      html: html,
      nextChain: options.nextChain
    }
  }
}

function getCurrentItem(data, chain) {
  let currentItem
  data.forEach(el => {
    if(el.chain === chain) {
      currentItem = el
    }
  })
  return currentItem
}

function scrollDown(item) { item.scrollIntoView() }

function createMessageHtml(personName, value) {
  const div = document.createElement('div')
  const p = document.createElement('p')
  const h3 = document.createElement('h3')
  div.classList.add('dialog_wrapp')
  div.classList.add('fadeInDown')
  p.classList.add('dialog_text')
  p.classList.add('unselectable')
  h3.textContent = personName
  p.textContent = value
  div.append(p)
  div.append(h3)
  return div
}



function createDialogChoiceHtml(choicesObj) {
  const div = document.createElement('div')
  div.classList.add('dialog_choice')

  const arrButtons = []
  let pos = 10

  // console.log(choicesObj)


  choicesObj.forEach(el => {
    const button = getButton(el.value, 0, pos, el.choiceId)
    arrButtons.push(button)
    pos = pos + 100
  })
  console.log(arrButtons)


  arrButtons.forEach(el => {
    div.append(el.element)

  })

  return div
}


function getButton(title, positionX, positionY, id) {
  const div = document.createElement('button')
  div.classList.add('drag')
  div.id = id
  div.innerHTML = title

  const dialog = new Hammer(div)
  dialog.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) )
  dialog.on('pan', _handleDrag)

  // start position
  div.style.left = positionX + 'px'
  div.style.top = positionY + 'px'

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
