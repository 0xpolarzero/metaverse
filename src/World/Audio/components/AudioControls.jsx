import { button, useControls } from 'leva';
import useAtmoky from '../../../stores/Atmoky';

const AudioControls = () => {
  const audioParams = useAtmoky();

  // Randomize positions

  useControls('Reverb', {
    Amount: {
      value: audioParams.reverbAmount,
      min: audioParams.minReverbAmount,
      max: audioParams.maxReverbAmount,
      step: 1,
      onChange: (value) => audioParams.setReverbAmount(value),
    },
  });

  useControls('Room (warm - neutral - airy)', {
    Amount: {
      value: audioParams.externalizerAmount,
      min: audioParams.minExternalizerAmount,
      max: audioParams.maxExternalizerAmount,
      step: 1,
      onChange: (value) => audioParams.setExternalizerAmount(value),
    },
    Character: {
      value: audioParams.externalizerIntensity,
      min: audioParams.minExternalizerIntensity,
      max: audioParams.maxExternalizerIntensity,
      step: 1,
      onChange: (value) => audioParams.setExternalizerIntensity(value),
    },
  });

  // Add a button to randomize positions
  useControls('Sources', {
    'Randomize positions': button(() => {
      audioParams.randomizePositions();
    }),
  });

  return null;
};

export default AudioControls;
