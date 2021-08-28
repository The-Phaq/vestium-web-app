import styled from "styled-components";

export default styled.div`
  border: 1px solid #ddd;
  border-radius: 18px;
  width: 500px;
  min-width: 500px;
  height: 500px;

  canvas {
    border-radius: 15px;
    border: 1px solid #ddd;
    overflow: hidden;
  }

  .action-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }
`;
