import React from 'react';
import Layout from "./Layout";
import Branding from "../components/Branding";
import './option.css';
import OptionConfigForm from "../components/OptionConfigForm";

const Option = () => {
  return <Layout layout={"option"}>
    <Branding/>
    <OptionConfigForm />
  </Layout>;
};

export default Option;
