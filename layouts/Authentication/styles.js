import styled from "styled-components";
import { Layout } from "antd";

export default styled(Layout)`
  background: ${({ theme }) => theme.palette.lightPrimary};

  .content-wrapper {
    height: 100vh;
    background-image: url("/images/background.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
`;
