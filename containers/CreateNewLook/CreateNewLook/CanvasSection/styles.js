import styled from "styled-components";

export default styled.div`
  border: 1px solid #ddd;
  border-radius: 18px;
  width: 600px;
  min-width: 600px;
  height: 600px;

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
