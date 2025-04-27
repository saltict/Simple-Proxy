import React, {useContext} from 'react';
import 'antd/dist/reset.css';
import './layout.css';
import {ConfigProvider, theme} from "antd";
import {ThemeContext, ThemeContextProvider} from "../providers/themeProvider";
import {useToken} from "antd/es/theme/internal";

interface Props {
  children: React.ReactElement | React.ReactElement[];
  layout?: 'popup' | 'option';
}

const GlobalStyle = () => {
  const [,token] = useToken();
  return <style>{`
    body {
       background-color: ${token.colorBgBase};
    }
  `}</style>
}
const ThemeConfig = ({children}: Props) => {
  const themeContext = useContext(ThemeContext);
  return <ConfigProvider
    theme={{algorithm: themeContext.themeName === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm}}>
    {children}
  </ConfigProvider>
};


const Layout = ({children, layout = 'popup'}: Props) => {
  return <ThemeContextProvider>
    <ThemeConfig>
      <GlobalStyle />
      <div className={`${layout}-wrapper`}>
        {children}
      </div>
    </ThemeConfig>
  </ThemeContextProvider>
};

export default Layout;
