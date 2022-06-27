import './assets/css/style.css'
import Game from './modules/Game'
// import song from './assets/audio/song3.ogg'

// const worker = new Worker(new URL('./sw.js', import.meta.url))

// }

const gameContainer = document.querySelector('.game')

const game = new Game({container: gameContainer})
game.preview()

function render() {
  document.querySelector('.start_btn').addEventListener('click', () => {
    game.previewClose()
    game.run()
    // var audio = new Audio()
    // audio.src = song
    // audio.autoplay = true
    // audio.loop = true
    // audio.volume = .1

  })
}
render()


