import React from 'react';
import { Layout } from 'antd';
import Header from 'containers/Header';
import Sider from 'containers/Sider';
import SecurityLayoutWrapper from './styles';

const SecurityLayout = ({ children }) => {
  return (
    <SecurityLayoutWrapper>
      <Layout>
        <div className="header-wrapper">
          <Header className="container" />
        </div>
        <div className="container layout-content-wrapper">
          <Layout className="layout-content">
            <Sider />
            <div className="content-wrapper">
              {children}
            </div>
          </Layout>
        </div>
      </Layout>
    </SecurityLayoutWrapper>
  )
}

export default SecurityLayout;
