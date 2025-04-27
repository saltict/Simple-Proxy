import React from 'react';
import Title from "antd/es/typography/Title";
import './branding.css';

const Branding = () => {
  return <div className={'branding'}>
    <img className={'icon'} src={'./images/favicon-128x128.png'} width={36}/>
    <Title level={3}>Simple Proxy</Title>
  </div>
};

export default Branding;
