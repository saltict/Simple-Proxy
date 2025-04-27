import React from 'react';
import ProxyConfigForm from "../components/ProxyConfigForm";
import Layout from "./Layout";
import './popup.css';
import Branding from "../components/Branding";

const Popup = () => {
  return <Layout layout={"popup"}>
    <Branding/>
    <ProxyConfigForm/>
  </Layout>;
};

export default Popup;
