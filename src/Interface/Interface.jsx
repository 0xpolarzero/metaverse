import Crosshair from './components/Crosshair';
import useInterface from '../stores/Interface';
import { useState } from 'react';

const Interface = () => {
  const [hoverEnter, setHoverEnter] = useState(false);
  const { showMenu } = useInterface();

  return (
    <>
      <Crosshair />
      {/* Show the menu on pointer unlocked */}
      <div id='overlay' className={showMenu ? 'visible' : ''}>
        <div
          className='interface'
          //   Let the user know that any click not on another button will enter the game
          onMouseOver={(e) =>
            e.target.type === 'submit'
              ? setHoverEnter(false)
              : setHoverEnter(true)
          }
        >
          <div className='action'>
            <div className={hoverEnter ? 'mock-btn active' : 'mock-btn'}>
              Click to enter
            </div>
            <button>ttt</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interface;
