import React, { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getFigures } from "store/figures/actions";
import { Layout } from "antd";
import Header from "containers/Header";
import Sider from "containers/Sider";
import SecurityLayoutWrapper from "./styles";

const SecurityLayout = ({ children }) => {
  const { pathname, push, query } = useRouter();
  const dispatch = useDispatch();
  const figures = useSelector((state) => state.figures.data);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!user)
      push({
        pathname: "/auth/login",
      });
    if (isEmpty(figures)) {
      dispatch(getFigures());
    }
  }, []);
  return (
    <SecurityLayoutWrapper>
      <Layout>
        <div className="header-wrapper">
          <Header
            className="container"
            fullName={`${user?.firstName} ${user?.lastName}`}
          />
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
