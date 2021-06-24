import React from 'react';
import { Layout } from 'antd';
import Header from 'containers/Header';
import Sider from 'containers/Sider';
import SecurityLayoutWrapper from './styles';

const SecurityLayout = ({ children }) => {
  return (
    <SecurityLayoutWrapper>
      <Layout className="container">
        <Header />
        <Layout className="layout-content">
          <Sider />
          <div className="content-wrapper">
            {children}
          </div>
        </Layout>
      </Layout>
    </SecurityLayoutWrapper>
  )
}

export default SecurityLayout;
