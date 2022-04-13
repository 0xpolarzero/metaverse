import { displayNotif } from './notification';

async function loadSample(url, audioContext) {
  const data = await fetch(url).catch((err) => {
    displayNotif('error', 'err');
    console.log(err);
  });
  if (!data)
    displayNotif('error', `It seems like we can't retrieve the sound data...`);

  const arrayBuffer = await data.arrayBuffer().catch((err) => {
    displayNotif('error', 'err');
    console.log(err);
  });
  if (!arrayBuffer)
    displayNotif(
      'error',
      `There was an issue during the buffer initialization.`,
    );

  const decoded = await audioContext
    .decodeAudioData(arrayBuffer)
    .catch((err) => {
      displayNotif('error', 'err');
      console.log(err);
    });
  if (!decoded) displayNotif('error', `The buffer could not be decoded.`);

  return decoded;
}

export { loadSample };
