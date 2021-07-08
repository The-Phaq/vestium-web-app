import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const ButtonWrapper = styled(Button)`
  min-width: 220px;
  padding: 6.4px 30px;
  box-shadow: none;
  position: relative;
  transition: color 0.5s !important;

  &:after {
    position: absolute;
    content: "";
    display: block;
    right: -1px;
    bottom: -1px;
    width: 10px;
    height: 10px;
    background: linear-gradient(to left top, white 50%, transparent 50%)
            , linear-gradient(to left top, #d9d9d9 50%, transparent 50%)
            ;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position:
        left top
        , -1px -0px
        ;
  }

  &:before {
    opacity: 1;
    border-radius: 0;
    position: absolute;
    content: "";
    display: block;
    top: -3px;
    left: -1px;
    width: 10px;
    height: 10px;
    background: linear-gradient(to right bottom, white 50%, transparent 50%)
            , linear-gradient(to right bottom, #d9d9d9 50%, transparent 50%)
            ;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position:
        right bottom
        , -1px 2px
        ;
  }

  &:hover {
    &:before {
      background: linear-gradient(to right bottom, white 50%, transparent 50%)
            , linear-gradient(to right bottom, ${({theme }) => theme.palette.primary} 50%, transparent 50%)
            ;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position:
        right bottom
        , -1px 2px
        ;
    }
    &:after {
      background: linear-gradient(to left top, white 50%, transparent 50%)
          , linear-gradient(to left top, ${({ theme }) => `${theme.palette.primary}70`} 50%, transparent 50%)
          ;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: left top ,-1px -0px;
    }
  }

  &.ant-btn-primary {
    &:before {
      background: linear-gradient(to right bottom, white 50%, transparent 50%)
            , linear-gradient(to right bottom, ${({theme }) => theme.palette.primary} 50%, transparent 50%)
            ;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position:
        right bottom
        , -1px 2px
        ;
    }
    &:after {
      background: linear-gradient(to left top, white 50%, transparent 50%)
            , linear-gradient(to left top, ${({ theme }) => `${theme.palette.primary}70`} 50%, transparent 50%)
            ;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: left top ,-1px -0px;
    }
  }
`;

const SharpEdgeButton = ({ children, ...props}) => <ButtonWrapper {...props}>{children}</ButtonWrapper>

export default SharpEdgeButton;
