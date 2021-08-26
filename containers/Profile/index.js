import React, { useEffect, useState } from 'react';
import SecurityLayout from 'layouts/Security';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row, Avatar, Tabs, Empty, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ItemInfo from './ItemInfo';
import ProfileWrapper from './styles';
import EditProfile from './EditProfile';
import { getProfile } from '../../store/auth/actions';

const { TabPane } = Tabs;
const Profile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getProfile());
    }, []);

    const handleEditProfile = () => {
        setIsEdit(!isEdit);
    }

    const arrInfo = [
        {
            key: 'ID',
            label: 'ID',
            content: user?._id,
            labelAction: 'Share ID',
            action: () => {},
        },
        {
            key: 'RANK',
            label: 'Rank',
            content: user?.rank,
            labelAction: '',
            action: () => {},
        },
        {
            key: 'BONUS',
            label: 'Bonus Point',
            content: user?.pointCount,
            labelAction: '',
            action: () => {},
        },
        {
            key: 'FOLLOWER',
            label: 'Followers',
            content: user?.followerCount,
            labelAction: 'Follower list',
            action: () => {},
        },
        {
            key: 'FRIEND',
            label: 'Friends',
            content: user?.friendCount,
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
                        <Col lg={12} md={24}>
                            {isEdit && user ? (
                                <EditProfile user={user} isEdit={isEdit} handleToggle={handleEditProfile} />
                            ) : (
                                <>
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
                                        src={user?.avatar}
                                    />
                                    <div className="name">{`${user?.firstName} ${user?.lastName}`}</div>
                                    <Button type="link" onClick={handleEditProfile}>Edit Profile</Button>
                                </div>
                                <div className="detail">
                                    {arrInfo.map((item) => (
                                        <ItemInfo data={item} key={item.key} />
                                    ))}
                                </div>
                                </>
                            )}
                        </Col>
                        <Col lg={12} md={24} className="title">
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
