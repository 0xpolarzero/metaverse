import React from 'react';
import useInterface from '../../stores/Interface';

const Crosshair = () => {
  const { currentState } = useInterface();

  return (
    <div className='crosshair__wrapper'>
      <div className={`crosshair__dot ${currentState}`}></div>
    </div>
  );
};

export default Crosshair;
