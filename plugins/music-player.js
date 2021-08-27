import * as Tone from 'tone'

const Music = {
  BadApple: {
    key: 'BadApple',
    opus: new Tone.Player(
      'static/audio/level/one/opus/bad_apple.opus'
    ).toDestination(),
  },
  UNOwenWasHer: {
    key: 'UNOwenWasHer',
    opus: new Tone.Player(
      'static/audio/level/one/opus/un_owen_was_her.opus'
    ).toDestination(),
  },
}

function MusicPlayer(midi) {
  this.music = null
  this.synths = []
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
