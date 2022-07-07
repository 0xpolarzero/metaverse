import { loadSample } from '../utils/fetch-audio';
import { displayNotif } from '../utils/notification';

// Load the ambient sound
async function loadAmbientMusic() {
  const url = './assets/audio/static_amb.wav';
  const ambient = createSource(url, null);
  ambient.playSource();
}

export { loadAmbientMusic };
