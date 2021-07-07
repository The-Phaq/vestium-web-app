import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AuthenLayoutWrapper from './styles';

const AuthenLayout = ({ children }) => {
    const { push } = useRouter();
    const { token } = useSelector((state) => state.user);
    useEffect(() => {
        if (token) {
            push({
                pathname: '/',
            });
        }
    }, [token]);
    return (
        <AuthenLayoutWrapper>
            <Layout>
                <div className="content-wrapper">{children}</div>
            </Layout>
        </AuthenLayoutWrapper>
    );
};

export default AuthenLayout;
