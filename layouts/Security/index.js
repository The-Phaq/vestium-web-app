import React, { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getFigures } from "store/figures/actions";
import { getProfile } from 'store/auth/actions';
import { Layout } from "antd";
import Header from "containers/Header";
import Sider from "containers/Sider";
import { getConfigNewLook, getConfigCategories, getConfigBoutique } from 'store/config/actions';
import SecurityLayoutWrapper from "./styles";

const DefaultFilterSection = () => <div style={{ flexGrow: 2 }} />

const SecurityLayout = ({ children, FilterSection, pageSource }) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const figures = useSelector(state => state.figures.data)

  const categoryConfig = useSelector(state => state.config.category);
  const newLookConfig = useSelector(state => state.config.data);
  const boutiqueConfig = useSelector(state => state.config.boutiqueData);

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

  useEffect(() => {
    if (isEmpty(newLookConfig)) {
      dispatch(getConfigNewLook());
    }
    if (isEmpty(boutiqueConfig)) {
      dispatch(getConfigBoutique());
    }
    if (isEmpty(categoryConfig?.item) && isEmpty(categoryConfig?.background) && isEmpty(categoryConfig?.emoji)) {
      dispatch(getConfigCategories());
    }
  }, [])

  return (
    <SecurityLayoutWrapper>
      <Layout>
        <div className="header-wrapper">
          <Header fullName={`${user?.firstName || ''} ${user?.lastName || ''}`} image={user?.avatar} className="container" />
        </div>
        <div className="container layout-content-wrapper">
          <Layout className="layout-content">
            <Sider FilterSection={FilterSection} pageSource={pageSource} />
            <div className="content-wrapper">{children}</div>
          </Layout>
        </div>
      </Layout>
    </SecurityLayoutWrapper>
  );
};

SecurityLayout.defaultProps = {
  FilterSection: DefaultFilterSection,
  pageSource: 'newlooks',
}

export default SecurityLayout;
