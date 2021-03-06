const app = () => {
    const song = document.querySelector('.song')
    const play = document.querySelector('.play')
    const outline = document.querySelector('.moving-outline circle')
    const video = document.querySelector('.vid-container video')
    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button')
    //Time Display
    const timeDisplay = document.querySelector('.time-display')
    const timeSelect = document.querySelectorAll('.time-select button')
    //Get length of the outline
    const outlineLength = outline.getTotalLength()
    //Duration
    let duration = 600;

    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    //Pick different sounds
    sounds.forEach( sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            checkPlaying(song)
        })
    })

    //Play sound
    play.addEventListener('click', () => {
        checkPlaying(song)
    })

    //Select time duration
    timeSelect.forEach( option => {
        option.addEventListener('click', function() {
            duration = this.getAttribute('data-time')
            timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`
        })
             
    })
  
    //function to stop and start the sounds
    const checkPlaying = song => {
        if (song.paused) {
            song.play()
            video.play()
            play.src = "./svg/pause.svg"
        } else {
            song.pause()
            video.pause()
            play.src = "./svg/play.svg"
        }
    }

    // animate circle
     song.ontimeupdate = () => {
         let currentTime = song.currentTime
         let elapsed = duration - currentTime
         let seconds = Math.floor(elapsed % 60)
         let minutes = Math.floor(elapsed / 60)

         //animate circle
         let progress = outlineLength - (currentTime / duration) * outlineLength
         outline.style.strokeDashoffset = progress
         //animate text
         timeDisplay.textContent = `${minutes}:${seconds}`

        if (currentTime >= duration) {
            song.pause()
            song.currentTime = 0
            play.src = './svg/play.svg'
            video.pause()
        }

     }

};


app();