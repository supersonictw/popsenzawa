import { Player, loaded } from 'tone';
import { opusFilePathMap } from './metadata';

class MusicPlayer {
  constructor() {
    this.instance = new Player();
    this.instance.autostart = false;
    this.instance.toDestination();
  }

  get isPlaying() {
    return this.instance.state === "started";
  }

  choose(musicName) {
    const opusFilePath = opusFilePathMap[musicName];
    this.instance.load(opusFilePath);
  }

  start() {
    if (this.isPlaying) {
      console.warn('Music is already playing');
      return;
    }

    loaded().then(() => {
      this.instance.start();
    })
  }

  stop() {
    if (!this.isPlaying) {
      console.warn('No music is playing');
      return;
    }
    this.instance.stop();
  }
}

export const useMusicPlayer = () => new MusicPlayer();

export const useMusicMap = (keyValue) => {
  const musicMap = {};
  const keys = Object.keys(keyValue).reverse();
  for (const key of keys) {
    if (keyValue[key] in opusFilePathMap) {
      musicMap[key] = keyValue[key];
      continue;
    }
    throw new Error(`Value of ${key} in music map is a invalid song name`);
  }
  return musicMap;
};

export const onMusicLoaded = (callback) =>
  loaded().then(callback);
