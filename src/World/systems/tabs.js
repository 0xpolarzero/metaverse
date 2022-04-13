import { resumeAudio, stopAudio } from '../audio/main';

function detectTabSwitch() {
  window.addEventListener('blur', onTabOut);
  window.addEventListener('focus', onTabIn);
}

function onTabOut() {
  stopAudio();
}

function onTabIn() {
  resumeAudio();
}

export { detectTabSwitch };
