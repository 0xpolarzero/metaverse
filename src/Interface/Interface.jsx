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
} from 'react-icons/md';
import { BsHeadphones, BsShift, BsMouse } from 'react-icons/bs';
import { Leva, useControls } from 'leva';
import { isMobile } from 'react-device-detect';
import React, { useState } from 'react';
import Crosshair from './components/Crosshair';
import useInterface from '../stores/Interface';

const Interface = () => {
  return (
    <>
      <Crosshair />
      {isMobile ? <MobileInterface /> : <DesktopInterface />}
    </>
  );
};

const MobileInterface = () => {
  const { showMobileOverlay } = useInterface();

  return (
    <>
      <Leva collapsed hideCopyButton />
      <div id='overlay-mobile' className={showMobileOverlay ? 'visible' : ''}>
        <div className='interface'>
          <div className='wrapper'>
            <div className='interface__instructions-mobile'>
              Please click anywhere to start the experience
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
    <div id='overlay' className={showMenu ? 'visible' : ''}>
      <div className='leva-wrapper' onClick={(e) => e.stopPropagation()}>
        <Leva hideCopyButton />
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
                </span>{' '}
                <span className='separator'>/</span>{' '}
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
                </span>{' '}
                <span className='separator'>/</span>{' '}
                <span className='key'>
                  <TbLetterE />
                </span>
              </span>
              <span>Menu</span>
              <span className='interface__keys'>
                <span className='key' style={{ fontSize: '1rem' }}>
                  <TbLetterE />
                  <TbLetterS />
                  <TbLetterC />
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
  );
};

export default Interface;
