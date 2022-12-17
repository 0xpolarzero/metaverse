import { button, folder, useControls } from 'leva';
import useAtmoky from '../../../stores/Atmoky';

const AudioControls = () => {
  const audioParams = useAtmoky();

  useControls('Audio', {
    Reverb: {
      value: audioParams.reverbAmount,
      min: audioParams.minReverbAmount,
      max: audioParams.maxReverbAmount,
      step: 1,
      onChange: (value) => audioParams.setReverbAmount(value),
    },

    'Room (warm - neutral - airy)': folder({
      Character: {
        value: audioParams.externalizerIntensity,
        min: audioParams.minExternalizerIntensity,
        max: audioParams.maxExternalizerIntensity,
        step: 1,
        onChange: (value) => audioParams.setExternalizerIntensity(value),
      },
      Amount: {
        value: audioParams.externalizerAmount,
        min: audioParams.minExternalizerAmount,
        max: audioParams.maxExternalizerAmount,
        step: 1,
        onChange: (value) => audioParams.setExternalizerAmount(value),
      },
    }),

    Sources: folder({
      'Randomize positions': button(() => {
        audioParams.randomizePositions();
      }),
    }),
  });

  return null;
};

export default AudioControls;
