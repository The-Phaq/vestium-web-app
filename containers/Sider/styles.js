import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider } = Layout;

export default styled(Sider)`
  background: #fff;

  .ant-layout-sider-children {
    display: flex;
    align-items: stretch;
    width: 100%;
  }

  .vertical-divider {
    ${'' /* padding-left: 0; */}
  }

  .sider-content {
    height: 100%;
    position: relative;
    flex-grow: 2;
    background: linear-gradient(to top left,transparent 50%,${({ theme }) => theme.palette.lightPrimary} 0) top left/70px 70px no-repeat, #fff;

    .divider {
      padding-right: 0;
    }

    .title {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
    }

    .filter-section {
      .ant-collapse-borderless > .ant-collapse-item {
        border: none;
      }

      .ant-collapse {
        .filter-panel {
          background: #fff;

          .ant-btn {
            width: 100%;
            padding: 4px 0;
            text-align: center;
            line-height: 14px;
            height: auto;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          }
        }
      }

      .filter-title {
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 14px;
      }
    }

    .actions-section {
      display: flex;
      flex-direction: column;
      padding: 10px;
      padding-right: 0;

      & > .ant-btn {
        width: 100%;
        border: 1px solid #F5F1E9;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin-top: 7px;
        margin-bottom: 7px;

        span {
          font-weight: 800;
        }
      }

      .ant-btn-primary {
        border: 1px solid ${({ theme }) => theme.palette.primary};
      }

      .highlight-btn {
        border: 1px solid ${({ theme }) => theme.palette.primary};
        color: ${({ theme }) => theme.palette.primary};
        
      }
    }

    .logo {
      width: 65px;
      height: 80px;
      position: absolute;
      top: -10px;
      left: -10px;
      background: linear-gradient(to top left,transparent 50%,${({ theme }) => theme.palette.lightPrimary} 0) top left/88px 88px no-repeat, transparent;

      img {
        width: 100%;
        object-fit: contain;
      }
    }    
  }
`;