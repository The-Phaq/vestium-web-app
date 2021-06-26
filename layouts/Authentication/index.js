import React from 'react';
import Image from 'next/image';
import AuthenLayoutWrapper from './styles';

const AuthenLayout = ({ children }) => {
    return (
        <AuthenLayoutWrapper>
            <Image
                src="/images/h1.png"
                alt="Picture of the author"
                className="hinh1"
                width={176}
                height={655}
            />
            <Image
                src="/images/g1.png"
                alt="Picture of the author"
                className="hinh2"
                width={176}
                height={655}
            />
            <Image
                src="/images/f1.png"
                alt="Picture of the author"
                className="hinh3"
                width={176}
                height={655}
            />
            <div className="container content-wrapper">{children}</div>
        </AuthenLayoutWrapper>
    );
};

export default AuthenLayout;
