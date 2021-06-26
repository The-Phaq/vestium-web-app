import styled from 'styled-components';
import { Row } from 'antd';

export default styled.div`
  padding: 20px;

  .divider {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const NewLookItemWrapper = styled(Row)`
  margin-top: 10px;
  margin-bottom: 10px;

  .img-wrapper {
    border-radius: 8px;
    border: 1px solid #888181;
    width: 100%;
    min-height: 300px;
    overflow: hidden;
    position: relative;
  }

  .info-section {
    width: 100%;
    height: 100%;

    .ant-divider-horizontal {
      margin: 14px 0;
    }

    .user-section {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .info {
        display: flex;
        align-items: center;

        .info-button {
          display: flex;
          flex-direction: column;
          align-items: center;

          .ant-btn {
            border-radius: 10px;
            border-color: ${({ theme }) => theme.palette.primary};
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            color: ${({  theme }) => theme.palette.primary};

            img {
              width: 20px !important;
              min-width: 20px !important;
              height: 20px !important;
            }

            span {
              font-weight: 600;
            }
          }

          .ant-btn-circle {
            border-radius: 50%;
          }

          .ant-btn-primary {
            color: #fff;
          }

          .info-value {
            margin-top: 5px;
            font-weight: 600;
          }
        }
        
        & > div {
          margin-right: 5px;
          margin-left: 5px;
        }
      }

      .user {
        display: flex;
        flex-direction: column;
        align-items: center;

        .name {
          font-weight: bold;
        }
      }
    }

    & > * {
      width: 100%;
    }
  }
`;