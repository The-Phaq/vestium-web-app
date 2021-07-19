import React from 'react';
import dynamic from 'next/dynamic';

const AuthenLayout = dynamic(() => import('layouts/Authentication'), {
    ssr: false,
});
const ResetPassword = dynamic(() => import('containers/ResetPassword'), {
    ssr: false,
});

const forgotPassword = () => {
    return (
        <AuthenLayout>
            <ResetPassword />
        </AuthenLayout>
    );
};

export default forgotPassword;
