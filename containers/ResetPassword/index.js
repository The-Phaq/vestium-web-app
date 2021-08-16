import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { MailFilled, LoginOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useTranslation } from 'i18n';
import { InputC, ButtonC } from '../../components';
import LoginWrapper from './styles';
import { resetPassword } from '../../store/auth/actions';

const ForgotPassword = () => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { push, query } = useRouter();
    const { email } = query || {};
    const { loading } = useSelector((state) => state.user);
    const onFinish = (values) => {
        dispatch(resetPassword(values)).then(() => {
            push('/auth/login')
        });
    };
    return (
        <LoginWrapper>
            <div className="main">
                <img alt="logo" src="/images/logo.png" />
                <div className="title">
                    {t('app.appName')}
                </div>
                <div className="signin">Reset password</div>
                <div>
                    <Form
                        name="normal_login"
                        className="login-form form-login"
                        initialValues={{
                            email,
                        }}
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
                                disabled
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
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <InputC
                                prefix={
                                    <LoginOutlined
                                        className="site-form-item-icon"
                                        style={{ color: '#f8a71b' }}
                                    />
                                }
                                placeholder="Code"
                            />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <InputC
                                prefix={
                                    <LockOutlined
                                        className="site-form-item-icon"
                                        style={{ color: '#f8a71b' }}
                                    />
                                }
                                suffix={
                                    showPassword ? (
                                        <EyeInvisibleOutlined
                                            className="site-form-item-icon"
                                            onClick={() => setShowPassword(false)}
                                            style={{ color: '#f8a71b' }}
                                        />
                                    ) : (
                                        <EyeOutlined
                                            className="site-form-item-icon"
                                            onClick={() => setShowPassword(true)}
                                            style={{ color: '#f8a71b' }}
                                        />
                                    )
                                }
                                type={showPassword ? 'text': 'password'}
                                placeholder="Password"
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
                                RESET PASSWORD
                            </ButtonC>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </LoginWrapper>
    );
};

export default ForgotPassword;
