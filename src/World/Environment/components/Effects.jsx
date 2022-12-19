import { DepthOfField, EffectComposer, SSR } from '@react-three/postprocessing';
import { useControls } from 'leva';
import React from 'react';
import useGraphics from '../../../stores/Graphics';

const Effects = () => {
  const { ssr: ssrEnabled, dof: dofEnabled } = useGraphics();
  return (
    <>
      <EffectComposer>
        {ssrEnabled && (
          <SSR
            intensity={0.15}
            exponent={1}
            distance={10}
            fade={10}
            roughnessFade={1}
            thickness={10}
            ior={0.45}
            maxRoughness={1}
            maxDepthDifference={10}
            blend={0.95}
            correction={1}
            correctionRadius={1}
            blur={0}
            blurKernel={1}
            blurSharpness={10}
            jitter={0.75}
            jitterRoughness={0.2}
            steps={40}
            refineSteps={5}
            missedRays={true}
            useNormalMap={true}
            useRoughnessMap={true}
            resolutionScale={1}
            velocityResolutionScale={1}
          />
        )}
        {dofEnabled && (
          <DepthOfField
            focusDistance={0.01}
            focalLength={0.05}
            bokehScale={3}
          />
        )}
      </EffectComposer>
    </>
  );
};

export default Effects;
