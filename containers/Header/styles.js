import styled from "styled-components";
import { Layout } from "antd";

const { Header } = Layout;

export default styled(Header)`
  background: ${({ theme }) => theme.palette.lightPrimary} !important;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .search-input {
    max-width: 350px;
    background: #fff;
    border-radius: 10px;
    border: none;
    flex: 1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    input {
      background: transparent;
    }
  }

  .right-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .ant-btn-circle {
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 22px;
        min-width: 22px;
        height: 22px;
      }

      span {
        color: ${({ theme }) => theme.palette.primary};
      }
    }

    .ant-btn-primary {
      background: ${({ theme }) => theme.palette.primary};

      .img-icon {
        img {
          filter: brightness(0) invert(1);
        }
      }

      span {
        color: #fff;
      }
    }
    .nav-icon-button {
      padding: 20px;
      border: none;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

      .img-icon {
        img {
          width: 22px !important;
          min-width: 22px !important;
          height: 22px !important;
        }
      }
    }

    .user-section {
      display: flex;
      ${"" /* width: 50%; */}
      justify-content: flex-end;
      align-items: center;
      margin-right: 0;

      .name {
        padding-left: 23px;
        padding-right: 12px;
        h3,
        p {
          text-align: right;
          margin-bottom: 0;
        }
        h3 {
          font-weight: 700;
          font-size: 16px;
          line-height: 19.36px;
        }
        p {
          font-weight: 400;
          font-size: 14px;
          line-height: 14.52px;
        }
      }

      .ant-avatar-image {
        width: 40px;
        height: 40px;
      }

      .ant-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        height: 35px;
        width: 35px;
        padding-bottom: 5px;
        border: none;
        background: #fff7e8;

        .anticon > svg {
          font-size: 20px;
          fill: #f5a303;
        }

        &.bell {
          margin-left: 14px;
        }
      }
    }

    & > * {
      margin-right: 10px;
      margin-left: 10px;
    }
  }

  @media (max-width: 520px) {
    .right-header {
      .nav-icon-button {
        display: none;
      }

      .user-section {
        .name {
          display: none;
        }
      }
    }
  }
`;
