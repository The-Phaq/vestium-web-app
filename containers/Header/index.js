import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Dropdown, Avatar, Menu } from 'antd';
import { HeartIcon, VestIcon, CalendarIcon } from 'components/SVGIcon';
import { useRouter } from 'next/router';
import { getCurrentTab } from 'utils/tools';
import Link from 'next/link';
import { SearchOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
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
    const dispatch = useDispatch();
    const { pathname, push, query } = useRouter();

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
                                <Menu style={{ minWidth: '120px' }}>
                                    <Menu.Divider />
                                    <Menu.Item
                                        onClick={handleProfile}
                                        key="profile"
                                    >
                                        Profile
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={handleLogout}
                                        key="logout"
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu>
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

export default Header;
