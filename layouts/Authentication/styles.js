import styled from "styled-components";
import { Layout } from "antd";

export default styled(Layout)`
  background: ${({ theme }) => theme.palette.lightPrimary};

  .content-wrapper {
    height: 100vh;
    min-height: 960px;
    background-image: url("/images/bgimage.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
`;
