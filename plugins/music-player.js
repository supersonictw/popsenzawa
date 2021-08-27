import * as Tone from 'tone'

const Music = {
  CountryRoad: {
    key: 'Country Road',
    opus: new Tone.Player('audio/country_road.opus').toDestination(),
  },
}

function MusicPlayer() {
  this.music = null
  this.playing = false
}

MusicPlayer.prototype = {
  choose(musicName) {
    if (this.music && this.playing) {
      this.stop()
    }
    this.music = Music[musicName]
  },
  play() {
    if (this.playing) {
      console.warn('Already playing')
      return
    }
    if (!this.music) {
      console.warn('No music is chosen')
      return
    }
    this._playOpus()
  },
  _playOpus() {
    this.playing = this.music.opus
    if (this.playing.loaded) {
      this.playing.start()
    } else {
      this.playing.autostart = true
    }
  },
  stop() {
    if (!this.playing) {
      console.warn('No music is playing')
      return
    }
    this._stopOpus()
  },
  _stopOpus() {
    this.playing.stop()
    this.playing = false
  },
}

export { MusicPlayer, Music }
