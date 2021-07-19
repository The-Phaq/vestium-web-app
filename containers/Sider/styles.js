import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider } = Layout;

export default styled(Sider)`
    background: #fff;
    overflow-y: auto;

    .ant-layout-sider-children {
        display: flex;
        align-items: stretch;
        width: 100%;
        background: #fff !important;
    }

    .vertical-divider {
        ${'' /* padding-left: 0; */}
    }

    .sider-content {
        height: 100%;
        position: relative;
        flex-grow: 2;
        background: linear-gradient(
                    to top left,
                    transparent 50%,
                    ${({ theme }) => theme.palette.lightPrimary} 0
                )
                top left/70px 70px no-repeat,
            #fff;
        display: flex;
        flex-direction: column;

        .divider {
            padding-right: 0;
        }

        .title {
            height: 80px;
            min-height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 700;
        }

        .actions-section {
            display: flex;
            flex-direction: column;
            padding: 10px;
            padding-right: 0;

            & > .ant-btn {
                width: 100%;
                border: 1px solid #f5f1e9;
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
                &.ant-btn-primary {
                    color: #fff;
                }
            }
        }

        .logo {
            width: 65px;
            height: 80px;
            position: absolute;
            top: -10px;
            left: -10px;
            background: linear-gradient(
                        to top left,
                        transparent 50%,
                        ${({ theme }) => theme.palette.lightPrimary} 0
                    )
                    top left/88px 88px no-repeat,
                transparent;

            img {
                width: 100%;
                object-fit: contain;
            }
        }
    }
`;
