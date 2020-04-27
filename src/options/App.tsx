import React, { FC } from 'react'
import { ConfigProvider, Row, Col, Card } from 'antd'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import styled, { createGlobalStyle } from 'styled-components'

import 'antd/dist/antd.less'
import Todo from './Todo'
import Anchor from './Anchor'

moment.locale('zh-cn')

const GlobalStyle = createGlobalStyle`

`

const Wrapper = styled.div`
  padding: 16px;
  height: 100vh;
  overflow: auto;
  background: #fafafa;
`

const App: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <GlobalStyle></GlobalStyle>
      <Row>
        <Col span={6}>
          <Card>
            <Anchor />
          </Card>
        </Col>
        <Col span={18}>
          <Wrapper>
            <Todo />
          </Wrapper>
        </Col>
      </Row>
    </ConfigProvider>
  )
}

export default App
