import styled from 'styled-components';

export default styled.div`
    .notch {
        clip-path: polygon(
            0 46%,
            7% 0,
            100% 0,
            100% 10%,
            100% 54%,
            93% 100%,
            10% 100%,
            0% 100%,
            0% 10%
        );
        // todo
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        /* flex: 1; */
    }
`;
