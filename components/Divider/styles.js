import styled from 'styled-components';

export default styled.div`
  padding: 10px;

  .divider-line {
    border: 3px solid ${({ color }) => color};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;