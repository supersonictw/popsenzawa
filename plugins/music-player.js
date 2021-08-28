import * as Tone from 'tone'

const Music = {
  CountryRoad: {
    key: 'CountryRoad',
    opus: 'audio/country_road.opus',
  },
  KoKeKo: {
    key: 'KoKeKo',
    opus: 'audio/ko_ke_ko.opus',
  },
  OkiDokiBoomer: {
    key: 'OkiDokiBoomer',
    opus: 'audio/oki_doki_boomer.opus',
  },
  PadowoPadowo: {
    key: 'PadowoPadowo',
    opus: 'audio/padowo_padowo.opus',
  },
  PapaTutuWawa: {
    key: 'PapaTutuWawa',
    opus: 'audio/papa_tutu_wawa.opus',
  },
  uwuesketit: {
    key: 'uwuesketit',
    opus: 'audio/uwuesketit.opus',
  },
}

function MusicPlayer() {
  this.current = null
  this.playing = false
}

MusicPlayer.prototype = {
  choose(musicName) {
    if (this.current && this.playing) {
      this.stop()
    }
    const opusFilePath = Music[musicName].opus
    this.current = new Tone.Player(opusFilePath).toDestination()
  },
  play() {
    if (this.playing) {
      console.warn('Already playing')
      return
    }
    if (!this.current) {
      console.warn('No music is chosen')
      return
    }
    this._playOpus()
  },
  _playOpus() {
    this.playing = this.current
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
