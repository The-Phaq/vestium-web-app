import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .image-wrapper {
    width: 100%;
    height: 160px;
    position: relative;
    border-radius: 10px;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .item-title {
    font-weight: bold;
  }

  .price {
    font-weight: 500;
  }
`;