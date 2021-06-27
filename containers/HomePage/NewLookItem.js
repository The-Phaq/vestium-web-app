import React from 'react';
import { Avatar, Col, Button, Divider } from 'antd';
import Image from 'next/image';
import {
  HeartIcon,
} from 'components/SVGIcon';
import { UserOutlined } from '@ant-design/icons';
import { NewLookItemWrapper } from './styles';

const infos = [
  {
    id: 'votes',
    shape: 'round',
    text: 'VOTE',
    value: data => `${data} Votes`,
    isPrimary: true,
  },
  {
    id: 'favorite',
    shape: 'circle',
    Icon: HeartIcon,
    value: () => 'Favorite',
  },
  {
    id: 'shares',
    shape: 'round',
    text: 'SHARE',
    value: data => `${data} Shares`,
  },
  {
    id: 'followers',
    shape: 'round',
    text: 'FOLLOW',
    value: data => `${data} Followers`,
  },
]

const NewLookItem = ({ newLook }) => {
  const { img, user, name, tags } = newLook || {};
  return (
    <NewLookItemWrapper gutter={[20, 20]}>
      <Col md={11} sm={24} xs={24}>
        <div className="img-wrapper">
          <Image layout="fill" src={img} objectFit="contain" />
        </div>
      </Col>
      <Col md={13} sm={24} xs={24}>
        <div className="info-section">
          <div className="user-section">
            <div className="user">
              <Avatar src={user?.avatar} icon={<UserOutlined />} size={44} />
              <div className="name">
                {user?.name}
              </div>
            </div>
            <div className="info">
              {infos.map(info => (
                <div className="info-button" key={info?.id}>
                  <Button
                    shape={info?.shape}
                    {...info?.isPrimary && {
                      type: 'primary',
                    }}
                    {...info?.Icon && {
                      icon: <info.Icon />,
                    }}
                  >
                    {info?.text || ''}
                  </Button>
                  <div className="info-value">
                    {info?.value(newLook?.[info?.id])}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Divider />
          <div className="item-section">item</div>
        </div>
      </Col>
    </NewLookItemWrapper>
  )
}

export default NewLookItem;
