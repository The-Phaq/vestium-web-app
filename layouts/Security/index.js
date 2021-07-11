import React, { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getFigures } from "store/figures/actions";
import { getProfile } from 'store/auth/actions';
import { Layout } from "antd";
import Header from "containers/Header";
import Sider from "containers/Sider";
import SecurityLayoutWrapper from "./styles";

const SecurityLayout = ({ children }) => {
  const { pathname, push, query } = useRouter();
  const dispatch = useDispatch();
  const figures = useSelector(state => state.figures.data)
  const user = useSelector(state => state.user?.user);
  useEffect(() => {
    if (!localStorage.getItem('token'))
      push({
        pathname: "/auth/login",
      });
    if (isEmpty(figures)) {
      dispatch(getFigures());
    }
    if (isEmpty(user)) {
      dispatch(getProfile());
    }
  }, []);
  return (
    <SecurityLayoutWrapper>
      <Layout>
        <div className="header-wrapper">
          <Header fullName={`${user?.firstName || ''} ${user?.lastName || ''}`} image={user?.avatar} className="container" />
        </div>
        <div className="container layout-content-wrapper">
          <Layout className="layout-content">
            <Sider />
            <div className="content-wrapper">{children}</div>
          </Layout>
        </div>
      </Layout>
    </SecurityLayoutWrapper>
  );
};

export default SecurityLayout;
