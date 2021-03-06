import styled from "styled-components";

export default styled.div`
  ${"" /* height: calc(100vh - 450px); */}
  height: 600px;
  overflow: auto;
  padding: 14px;
  padding-top: 0;

  .ant-image {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
    height: 100%;
    }
  }

  .filter-boutique {
    display: flex;
    flex-wrap: wrap;
    padding: 14px 0;

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
