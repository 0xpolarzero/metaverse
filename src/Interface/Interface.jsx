import {
  TbLetterW,
  TbLetterA,
  TbLetterS,
  TbLetterD,
  TbLetterE,
  TbLetterC,
  TbClick,
} from 'react-icons/tb';
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardTab,
} from 'react-icons/md';
import {
  BsArrowReturnLeft,
  BsHeadphones,
  BsMouse,
  BsShift,
} from 'react-icons/bs';
import { ImCommand, ImCtrl, ImOpt } from 'react-icons/im';
import { Leva } from 'leva';
import { isMobile } from 'react-device-detect';
import React, { useEffect, useState } from 'react';
import Crosshair from './components/Crosshair';
import useInterface from '../stores/Interface';

const Interface = () => {
  const { showAdditionalMenu } = useInterface();

  return (
    <>
      {isMobile ? <MobileInterface /> : <DesktopInterface />}
      {showAdditionalMenu && <AdditionalMenu />}
    </>
  );
};

const MobileInterface = () => {
  const { showMobileOverlay } = useInterface();

  const toLandscape = () => {
    if (document.fullscreenElement === null) {
      document.documentElement.requestFullscreen().then(() => {
        screen.orientation.lock('landscape');
      });
    }
  };

  return (
    <>
      <Leva collapsed hideCopyButton />
      <div
        id='overlay-mobile'
        className={showMobileOverlay ? 'visible' : ''}
        onClick={toLandscape}
      >
        <div className='interface'>
          <div className='wrapper'>
            <div className='interface__instructions-mobile'>
              <div>Touch the screen to start the experience</div>
              <div className='interface__keys'>
                Use the <span className='key'>joystick</span> to move
              </div>
              <div className='interface__keys'>
                <span className='key'>Drag</span> to look around
              </div>
              <div className='interface__keys'>
                <span className='kezy'>Touch</span> spheres to mute/unmute
              </div>
            </div>
            <div className='interface__instructions-mobile'>
              Please consider using a desktop browser for a better experience
            </div>
            <div className='interface__credits'>
              <div className='headphones'>
                <BsHeadphones /> Best experienced with headphones
              </div>
              <div>
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
      </div>
    </>
  );
};

const DesktopInterface = () => {
  const [hoverEnter, setHoverEnter] = useState(false);
  const { showMenu } = useInterface();

  return (
    <>
      <Crosshair />
      <div className='leva-wrapper' onClick={(e) => e.stopPropagation()}>
        <Leva hideCopyButton />
      </div>

      <Hints visible={!showMenu} />

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
          <div className='wrapper'>
            <div className={`mock-btn ${hoverEnter ? 'active' : ''}`}>
              Click to enter
            </div>
            <div className='interface__content'>
              <div className='interface__instructions'>
                <span>Move</span>
                <span className='interface__keys'>
                  <span className='key'>
                    <TbLetterW />
                  </span>
                  <span className='key'>
                    <TbLetterA />
                  </span>
                  <span className='key'>
                    <TbLetterS />
                  </span>
                  <span className='key'>
                    <TbLetterD />
                  </span>
                  <Separator />
                  <span className='key'>
                    <MdKeyboardArrowUp />
                  </span>
                  <span className='key'>
                    <MdKeyboardArrowLeft />
                  </span>
                  <span className='key'>
                    <MdKeyboardArrowDown />
                  </span>
                  <span className='key'>
                    <MdKeyboardArrowRight />
                  </span>
                </span>
                <span>Faster</span>
                <span className='interface__keys'>
                  <span className='key'>
                    <BsShift />
                  </span>
                </span>
                <span>Interact</span>
                <span className='interface__keys'>
                  <span className='key'>
                    <BsMouse />
                    <TbClick />
                  </span>
                </span>
                <span className='move-down'>Free cursor</span>
                <span className='interface__keys move-down'>
                  <span className='key' style={{ fontSize: '1rem' }}>
                    <TbLetterE />
                    <TbLetterS />
                    <TbLetterC />
                  </span>
                  <Separator />
                  <span className='key'>
                    <ImCtrl />
                  </span>
                  <Separator />
                  <span className='key'>
                    <ImOpt />
                  </span>
                  <Separator />
                  <span className='key'>
                    <ImCommand />
                  </span>
                </span>
                <span>Menu</span>
                <span className='interface__keys'>
                  <span className='key'>
                    <MdKeyboardTab />
                  </span>
                  <Separator />
                  <span className='key'>
                    <BsArrowReturnLeft />
                  </span>
                </span>
              </div>
            </div>
            <div className='interface__credits'>
              <div className='headphones'>
                <BsHeadphones /> Best experienced with headphones
              </div>
              <div>
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
      </div>
    </>
  );
};

const AdditionalMenu = () => {
  const { additionalMenuAction, setShowAdditionalMenu } = useInterface();

  const performAndReset = () => {
    additionalMenuAction();
    setShowAdditionalMenu(false, null);
  };

  useEffect(() => {
    document.addEventListener('click', performAndReset);
    return () => document.removeEventListener('click', performAndReset);
  }, []);

  return (
    <div className='interface additional__menu'>
      <div className='header'>Click again to start audio</div>
      <div className='hint'>
        This additional step is needed only on Safari.
        <br /> It will start the audio now that it has been loaded (after the
        first click).
      </div>
    </div>
  );
};

const Hints = ({ visible }) => {
  const { currentState } = useInterface();

  return (
    <div className={`interface__hints ${visible ? 'visible' : ''}`}>
      <span
        className={`interface__keys ${currentState === 'hover' ? '' : 'hide'}`}
      >
        <span className='key'>
          <BsMouse />
          <TbClick />
        </span>{' '}
        interact
      </span>

      <span className='interface__keys'>
        <span className='key' style={{ fontSize: '1rem' }}>
          <TbLetterE />
          <TbLetterS />
          <TbLetterC />
        </span>{' '}
        free cursor
      </span>

      <span className='interface__keys'>
        <span className='key'>
          <BsArrowReturnLeft />
        </span>{' '}
        menu
      </span>
    </div>
  );
};

const Separator = () => (
  <>
    {' '}
    <span className='separator'>|</span>{' '}
  </>
);

export default Interface;
