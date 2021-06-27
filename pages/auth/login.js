import React from 'react';
import AuthenLayout from '../../layouts/Authentication';
import LoginConTainer from '../../containers/Login';

const login = () => {
    return (
        <AuthenLayout>
            <LoginConTainer />
        </AuthenLayout>
    );
};

export default login;
