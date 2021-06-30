import React from 'react';
import SecurityLayout from 'layouts/Security';
import { Card, Col, Row, Avatar, Tabs, Empty, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ItemInfo from './ItemInfo';
import ProfileWrapper from './styles';

const { TabPane } = Tabs;
const Profile = () => {
    const arrInfo = [
        {
            key: 'ID',
            label: 'ID',
            content: '123948504920',
            labelAction: 'Share ID',
            action: () => {},
        },
        {
            key: 'RANK',
            label: 'Rank',
            content: 'Vestiumer',
            labelAction: '',
            action: () => {},
        },
        {
            key: 'BONUS',
            label: 'Bonus Point',
            content: '4.530',
            labelAction: '',
            action: () => {},
        },
        {
            key: 'FOLLOWER',
            label: 'Followers',
            content: '319',
            labelAction: 'Follower list',
            action: () => {},
        },
        {
            key: 'FRIEND',
            label: 'Friends',
            content: '50',
            labelAction: 'Friends list',
            action: () => {},
        },
    ];
    return (
        <SecurityLayout>
            <ProfileWrapper>
                <Card
                    bordered={false}
                    style={{
                        marginBottom: 24,
                    }}
                >
                    <Row gutter={[48]}>
                        <Col lg={10} md={24}>
                            <div className="avatarHolder">
                                <Avatar
                                    style={{
                                        backgroundColor: '#f8a71b',
                                    }}
                                    icon={
                                        <UserOutlined
                                            style={{ color: '#fff' }}
                                        />
                                    }
                                    size={100}
                                />
                                <div className="name">Anna Giao</div>
                                <Button type="link">Edit Profile</Button>
                            </div>
                            <div className="detail">
                                {arrInfo.map((item) => (
                                    <ItemInfo data={item} key={item.key} />
                                ))}
                            </div>
                        </Col>
                        <Col lg={14} md={24} className="title">
                            Inbox
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Messenge" key="1">
                                    <Empty />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Card>
            </ProfileWrapper>
        </SecurityLayout>
    );
};

export default Profile;
