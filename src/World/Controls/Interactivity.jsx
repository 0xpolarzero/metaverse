import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import useInterface from '../../stores/Interface';
import useAtmoky from '../../stores/Atmoky';

const Interactivity = () => {
  const { camera } = useThree();
  const { interactDistance, hovered, setHovered, setState } = useInterface();
  const { isVxEnabled } = useAtmoky();

  const ignoreTypes = ['Points', 'GridHelper'];
  const ignoreNames = [
    'floor',
    'ceiling',
    'leftWall',
    'rightWall',
    'backWall',
    'frontWall',
  ];

  useFrame(({ raycaster, scene, mouse }) => {
    raycaster.setFromCamera(mouse, camera);

    const objects = scene.children.filter(
      (child) =>
        !ignoreTypes.includes(child.type) && !ignoreNames.includes(child.name),
    );
    const intersects = raycaster.intersectObjects(objects, true);

    if (intersects.length > 0) {
      const [first] = intersects;

      const { distance, object } = first;
      const { userData } = object;

      // If the object is a voice and voice is disabled don't set hovered
      if (userData.type === 'vx' && !isVxEnabled) {
        setHovered([]);
        return;
      }

      if (distance < interactDistance) {
        setHovered([userData]);
      } else {
        setHovered([]);
      }
    } else {
      setHovered([]);
    }
  });

  useEffect(() => {
    // If an item is hovered and it has an id (not the floor or a wall)
    if (hovered[0] && hovered[0].name) {
      setState('hover');
    } else {
      setState('default');
    }
  }, [hovered]);

  return null;
};

export default Interactivity;
