import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Checkbox, Image, Button } from 'antd';
import { MailFilled, LockFilled, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useTranslation } from 'i18n';
import { InputC, ButtonC } from '../../components';
import LoginWrapper from './styles';
import { login, loginWithGoogle, loginWithFacebook } from '../../store/auth/actions';

const LoginForm = () => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(login(values));
    };

    const handleClickGoogle = () => {
        dispatch(loginWithGoogle());
    }
    const handleClickFacebook = () => {
        dispatch(loginWithFacebook());
    }

    return (
        <LoginWrapper>
            <div className="main">
                <img alt="logo" src="/images/logo.png" />
                <div className="title">
                    {t('app.appName')}
                </div>
                <div className="signin">
                    {t('auth.signIn')}
                </div>
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
                                    message: t('input.email.required'),
                                },
                                {
                                    type: 'email',
                                    message: t('input.email.valid'),
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
                                placeholder={t('input.email.placeholder')}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: t('input.password.required'),
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
                                placeholder={t('input.password.placeholder')}
                            />
                        </Form.Item>
                        <div className="row-remember-fotgot">
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>
                                    {t('auth.remember')}
                                </Checkbox>
                            </Form.Item>
                            <span className="login-form-forgot text-forgot">
                                <Link
                                    href="/auth/forgot-password"
                                >
                                    {t('auth.forgotPasswordText')}
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
                                {t('button.login')}
                            </ButtonC>
                        </Form.Item>
                        <div className="text-signin">
                            {t('auth.noAccount')}
                            {' '}
                            <Link href="/auth/signup">
                                <a className="text">
                                    {t('button.signup')}
                                </a>
                            </Link>
                        </div>
                        <div className="social">
                            <Button className="login-btn" onClick={handleClickFacebook}>
                                <Image
                                    preview={false}
                                    src="/images/fb.png"
                                    alt="fb"
                                    width="100px"
                                    height="100px"
                                />
                            </Button>
                            <Button className="login-btn" onClick={handleClickGoogle}>
                                <Image
                                    preview={false}
                                    src="/images/gg.png"
                                    alt="gg"
                                    width="100px"
                                    height="100px"
                                />
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </LoginWrapper>
    );
};

export default LoginForm;
