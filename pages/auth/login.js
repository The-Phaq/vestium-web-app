import React from 'react';
import dynamic from 'next/dynamic';

const AuthenLayout = dynamic(() => import('layouts/Authentication'), {
    ssr: false,
});
const LoginConTainer = dynamic(() => import('containers/Login'), {
    ssr: false,
});

const login = () => {
    return (
        <AuthenLayout>
            <LoginConTainer />
        </AuthenLayout>
    );
};

export default login;
