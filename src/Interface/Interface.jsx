import Crosshair from './components/Crosshair';
import useInterface from '../stores/Interface';
import { useState } from 'react';
import { Leva, useControls } from 'leva';

const Interface = () => {
  const [hoverEnter, setHoverEnter] = useState(false);
  const { showMenu } = useInterface();

  const { speed } = useControls({
    speed: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.1,
    },
  });
  // Randomize positions
  // Externalizer / Room character (min 0 max 100 value 50) - warm neutral airy

  return (
    <>
      <Crosshair />
      {/* Show the menu on pointer unlocked */}
      <div id='overlay' className={showMenu ? 'visible' : ''}>
        <div className='leva-wrapper' onClick={(e) => e.stopPropagation()}>
          <Leva />
        </div>
        <div
          className='interface'
          //   Let the user know that any click not on another button will enter the game
          onMouseOver={(e) =>
            e.target.type === 'submit'
              ? setHoverEnter(false)
              : setHoverEnter(true)
          }
        >
          <div className='wrapper'>
            <div className={hoverEnter ? 'mock-btn active' : 'mock-btn'}>
              Click to enter
            </div>
            <div className='interface__content'>
              <div className='interface__instructions'>
                <span>Move</span>
                <span className='interface__keys'>
                  <span className='key'>W</span>
                  <span className='key'>A</span>
                  <span className='key'>S</span>
                  <span className='key'>D</span>{' '}
                  <span className='separator'>/</span>{' '}
                  <span className='key'>↑</span>
                  <span className='key'>←</span>
                  <span className='key'>↓</span>
                  <span className='key'>→</span>
                </span>
                <span>Interact</span>
                <span className='interface__keys'>
                  <span className='key'>Click</span>{' '}
                  <span className='separator'>/</span>{' '}
                  <span className='key'>E</span>
                </span>
                <span>Menu</span>
                <span className='interface__keys'>
                  <span className='key'>ESC</span>
                </span>
              </div>
            </div>
            <div className='interface__credits'>
              Audio powered by{' '}
              <a
                href='https://atmoky.com/'
                target='_blank'
                rel='noopener noreferrer'
                onClick={(e) => e.stopPropagation()}
              >
                Atmoky
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interface;
