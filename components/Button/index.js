import React from 'react';
import { Button } from 'antd';
import InputWrapper from './styles';

const ButtonC = ({ className, ...props }) => (
    <InputWrapper className={className}>
        <Button className="notch" size="large" {...props} />
    </InputWrapper>
);

export default ButtonC;
