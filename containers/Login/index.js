import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Checkbox } from 'antd';
import { MailFilled, LockFilled } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { InputC, ButtonC } from '../../components';
import LoginWrapper from './styles';
import { login } from '../../store/auth/actions';

const LoginForm = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(login(values));
    };
    return (
        <LoginWrapper>
            <div className="main">
                <img alt="logo" src="/images/logo.png" />
                <div className="title">VESTIUMS</div>
                <div className="signin">Sign In</div>
                <div>
                    <Form
                        name="normal_login"
                        className="login-form form-login"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
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
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <InputC
                                prefix={
                                    <LockFilled
                                        className="site-form-item-icon"
                                        style={{ color: '#f8a71b' }}
                                    />
                                }
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <div className="row-remember-fotgot">
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <span className="login-form-forgot text-forgot">
                                <Link
                                    href="/auth/forgot-password"
                                >
                                    Forgot password?
                                </Link>
                            </span>
                        </div>
                        <Form.Item>
                            <ButtonC
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                block
                                loading={loading}
                            >
                                LOG IN
                            </ButtonC>
                        </Form.Item>
                        <div className="text-signin">
                            Already have not an account?{' '}
                            <Link href="/auth/signup">
                                <a className="text">Sign up</a>
                            </Link>
                        </div>
                        <div className="social">
                            <Image
                                src="/images/fb.png"
                                alt="fb"
                                width="100px"
                                height="100px"
                            />
                            <Image
                                src="/images/gg.png"
                                alt="gg"
                                width="100px"
                                height="100px"
                            />
                        </div>
                    </Form>
                </div>
            </div>
        </LoginWrapper>
    );
};

export default LoginForm;
