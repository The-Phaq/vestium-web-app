import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Dropdown, Avatar, Menu } from 'antd';
import { HeartIcon, VestIcon, CalendarIcon } from 'components/SVGIcon';
import { useRouter } from 'next/router';
import { getCurrentTab } from 'utils/tools';
import cookies from 'js-cookie';
import { i18n, useTranslation } from 'i18n';
import Link from 'next/link';
import { SearchOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { logout } from '../../store/auth/actions';
import HeaderWrapper from './styles';

const actionButtons = [
    {
        Icon: HomeOutlined,
        url: '/',
        key: 'home',
    },
    {
        Icon: HeartIcon,
        url: '/favorites',
        key: 'favorites',
    },
    {
        Icon: VestIcon,
        url: '/vestiums',
        key: 'vestiums',
    },
    {
        Icon: CalendarIcon,
        url: '/calendar',
        key: 'calendar',
    },
];

const Header = ({ image, fullName }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentLanguage = cookies.get('next-i18next') || 'en';
    const { pathname, push, query } = useRouter();
    const handleChangeLanguage = lang => () => {
        cookies.set('next-i18next', lang)
        i18n.changeLanguage(lang);
        const timeout = setTimeout(() => {
            window.location.reload();
            clearTimeout(timeout);
        }, 1000);
    }

    const { q } = query;
    let url = getCurrentTab(pathname, 1);

    if (['home', 'boutique', 'create-new-look'].includes(url)) {
        url = 'home';
    }

    const handleSearch = (e) => {
        push({
            pathname: '/',
            ...(e.target.value
                ? {
                      query: {
                          q: e.target.value,
                      },
                  }
                : {}),
        });
    };

    const handleLogout = () => {
        dispatch(logout());
        push({
            pathname: '/auth/login',
        });
    };

    const handleProfile = () => {
        push({
            pathname: '/profile',
        });
    };
    return (
        <HeaderWrapper className="container">
            <div className="left-header" />
            <Input
                className="search-input"
                size="large"
                {...(q && {
                    defaultValue: q,
                })}
                suffix={<SearchOutlined />}
                onPressEnter={handleSearch}
            />
            <div className="right-header">
                {actionButtons.map(({ key, Icon, url: btnUrl }, index) => (
                    <Link href={btnUrl} key={`button-${String(index)}`}>
                        <Button
                            {...((url || 'home') === key && {
                                type: 'primary',
                            })}
                            className="nav-icon-button"
                            shape="circle"
                            icon={<Icon size={22} />}
                        />
                    </Link>
                ))}
                <div className="user-section">
                    <div className="name">
                        <h3>{fullName}</h3>
                    </div>
                    <div className="avatar">
                        <Dropdown
                            overlay={() => (
                                <MenuWrapper style={{ minWidth: '120px' }}>
                                    <Menu.Item className="change-language-section">
                                        <div onClick={e => e.stopPropagation()} role="presentation" className="change-language">
                                            <Button className={(currentLanguage === 'en') && 'active-language'} onClick={handleChangeLanguage('en')} type="text">EN</Button>
                                            |
                                            <Button className={(currentLanguage === 'fr') && 'active-language'} onClick={handleChangeLanguage('fr')} type="text">FR</Button>
                                            |
                                            <Button className={(currentLanguage === 'vi') && 'active-language'} onClick={handleChangeLanguage('vi')} type="text">VI</Button>
                                        </div>
                                    </Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item
                                        onClick={handleProfile}
                                        key="profile"
                                    >
                                        {t('button.profile')}
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={handleLogout}
                                        key="logout"
                                    >
                                        {t('button.logout')}
                                    </Menu.Item>
                                </MenuWrapper>
                            )}
                            trigger={['click']}
                        >
                            <Avatar
                                size={50}
                                src={image}
                                icon={<UserOutlined />}
                            />
                        </Dropdown>
                    </div>
                </div>
            </div>
        </HeaderWrapper>
    );
};

Header.defaultProps = {
    fullName: '',
};

const MenuWrapper = styled(Menu)`
    .change-language-section {
        background: #fff;
    }
    .change-language {
        background: #fff;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;

        .ant-btn {
            padding: 0;
        }

        .active-language {
            span {
                color: #F8A71B;
            }
        }
    }
`

export default Header;
