import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { MailFilled } from '@ant-design/icons';
import Link from 'next/link';
import { InputC, ButtonC } from '../../components';
import LoginWrapper from './styles';
import { forgotPassword } from '../../store/auth/actions';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);
    const onFinish = (values) => {
        dispatch(forgotPassword(values));
    };
    return (
        <LoginWrapper>
            <div className="main">
                <img alt="logo" src="/images/logo.png" />
                <div className="title">VESTIUMS</div>
                <div className="signin">Forgot password</div>
                <div>
                    <Form
                        name="normal_login"
                        className="login-form form-login"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                            ]}
                        >
                            <InputC
                                prefix={
                                    <MailFilled
                                        className="site-form-item-icon"
                                        style={{ color: '#f8a71b' }}
                                    />
                                }
                                placeholder="E-mail"
                            />
                        </Form.Item>
                        <Form.Item>
                            <ButtonC
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                block
                                loading={loading}
                            >
                                SEND
                            </ButtonC>
                        </Form.Item>
                        <div className="text-signin">
                            Remember your password?{' '}
                            <Link href="/auth/login">
                                <a className="text">Sign in</a>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </LoginWrapper>
    );
};

export default ForgotPassword;
