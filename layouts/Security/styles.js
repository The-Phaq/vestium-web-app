import styled from 'styled-components';
import { Layout } from 'antd';

export default styled(Layout)`
  background: ${({ theme }) => theme.palette.lightPrimary};

  .content-wrapper {
    min-height: calc(100vh - 64px);
  }
`;