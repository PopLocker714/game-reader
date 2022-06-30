import Hammer from 'hammerjs'

export default class ReaderData {
  constructor(options) {
    this.container = options.container
  }

  read(json) {
    let CLICKBLE     = true
    let CURRENT_ITEM = json.data[0]
    let CURRENT_CHOICE_BUTTONS

    const CONTAINER  = this.container

    const hammerTap  = new Hammer(CONTAINER)
    hammerTap.on('tap', handlerNextStep)
    function handlerNextStep(ev) {
      if (CLICKBLE) {
        pushHtml(createItemHtml(CURRENT_ITEM), CONTAINER)
        CURRENT_ITEM = searchNextCaine(json.data, CURRENT_ITEM)
      }
    }

    function createItemHtml(item) {
      let finalItem

      if (item.type === '_MESSAGE_') {
        const div = document.createElement('div')
        const p   = document.createElement('p')
        const h3  = document.createElement('h3')
        div.classList.add('dialog_wrapp')
        div.classList.add('fadeInDown')
        p.classList.add('dialog_text')
        p.classList.add('unselectable')
        h3.textContent = item.personName
        p.textContent  = item.view[0].value //! костыль
        div.append(p)
        div.append(h3)
        finalItem = div
      } else if (item.type === '_DIALOG_CHOICE_') {
        let pos        = 10
        let lastPosX   = 0
        let isDragging = false
        CLICKBLE = false

        const div = document.createElement('div')
        div.classList.add('dialog_choice')

        CURRENT_CHOICE_BUTTONS = item.view.map(el => {
          const div = document.createElement('button')
          div.classList.add('drag')
          div.innerHTML = el.value

          el.dragOptions = new Hammer(div)
          el.dragOptions.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) )
          el.dragOptions.on('pan', _handlerDrag)

          // start position
          div.style.left = 0 + 'px'
          div.style.top  = pos + 'px'
          pos = pos + 100

          function _handlerDrag(ev) {
            const elem = ev.target

            if (!isDragging) {
              elem.classList.remove('drag_back')
              isDragging = true
              lastPosX = elem.offsetLeft
            }

            let posX = ev.deltaX + lastPosX
            elem.style.left = posX + 'px'

            if (ev.isFinal) {
              isDragging = false

              const dragFinalPosX = +elem.style.left.replace('px', '')
              if (dragFinalPosX < -180 || dragFinalPosX > 180) {
                elem.classList.add('drag_hide')
                CURRENT_CHOICE_BUTTONS.forEach(el => {
                  el.dragOptions.destroy()
                })
                CLICKBLE = true
                CURRENT_ITEM = el
                CURRENT_ITEM = searchNextCaine(json.data, CURRENT_ITEM)
                pushHtml(createItemHtml(CURRENT_ITEM), CONTAINER)
                CURRENT_ITEM = searchNextCaine(json.data, CURRENT_ITEM)
              }
              elem.classList.add('drag_back')
              elem.style.left = lastPosX + 'px'
            }
          }

          return el
        })

        console.log(CURRENT_CHOICE_BUTTONS)
        CURRENT_CHOICE_BUTTONS.forEach(el => {
          div.append(el.dragOptions.element)
        })

        finalItem = div
      }

      return finalItem
    }


  }
}




function pushHtml(item, container) {
  container.append(item)
  item.scrollIntoView()
}

function searchNextCaine(data, item) {
  let nextChain
  data.forEach(el => {
    if (el.chain === item.nextChain) {
      nextChain = el
    }
  })
  return nextChain
}


