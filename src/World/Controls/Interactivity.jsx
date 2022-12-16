import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import useInterface from '../../stores/Interface';

const Interactivity = () => {
  const { camera } = useThree();
  const { hovered, setHovered, setState } = useInterface();

  useFrame(({ raycaster, scene, mouse }) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const [first] = intersects;
      const { distance, object } = first;
      const { userData } = object;

      if (distance < 10) {
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
