import React from 'react';
import DividerWrapper from './styles';

const Divider = ({ className, vertical, color }) => (
  <DividerWrapper vertical={vertical} color={color} className={className}>
    <div
      className="divider-line"
      style={{
        ...(vertical
          ? {
              width: 0,
              height: '100%',
            } 
          : {
              width: '100%',
              height: 0,
            }),
      }}
    />
  </DividerWrapper>
);

Divider.defaultProps = {
  vertical: false,
  color: '#F5F1E9',
};

export default Divider;
