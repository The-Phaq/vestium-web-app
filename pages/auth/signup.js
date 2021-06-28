import React from 'react';
import dynamic from 'next/dynamic';

const AuthenLayout = dynamic(() => import('layouts/Authentication'), {
    ssr: false,
});
const SignUpConTainer = dynamic(() => import('containers/SignUp'), {
    ssr: false,
});

const login = () => {
    return (
        <AuthenLayout>
            <SignUpConTainer />
        </AuthenLayout>
    );
};

export default login;
