import { Joystick } from 'react-joystick-component';
import { useState } from 'react';
import useJoystick from '../../stores/Joystick';

const MobileControls = () => {
  const { actions, setJoystickMove, setJoystickView, getJoystickView } =
    useJoystick();

  const handleMove = (e) => {
    console.log(e);
    const x = e.x;
    const y = e.y;

    // Reset directions
    for (const action of actions) setJoystickMove(action, false);

    // Set main direction
    if (Math.abs(x) > Math.abs(y)) {
      x > 0 ? setJoystickMove('right', true) : setJoystickMove('left', true);
    } else {
      y > 0
        ? setJoystickMove('forward', true)
        : setJoystickMove('backward', true);
    }

    // Set secondary direction
    // It can go both ways only if the other direction is pressed
    // at least 70% as much as the main direction
    if (Math.abs(x) > Math.abs(y) && Math.abs(y) > 0.7 * Math.abs(x)) {
      y > 0
        ? setJoystickMove('forward', true)
        : setJoystickMove('backward', true);
    } else if (Math.abs(y) > Math.abs(x) && Math.abs(x) > 0.7 * Math.abs(y)) {
      x > 0 ? setJoystickMove('right', true) : setJoystickMove('left', true);
    }

    // Set sprint
    if (Math.abs(x) > 0.7 || Math.abs(y) > 0.7) setJoystickMove('sprint', true);
  };

  const handleRotate = (e) => {
    const x = e.x;
    const y = e.y;

    setJoystickView(x, y);
  };

  const handleStopMove = (e) => {
    for (const action of actions) setJoystickMove(action, false);
  };

  const handleStopRotate = (e) => {
    setJoystickView(0, 0);
  };

  return (
    <>
      <div className='joystick joystick__left'>
        <Joystick
          size={100}
          baseColor='rgba(255, 255, 255, 0.2)'
          stickColor='rgba(255, 255, 255, 0.5)'
          move={handleMove}
          stop={handleStopMove}
        ></Joystick>
      </div>

      <div className='joystick joystick__right'>
        <Joystick
          size={100}
          baseColor='rgba(255, 255, 255, 0.2)'
          stickColor='rgba(255, 255, 255, 0.5)'
          move={handleRotate}
          stop={handleStopRotate}
        ></Joystick>
      </div>
    </>
  );
};

export default MobileControls;
