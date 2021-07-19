import styled from "styled-components";

export default styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .image-wrapper {
    width: 100%;
    height: 250px;
    position: relative;
    border-radius: 10px;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    .ant-image {
      height: 100%;
      display: flex;

      img {
        height: 100%;
      }
    }
  }

  .item-title {
    margin-top: 8px;
    font-weight: bold;
    text-align: center;
    font-size: 18px;
    line-height: 21px;
  }

  .price {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    margin-top: 6px;
    text-align: center;
  }
`;
