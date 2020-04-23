import React, { FC, useEffect } from "react";
import { ConfigProvider, DatePicker, message } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import { createGlobalStyle } from "styled-components";
import wait from "wait-to-generate";

// import "antd/dist/antd.less";
import './index.less'

import injectJs from "./injectJs";
import onMessageFromInject from "./onMessageFromInject";

moment.locale("zh-cn");

const GlobalStyle = createGlobalStyle`
  #ludongmin-root {
    /* position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; */
  }
`;

const App: FC = () => {
  // 注入js
  useEffect(() => {
    (async () => {
      // 1.注入js
      injectJs("inject.bundle.js");
      // 2. 等待js注入完成
      await wait(() => document.getElementById("ludongmin-inject-finish"));
      // 3. 监听inject传来的事件
      onMessageFromInject();
    })();
  }, []);
  return (
    <ConfigProvider locale={zhCN}>
      <GlobalStyle></GlobalStyle>
    </ConfigProvider>
  );
};

export default App;
