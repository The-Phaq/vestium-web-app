import styled from 'styled-components';

export default styled.div`
  background: ${({ theme }) => theme.palette.lightPrimary};
  min-height: 100vh;

  .ant-layout {
    background: ${({ theme }) => theme.palette.lightPrimary};
  }

  .layout-content {
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .content-wrapper {
    min-height: calc(100vh - 94px);
    width: 100%;
  }
`;