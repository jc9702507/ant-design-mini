import React, { useState, useEffect } from 'react';
import { Tooltip, Popover } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import {QRCodeSVG} from 'qrcode.react';
import './Previewer.less';

interface IProps {
  herboxUrl: string;
}

function getURL(url: string) {
  const urlObj = new URL(url);
  const searchParams = urlObj.searchParams;
  let theme = '';
  if (!searchParams.get('noChangeButton')) {
    const themeObj = searchParams.get('less-theme');
    if (themeObj === null) {
      theme = localStorage.getItem('theme') || '';
    } else {
      theme = themeObj;
    }
  }
  searchParams.set('less-theme', theme);
  return urlObj.toString();
}

const listeners: ((url: any) => void)[] = [];

const Previewer: React.FC<IProps> = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [url, setURL] = useState(getURL(window.location.protocol + '//' + window.location.host + props.herboxUrl));

  function changeURL(url) {
    const urlObj = new URL(url);
    const searchParams = urlObj.searchParams;
    let theme = searchParams.get('less-theme');
    theme = theme === 'dark' ? '' : 'dark';
    localStorage.setItem('theme', theme);
    listeners.forEach(item => item(theme));
  }

  const urlObj = new URL(url);
  const searchParams = urlObj.searchParams;
  const page = searchParams.get('page');
  const theme = searchParams.get('less-theme');
  const noChangeButton = searchParams.get('noChangeButton');
  useEffect(() => {
    listeners.push((theme) => {
      setURL(url => {
        const urlObj = new URL(url);
        const searchParams = urlObj.searchParams;
        searchParams.set('less-theme', theme);
        const newURL = urlObj.toString();
        return newURL;
      });
    });
  }, []);

  return (
    <div className="previewer">
      {!loaded && <div className="previewer-loading" />}
      <iframe
        src={url}
        onLoad={() => setLoaded(true)}
        allow="clipboard-read; clipboard-write"
      />
    </div>
  );
};

export default Previewer;
