import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Avatar, Col, Button, Divider, Row, Popover, Tooltip } from 'antd';
import { getConfigSelector } from 'store/config/selectors';
import { reactNewLook, deleteReactNewLook } from 'store/newlooks/actions';
import { useRouter } from 'next/router';
import intersectionBy from 'lodash/intersectionBy';
import flatten from 'lodash/flatten';
import {
  HeartIcon,
  LikeIcon,
  ShareIcon,
  FollowIcon,
} from 'components/SVGIcon';
import { UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import styled from 'styled-components';
import { NewLookItemWrapper } from './styles';

const NewLookItem = ({ newLook }) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { _id, img, user, name, items, isLike, isFavorite, isShare } = newLook || {};

  const reactAction = ({ id, actionType, isDone }) => {
    const action = isDone ? deleteReactNewLook : reactNewLook;
    dispatch(action({
      id,
      actionType,
    }))
  }

  const infos = [
    {
      id: "votes",
      shape: "round",
      Icon: LikeIcon,
      value: (data) => `${data} Votes`,
      isPrimary: isLike,
      onClick: ({ _id }) => reactAction({
        id: _id,
        actionType: 'LIKE',
        isDone: isLike,
      }),
    },
    {
      id: "favorites",
      shape: "circle",
      Icon: HeartIcon,
      value: (data) => `${data} Favorite`,
      isPrimary: isFavorite,
      onClick: ({ _id }) => reactAction({
        id: _id,
        actionType: 'FAVORITE',
        isDone: isFavorite,
      }),
    },
    {
      id: "shares",
      shape: "round",
      Icon: ShareIcon,
      value: () => `Share`,
      CustomButton: () => (
        <Popover
          content={(
            <ShareWrapper>
              <FacebookShareButton
                className="social-btn facebook-btn"
                url={`${window.location.origin}/new-looks/${_id}`}
                onShareWindowClose={() => {
                  if (!isShare) {
                    reactAction({
                      id: _id,
                      actionType: 'SHARE',
                      isDone: isShare,
                    });
                  }
                }}
              >
                <FacebookIcon size={32} />
                <div className="btn-content">Share on Facebook</div>
              </FacebookShareButton>
              <TwitterShareButton
                className="social-btn twitter-btn"
                url={`${window.location.origin}/new-looks/${_id}`}
                onShareWindowClose={() => {
                  if (!isShare) {
                    reactAction({
                      id: _id,
                      actionType: 'SHARE',
                      isDone: isShare,
                    });
                  }
                }}
              >
                <TwitterIcon size={32} />
                <div className="btn-content">Share on Twitter</div>
              </TwitterShareButton>
            </ShareWrapper>
          )}
          trigger="click"
        >
          <Button
            shape="round"
            {...(isShare && {
              type: "primary",
            })}
            icon={<ShareIcon />}
          />
        </Popover>
      ),
      isPrimary: isShare,
    },
    {
      id: "followers",
      shape: "round",
      Icon: FollowIcon,
      value: (data) => `${data} Followers`,
    },
  ];
  
  const configData = useSelector(getConfigSelector);
  const features = useMemo(() => {
    // return stylesIds.map(figureId => figures.find(figure => figure?._id === figureId)?.name)
    return flatten(configData?.map(config => intersectionBy(config.items, newLook?.[config.source]?.map(id => ({ _id: id })), '_id')))
  }, [configData, newLook])

  const handleViewDetail = id => () => push(`/new-looks/${id}`);

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
              <div className="name">{`${user?.firstName || ''} ${user?.lastName || ''}`}</div>
            </div>
            <div className="info">
              {infos.map((info) => (
                <div className="info-button" key={info?.id}>
                  {info?.CustomButton ? (
                    <info.CustomButton />
                  ) : (
                    <Button
                      shape={info?.shape}
                      {...(info?.isPrimary && {
                        type: "primary",
                      })}
                      {...info?.onClick && {
                        onClick: () => info.onClick(newLook),
                      }}
                      {...(info?.Icon && {
                        icon: <info.Icon />,
                      })}
                    >
                      {info?.text || ""}
                    </Button>
                  )}
                  <div className="info-value">
                    {info?.value(newLook?.[info?.id])}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Divider />
          <div className="item-section">        
            <Button onClick={handleViewDetail(_id)} className="detail-btn" type="text" icon={(
              <Tooltip title="View detail">
                <ArrowRightOutlined />
              </Tooltip>
            )} />
            <div className="item-title">{name}</div>
            <div className="tags">
              {features?.map(feature => feature.name)?.toString()?.replaceAll(',', '  ·  ')}
            </div>
            {items?.length > 0 && (
              <Row gutter={[20, 20]} className="items">
                {items.map(
                  ({ id, name: itemName, brand, price, img: itemImg }) => (
                    <Col span={8} key={id}>
                      <div className="item-wrapper">
                        <div className="item-image">
                          <Image
                            objectFit="contain"
                            layout="fill"
                            src={itemImg}
                          />
                        </div>
                        <div className="item-name">{itemName}</div>
                        <div className="item-name">{brand}</div>
                        <div className="price">{`$${price}`}</div>
                      </div>
                    </Col>
                  ),
                )}
              </Row>
            )}
          </div>
        </div>
      </Col>
    </NewLookItemWrapper>
  );
};

const ShareWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .social-btn {
    display: flex;
    align-items: stretch;
    margin-top: 5px;
    margin-bottom: 5px;

    .btn-content {
      display: flex;
      align-items: center;
      padding: 0 14px;
      color: white;
      border-left: 1px solid #fff;
      flex-grow: 2;
    }
  }
  .facebook-btn {
    .btn-content {
      background: #3b5998;
    } 
  }
  .twitter-btn {
    .btn-content {
      background: #00aced;
    } 
  }
`

export default NewLookItem;
