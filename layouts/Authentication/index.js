import React from 'react';
import { Layout } from 'antd';
import AuthenLayoutWrapper from './styles';

const AuthenLayout = ({ children }) => {
    return (
        <AuthenLayoutWrapper>
            <Layout>
                <div className="content-wrapper">{children}</div>
            </Layout>
        </AuthenLayoutWrapper>
    );
};

export default AuthenLayout;
