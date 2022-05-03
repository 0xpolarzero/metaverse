import { resumeAudio, stopAudio } from '../audio/main';
import { displayNotif } from '../utils/notification';
import { audioConfig } from '../audio/main';

const audioBtn = document.querySelector('.settings-btn.audio');
let audioEnabled = true;

function initMenu() {
  audioBtn.addEventListener('click', changeAudioStatus);
  audioBtn.classList.add('bi-volume-up-fill');
}

function changeAudioStatus(e) {
  e.stopPropagation();
  console.log(audioConfig.context);

  if (audioEnabled) {
    stopAudio();
    audioBtn.classList.remove('bi-volume-up-fill');
    audioBtn.classList.add('bi-volume-mute-fill');
    audioBtn.style.background = '#cb7c89';
    displayNotif('hint', 'Audio disabled.', 2000);
  } else {
    resumeAudio();
    audioBtn.classList.remove('bi-volume-mute-fill');
    audioBtn.classList.add('bi-volume-up-fill');
    audioBtn.style.background = '#fbaf00';
    displayNotif('hint', 'Audio enabled!', 2000);
  }

  audioEnabled = !audioEnabled;
}

export { initMenu };
