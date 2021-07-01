import React, { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useSelector, useDispatch } from 'react-redux';
import { getFigures } from 'store/figures/actions';
import { Layout } from 'antd';
import Header from 'containers/Header';
import Sider from 'containers/Sider';
import SecurityLayoutWrapper from './styles';

const SecurityLayout = ({ children }) => {
  const dispatch = useDispatch();
  const figures = useSelector(state => state.figures.data)
  useEffect(() => {
    if (isEmpty(figures)) {
      dispatch(getFigures());
    }
  }, [])
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
