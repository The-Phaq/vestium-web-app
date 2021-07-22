import styled from "styled-components";

export default styled.div`
  height: calc(100vh - 110px);
  overflow: auto;
  padding: 14px;

  .filter-boutique {
    display: flex;
    flex-wrap: wrap;

    .ant-btn {
      white-space: break-spaces;
      padding: 4px 7px;
      text-align: center;
      line-height: 14px;
      height: auto;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      margin: 5px 10px;
    }
  }
`;
