import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  div::-webkit-scrollbar-track {
    background: #fff !important;
  }

  .text-uppercase {
    text-transform: uppercase;
    span {
      text-transform: uppercase;
    }
  }

  html,body {
    padding: 0;
    margin: 0;
    font-family: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif';
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    font-family: 'Rubik', serif;
  }

  img {
    object-fit: contain;
  }

  p, h3, h4, h1, h2 {
    margin-bottom: 0;
  }

  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    font-family: 'Rubik', serif;
    max-height: calc(100vh);
    max-width: calc(100vw);
  }

  @media (min-width: 576px) {
    .container {
      max-width: 540px;
    }
  }

  @media (max-width: 768px) {
    .container {
      max-width: calc(100vw);
    }
  }

  @media (max-width: 992px) {
    .container {
      max-width: calc(100vw);
    }
  }

  @media (max-width: 1200px) {
    .container {
      max-width: calc(100vw);
    }
  }
  @media (min-width: 1201px) {
    .container {
      max-width: calc(100vw);
    }
  }
  @media (min-width: 1441px) {
    .container {
      max-width: calc(100vw);
    }
  }
  @media (min-width: 2000px) {
    .container {
      max-width: calc(100vw - 200px);
    }
  }

  .list-item-variants {
    width: 400px;
    height: 200px;
    display: flex;
    overflow: auto;

    .variant-item {
      .ant-image {
        border-radius: 10px;
        border: 1px solid #ddd;
        width: 130px;
        margin: 0 8px;
      }
    }
  }
`;
