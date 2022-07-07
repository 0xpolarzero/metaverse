import { resumeAudio, stopAudio } from '../audio/main';
import { displayNotif } from '../utils/notification';

const audioBtn = document.querySelector('.settings-btn.audio');
let audioEnabled = true;

function initMenu() {
  // audioBtn.addEventListener('click', changeAudioStatus);
  audioBtn.classList.add('bi-volume-up-fill');
}

export { initMenu };
