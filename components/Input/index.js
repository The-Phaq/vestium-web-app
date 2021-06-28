import React from 'react';
import { Input } from 'antd';
import InputWrapper from './styles';

const InputC = ({ className, ...props }) => (
    <InputWrapper className={className}>
        <Input className="notch" size="large" {...props} />
    </InputWrapper>
);

export default InputC;
