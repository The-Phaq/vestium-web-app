import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { useTranslation } from 'i18n';
import { MailFilled } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { InputC, ButtonC } from '../../components';
import LoginWrapper from './styles';
import { forgotPassword } from '../../store/auth/actions';

const ForgotPassword = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { push } = useRouter();
    const { loading } = useSelector((state) => state.user);
    const onFinish = (values) => {
        dispatch(forgotPassword(values)).then(() => {
            push({
                pathname: '/auth/reset-password',
                query: {
                    email: values.email,
                },
            })
        });
    };
    return (
        <LoginWrapper>
            <div className="main">
                <img alt="logo" src="/images/logo.png" />
                <div className="title">
                    {t('app.appName')}
                </div>
                <div className="signin">
                    {t('auth.forgotPassword')}
                </div>
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
                        <Form.Item>
                            <ButtonC
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                block
                                loading={loading}
                            >
                                {t('button.send')}
                            </ButtonC>
                        </Form.Item>
                        <div className="text-signin">
                            {t('auth.rememberPassword')}
                            {' '}
                            <Link href="/auth/login">
                                <a className="text">
                                    {t('button.signin')}
                                </a>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </LoginWrapper>
    );
};

export default ForgotPassword;
