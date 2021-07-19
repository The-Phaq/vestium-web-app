import React from 'react';
import dynamic from 'next/dynamic';

const AuthenLayout = dynamic(() => import('layouts/Authentication'), {
    ssr: false,
});
const ForgotPassword = dynamic(() => import('containers/ForgotPassword'), {
    ssr: false,
});

const forgotPassword = () => {
    return (
        <AuthenLayout>
            <ForgotPassword />
        </AuthenLayout>
    );
};

export default forgotPassword;
