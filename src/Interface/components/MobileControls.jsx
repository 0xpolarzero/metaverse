import { Joystick } from 'react-joystick-component';

const MobileControls = () => {
  const handleMove = (e) => {
    console.log('move', e);
  };

  const handleRotate = (e) => {
    console.log('rotate', e);
  };

  const handleStop = (e) => {
    console.log('stop', e);
  };

  return (
    <>
      <div className='joystick joystick__left'>
        <Joystick
          size={100}
          baseColor='rgba(255, 255, 255, 0.2)'
          stickColor='rgba(255, 255, 255, 0.5)'
          move={handleMove}
          stop={handleStop}
        ></Joystick>
      </div>

      <div className='joystick joystick__right'>
        <Joystick
          size={100}
          baseColor='rgba(255, 255, 255, 0.2)'
          stickColor='rgba(255, 255, 255, 0.5)'
          move={handleRotate}
          stop={handleStop}
        ></Joystick>
      </div>
    </>
  );
};

export default MobileControls;
