import { loadSample } from '../utils/fetch-audio';
import { audioConfig, createSource } from './main';
import { displayNotif } from '../utils/notification';

// Load the ambient sound
async function loadAmbientMusic() {
  const url = './assets/audio/ExtinctionAmb4ch.wav';
  const ambient = createSource(url, null);
  // ambient.playSource();
}

export { loadAmbientMusic };
