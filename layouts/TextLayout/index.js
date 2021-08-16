import React, { useEffect } from "react";
import { Layout } from "antd";
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useTranslation } from 'i18n';

const TextLayout = ({ children }) => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const onClick = () => {
    push('/');
  }
  return (
    <TextLayoutWrapper>
      <Layout>
        <div className="container layout-content-wrapper">
          <div className="layout-content">
            <div className="logo-section" onClick={onClick} role="presentation">
                <div className="logo">
                  <img
                    alt="logo"
                    src="/images/logo.png"
                  />
                </div>
                <div className="title">
                  {t('app.appName')}
                </div>
              </div>
              {children}
          </div>
        </div>
      </Layout>
    </TextLayoutWrapper>
  );
};

const TextLayoutWrapper = styled.div`
  background: ${({ theme }) => theme.palette.lightPrimary};
  min-height: 100vh;

.ant-layout {
  background: ${({ theme }) => theme.palette.lightPrimary};
  overflow: hidden;
}

.layout-content-wrapper {
  min-height: 100vh;
  max-height: 100vh !important;
  overflow: auto;
}

.layout-content {
  margin-top: 20px;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px;
  min-height: calc(100vh - 50px);

  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .logo {
      width: 65px;
      height: 80px;

      img {
          width: 100%;
          object-fit: contain;
      }
    }

    .title {
      font-size: 22px;
    }
  }
}

.content-wrapper {
  
}
.content-wrapper::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  border-radius: 10px;
}

.content-wrapper::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.content-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.primary};
}
`;


export default TextLayout;
