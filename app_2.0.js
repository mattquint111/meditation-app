const app = () => {
    const video = document.querySelector(".vid-container video")
    const timeSelect = document.querySelectorAll(".time-select")
    const song = document.querySelector(".song")
    const play = document.querySelector(".play")
    const timeDisplay = document.querySelector(".time-display")
    const sounds = document.querySelectorAll('.sound-picker button')
    //outline
    const outline = document.querySelector(".moving-outline circle")
    const outlineLength = outline.getTotalLength()

    let duration = 600 // defaul time of 10-minutes

    outline.style.strokeDasharry = outlineLength
    outline.style.strokeDashoffset = outlineLength

    // pick different sounds
    sounds.forEach( sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            checkPlaying(song)
        })
    })

    // play sound
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

    // function to start and stop timer
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


}

app();