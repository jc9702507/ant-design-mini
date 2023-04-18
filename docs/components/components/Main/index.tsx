import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
// import Lottie from 'react-lottie';
import ResizeObserver from 'resize-observer-polyfill';
import { RightOutlined } from '@ant-design/icons';
import MainSection from './MainSection';

export default () => {
  const [isWidthScreen, setIsWidthScreen] = useState<Boolean>(true);
  const [startAnimation, setStartAnimation] = useState([false, false, false, false]);

  useEffect(() => {
    setIsWidthScreen(screen?.width > 450);
    /** 绑定触发动画的事件，因为是mouseenter触发，因此无法进行通过事件委托绑定 */
    startAnimation.forEach((item, index) => {
      document.querySelector(`#my_lottie_${index}`)?.addEventListener('mouseenter', () => {
        setStartAnimation(pre => pre.map((i, idx) => index === idx ? true : i));
      });
    });
  }, []);

  useEffect(() => {
    const myObserver = new ResizeObserver((entries) => {
      const myContainer = entries?.[0];
      if (myContainer.contentRect.width > 450) {
        setIsWidthScreen(true);
      } else {
        setIsWidthScreen(false);
      }
    });
    myObserver.observe(document.querySelector('#mainContainer') as Element);
    return () => {
      myObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <MainSection />
    </div>
  )
}