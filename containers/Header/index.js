import React from 'react';
import { Button, Input, Dropdown, Avatar, Menu } from 'antd';
import {
  HomeIcon,
  HeartIcon,
  VestIcon,
  CalendarIcon,
} from 'components/SVGIcon';
import {
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import HeaderWrapper from './styles';

const Header = ({ image, fullName }) => {

  const actionButtons = [
    {
      Icon: HomeIcon,
      isPrimary: true,
    },
    {
      Icon: HeartIcon,
    },
    {
      Icon: VestIcon,
    },
    {
      Icon: CalendarIcon,
    },
  ]

  const handleSearch = () => {}

  const handleLogout = () => {}

  return (
    <HeaderWrapper className="container">
      <div className="left-header" />
      <Input
        className="search-input"
        size="large"
        suffix={<SearchOutlined />}
        onPressEnter={handleSearch}
      />
      <div className="right-header">
        {actionButtons.map(({ isPrimary, Icon }) => (
          <Button
            {...isPrimary && {
              type: 'primary',
            }}
            className="nav-icon-button"
            shape="circle"
            icon={<Icon />}
          />
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
                  <Menu.Item onClick={handleLogout} key="logout">
                    Logout
                  </Menu.Item>
                </Menu>
              )}
              trigger={['click']}
            >
              <Avatar
                src={image}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  )
}

Header.defaultProps = {
  fullName: 'Anne Giao',
  image: '/images/avatar.png',
}

export default Header;