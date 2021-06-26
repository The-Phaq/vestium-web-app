import styled from 'styled-components';
import { Layout } from 'antd';

export default styled(Layout)`
    background: ${({ theme }) => theme.palette.lightPrimary};

    .content-wrapper {
        min-height: calc(100vh);
    }
    .hinh1 {
        position: absolute;
        width: 176px;
        height: 655px;
        left: 167px;
        top: 1px;
    }
    .hinh2 {
        position: absolute;
        width: 244px;
        height: 898px;
        left: 313px;
        top: -3px;
    }
    .hinh3 {
        position: absolute;
        width: 318px;
        height: 1080px;
        left: 992px;
        top: 369px;
    }
    .notch {
        clip-path: polygon(
            0 40%,
            8% 0,
            100% 0,
            100% 10%,
            100% 60%,
            92% 100%,
            10% 100%,
            0% 100%,
            0% 10%
        );
    }
`;
