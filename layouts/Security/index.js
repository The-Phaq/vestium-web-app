import React from 'react';
import Header from 'containers/Header';
import SecurityLayoutWrapper from './styles';

const SecurityLayout = ({ children }) => {
  return (
    <SecurityLayoutWrapper>
      <Header />
      <div className="container content-wrapper">
        {children}
      </div>
    </SecurityLayoutWrapper>
  )
}

export default SecurityLayout;
