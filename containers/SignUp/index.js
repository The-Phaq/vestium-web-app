import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Form, Checkbox } from 'antd';
import { MailFilled, LockFilled, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useTranslation } from 'i18n';
import { InputC, ButtonC } from '../../components';
import LoginWrapper from '../Login/styles';
import { register } from '../../store/auth/actions';

const SignUpForm = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { query } = useRouter();
    const { loading } = useSelector((state) => state.user);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(register({ ...values, ...query }));
    };

    return (
        <LoginWrapper>
            <div className="main">
                <img alt="logo" src="/images/logo.png" />
                <div className="title">
                    {t('app.appName')}
                </div>
                <div className="signin">Sign Up</div>
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
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <InputC
                                prefix={
                                    <UserOutlined
                                        className="site-form-item-icon"
                                        style={{ color: '#f8a71b' }}
                                    />
                                }
                                placeholder="Name"
                            />
                        </Form.Item>
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
                                <Checkbox>
                                    I read and agree to{' '}
                                    <a className="text" href="">
                                        Term & Conditions
                                    </a>
                                </Checkbox>
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <ButtonC
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                block
                                loading={loading}
                            >
                                CREAT ACCOUNT
                            </ButtonC>
                        </Form.Item>
                        <div className="text-signin">
                            Already have an account?{' '}
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

export default SignUpForm;
