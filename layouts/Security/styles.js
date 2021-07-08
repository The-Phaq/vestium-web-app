import styled from 'styled-components';

export default styled.div`
    background: ${({ theme }) => theme.palette.lightPrimary};
    min-height: 100vh;

    .ant-layout {
        background: ${({ theme }) => theme.palette.lightPrimary};
    }

    .header-wrapper {
        width: 100%;
        z-index: 99;
        position: fixed;
        top: 0;
    }

    .layout-content-wrapper {
        margin-top: 74px;
    }

    .layout-content {
        background: #fff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin-bottom: 30px;
    }

    .content-wrapper {
        min-height: calc(100vh - 104px);
        width: 100%;
        max-width: calc(100% - 255px);
        height: 88vh;
        overflow-y: auto;
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
