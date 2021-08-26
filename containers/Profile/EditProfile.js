import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Button, Avatar, Upload, Spin, message } from 'antd';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getUrl, uploadMedia } from 'api/uploadMedia';
import { useTranslation } from 'i18n';
import { UserOutlined, CameraOutlined } from '@ant-design/icons';
import { updateProfile } from 'store/auth/asyncActions';

const EditProfile = ({ user, handleToggle }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [imageDisplay, setImageDisplay] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = values => {
    setLoading(true);
    dispatch(updateProfile(values)).then(() => {
      handleToggle();
      setLoading(false);
    });
  }

  const customRequest = async ({ onSuccess, file, onError }) => {
    try {
      setLoading(true);
      const responseS3 = await getUrl(
        file.name,
        file.type,
        'user',
      );
      const response = await uploadMedia(responseS3.uploadUrl, file);
      if (response) {
        setImageDisplay(responseS3.url);
        form.setFieldsValue({
          avatar: responseS3.url,
        })
        onSuccess(
          responseS3.url,
          file,
        );
      }
      message.success(t('upload.success'))
      setLoading(false);
    } catch (error) {
      setLoading(false); 
      onError()
      message.error(t('upload.error'))
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
      setImageDisplay(user?.avatar);
    }
  }, [])

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <EditProfileWrapper gutter={20}>
        <Col span={24} className="avatar-wrapper">
          <Upload
            customRequest={customRequest}
            showUploadList={false}
            accept="image/*"
          >
            <div className="avatar-section">
              <div className="overlay">
                {loading ? (
                  <Spin />
                ) : (
                  <CameraOutlined />
                )}
              </div>
              <Avatar icon={<UserOutlined />} src={imageDisplay} size={100} />
            </div>
          </Upload>
          <Form.Item name="avatar">
              <Input style={{ display: 'none' }} />
            </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item rules={[{ required: true, message: t('input.firstName.required') }]} name="firstName" label={t('input.firstName.placeholder')}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item rules={[{ required: true, message: t('input.lastName.required') }]} name="lastName" label={t('input.lastName.placeholder')}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Button className="action-btn" htmlType="submit" type="primary" loading={loading}>
            {t('button.save')}
          </Button>
        </Col>
        <Col span={12}>
          <Button className="action-btn" onClick={handleToggle}>
            {t('button.cancel')}
          </Button>
        </Col>
      </EditProfileWrapper>
    </Form>
  )
}

const EditProfileWrapper = styled(Row)`
  .action-btn {
    width: 100%;
  }

  .avatar-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    .avatar-section {
      position: relative;
    }

    .overlay {
      z-index: 10;
      width: 100px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;

      .anticon {
        display: none;
        font-size: 30px;
      }

      &:hover {
        background: #00000050;

        .anticon {
          display: block;
          color: #fff;
        }
      }
    }
  }
`;

export default EditProfile;