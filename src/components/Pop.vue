<template>
  <v-card class="mx-auto text-center cursor-pointer" width="90%" height="90%" :max-width="height" :max-height="height"
    @pointerdown="onPress" @pointerup="onRelease">
    <h1 class="crazy flat top-10">PopSenzawa</h1>
    <h2 class="crazy flat top-50">{{ statusMessage }}</h2>
    <h2 class="crazy flat bottom-25">{{ countAccumulated }}</h2>
    <v-img class="meow-btn" alt="Meow" width="100%" height="100%" :src="buttonImage" />
  </v-card>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import qs from 'query-string';

import { useReCaptcha } from 'vue-recaptcha-v3';
import { useMusicPlayer, useMusicMap, onMusicLoaded } from '../player';
import { useClient as useEchoClient } from '../clients/echo';

const maxCountAppend = parseInt(import.meta.env.VITE_POP_MAX_COUNT_APPEND);
const sendDelay = parseInt(import.meta.env.VITE_POP_SEND_DELAY);
const isRecaptchaEnabled = import.meta.env.VITE_RECAPTCHA_SITE_KEY !== "";

const storageCountAccumulated = parseInt(localStorage.getItem("count_accumulated")) || 0;

const { executeRecaptcha } = useReCaptcha();

const musicPlayer = useMusicPlayer();
const musicMap = useMusicMap({
  20191215: "OkiDokiBoomer",
  1200000: "KoKeKo",
  201607: "PapaTutuWawa",
  2020: "PadowoPadowo",
  913: "uwuesketit",
});

const echoClient = useEchoClient();

const isPressing = ref(false);
const isSubmitTriggered = ref(false);
const isMusicLoaded = ref(false);
const echoToken = ref("");
const countAccumulated = ref(storageCountAccumulated);
const countAppend = ref(0);
const songNameCurrent = ref("");

const buttonImage = computed(() => {
  if (countAccumulated.value > 913) {
    return isPressing.value
      ? './image/button/pressed-uwu.png'
      : './image/button/release-uwu.png'
  } else {
    return isPressing.value
      ? './image/button/pressed.png'
      : './image/button/release.png'
  }
});

const height = computed(() => {
  if (typeof window !== 'undefined') {
    return window.innerHeight - 150
  } else {
    return 750
  }
});

const statusMessage = computed(() => {
  if (countAccumulated.value > 913) {
    return 'ù w ú'
  } else {
    return 'Awww (๑ºωº)'
  }
});

watch(countAccumulated, (value) => {
  localStorage.setItem("count_accumulated", value.toString());
});

watch(countAppend, (value) => {
  if (value < 1 || isSubmitTriggered.value) {
    return;
  }
  isSubmitTriggered.value = true;
  setTimeout(submitPops, sendDelay);
});

onMusicLoaded(() => {
  isMusicLoaded.value = true;
});

onMounted(() => {
  refreshPlaySong();
});

onMounted(() => {
  window.addEventListener('keydown', onPress);
  window.addEventListener('keyup', onRelease);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onPress);
  window.removeEventListener('keyup', onRelease);
});

function onPress() {
  if (isPressing.value) {
    return;
  }
  isPressing.value = true;
  countAccumulated.value += 1;
  if (countAppend.value <= maxCountAppend) {
    countAppend.value += 1;
  }
  if (isMusicLoaded.value) {
    triggerMusicEventOnPress();
  }
  if (isRecaptchaEnabled) {
    executeRecaptcha("pressed");
  }
}

function onRelease() {
  if (isPressing.value) {
    isPressing.value = false;
  }
  if (isMusicLoaded.value) {
    triggerMusicEventOnRelease();
  }
}

function refreshPlaySong() {
  const musicMapIndex = Object.keys(musicMap).find((v) => countAccumulated.value > v);
  const songName = musicMap[musicMapIndex] || "CountryRoad";
  if (songName === songNameCurrent.value) {
    return;
  }
  songNameCurrent.value = songName;
  musicPlayer.stop();
  musicPlayer.choose(songName);
}

function triggerMusicEventOnPress() {
  refreshPlaySong();
  if (musicPlayer.isPlaying) {
    return;
  }
  musicPlayer.start();
}

function triggerMusicEventOnRelease() {
  if (!musicPlayer.isPlaying) {
    return;
  }
  const countCurrent = countAccumulated.value;
  setTimeout(() => {
    if (countCurrent !== countAccumulated.value) {
      return;
    }
    musicPlayer.stop();
  }, 5000);
}

async function submitPops() {
  // Copy from memory
  const countCurrent = countAppend.value;
  const tokenCurrent = echoToken.value;
  // Submit pops
  const queryString = qs.stringify({
    count: countCurrent,
    token: tokenCurrent,
  });
  try {
    const response = await echoClient.post(`pops?${queryString}`);
    handleSubmitSuccess(response);
  } catch (error) {
    handleSubmitError(error);
  } finally {
    isSubmitTriggered.value = false;
  }
}

async function handleSubmitSuccess(response) {
  const {
    count_append: countAppended,
    new_token: newToken,
  } = await response.json();
  echoToken.value = newToken;

  const { status: statusCode } = response;
  if (statusCode === 202 && countAppended) {
    countAppend.value -= countAppended;
  }
}

async function handleSubmitError(error) {
  const { response } = error;
  if (!response) {
    console.error(error);
  }

  const { status: statusCode } = response;
  if (statusCode === 401) {
    echoToken.value = "";
  }
  console.warn(error);
}
</script>

<style lang="scss" scoped>
.crazy {
  color: #fff;
  user-select: none;
  -webkit-text-stroke: 1px navy;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.cursor-pointer {
  cursor: pointer;
}

.flat {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 5;

  &.top-10 {
    top: 10px;
  }

  &.top-50 {
    top: 50px;
  }

  &.bottom-25 {
    bottom: 25px;
  }
}
</style>
