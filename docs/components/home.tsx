import React, { useEffect } from 'react';
import { Button } from 'antd';

export default () => {
  

  return <div>
    <div style={{
      fontSize: 60,
      textAlign: 'center',
      marginTop: 200,
    }}>
      支付宝小程序示例
    </div>
    <div style={{
      textAlign: 'center',
      marginTop: 60,
    }}>
      <Button type="primary" style={{
        width: 200,
        height: 60,
        fontSize: 30,
      }} onClick={() => window.location='/ant-design-mini/components'}>
        查看示例
      </Button>
    </div>
  </div>;
}