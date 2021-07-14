import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NextSeo } from 'next-seo';
import { Avatar, Col, Button, Divider, Row, message, Skeleton, Image } from 'antd';
import SecurityLayout from 'layouts/Security';
import { getAllFiguresSelectors } from 'store/figures/selectors';
import {
  HeartIcon,
} from 'components/SVGIcon';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const NewLookItemWrapper = styled(Row)`
  margin: 10px !important;
  padding: 0 20px;

  .img-wrapper {
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
    min-height: 400px;
    overflow: hidden;
    position: relative;

    .ant-image {
      height: 100%;
      display: flex;

      img {
        height: 100%;
      }
    }
  }

  .item-section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .detail-btn {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .item-title {
      font-size: 26px;
      text-transform: uppercase;
      font-weight: 800;
      text-align: center;
    }

    .tags {
      width: 80%;
      font-size: 14px;
      text-transform: uppercase;
      text-align: center;
    }

    .items {
      margin-top: 20px;
      width: 100%;

      .item-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .item-image {
          width: 100%;
          height: 140px;
          position: relative;
          
          .ant-image {
            height: 100%;
            display: flex;

            img {
              height: 100%;
            }
          }
        }
        
        .item-name {
          font-weight: bold;
          text-align: center;
        }

        .price {
          font-weight: 500;
        }
      }
    }
  }

  .info-section {
    width: 100%;
    height: 100%;

    .ant-divider-horizontal {
      margin: 14px 0;
    }

    .user-section {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .info {
        display: flex;
        align-items: center;

        .info-button {
          display: flex;
          flex-direction: column;
          align-items: center;

          .ant-btn {
            border-radius: 10px;
            border-color: ${({ theme }) => theme.palette.primary};
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            color: ${({  theme }) => theme.palette.primary};

            img {
              width: 20px !important;
              min-width: 20px !important;
              height: 20px !important;
            }

            span {
              font-weight: 600;
            }
          }

          .ant-btn-circle {
            border-radius: 50%;
          }

          .ant-btn-primary {
            color: #fff;
          }

          .info-value {
            margin-top: 5px;
            font-weight: 600;
          }
        }
        
        & > div {
          margin-right: 5px;
          margin-left: 5px;
        }
      }

      .user {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .name {
          font-weight: bold;
        }
      }
    }

    & > * {
      width: 100%;
    }
  }
`;

const infos = [
  {
    id: "votes",
    shape: "round",
    text: "VOTE",
    value: (data) => `${data} Votes`,
    isPrimary: true,
  },
  {
    id: "favorite",
    shape: "circle",
    Icon: HeartIcon,
    value: () => "Favorite",
  },
  {
    id: "shares",
    shape: "round",
    text: "SHARE",
    value: (data) => `${data} Shares`,
    onClick: data => {
      if (process.browser) {
        navigator.clipboard.writeText(`${window.location.origin}/new-looks/${data?._id}`);
        message.success('Copied to clipboard');
      }
    },
  },
  {
    id: "followers",
    shape: "round",
    text: "FOLLOW",
    value: (data) => `${data} Followers`,
  },
];

const NewLookItem = ({ newLook }) => {
  const loading = useSelector(state => state.newlooks.loading);

  const { url, user, name, items, stylesIds } = newLook || {};
  const figures = useSelector(getAllFiguresSelectors);
  const features = useMemo(() => {
    return stylesIds?.map(figureId => figures.find(figure => figure?._id === figureId)?.name)
  }, [stylesIds, figures])

  return (
    <>
      <NextSeo
        title={`New look detail: ${name}`}
        description={`View new look created by ${user?.firstName}`}
        openGraph={{
          type: 'website',
          url: 'https://vestium-web-app.vercel.app',
          title: `New look detail: ${name}`,
          description: `View new look created by ${user?.firstName}`,
          images: [
            {
              url,
              width: 800,
              height: 600,
              alt: 'New Look Detail',
            },
          ],
        }}
      />
      <SecurityLayout>
        {/* <Head>
          <meta name="description" content={`View new look created by ${user?.firstName}`}></meta>
          <meta property="title" content={`New look detail: ${name}`} />
          <meta property="og:title" content={`New look detail: ${name}`} key="ogtitle" />
          <meta property="og:description" content={`View new look created by ${user?.firstName}`} key="ogdesc" />
          <meta property="og:site_name" content="Vestiums" key="ogsitename" />
          <meta property="og:image" content={url} key="ogimage" />
          <meta property="og:type" content="website" />
          <meta property="og:image:width" content="1400" />
          <meta property="og:image:height" content="600" />
        </Head> */}
        <NewLookItemWrapper gutter={[20, 20]}>
          <Col span={24}>
            {loading && (
              <Skeleton active />
            )}
          </Col>
          <Col md={11} sm={24} xs={24}>
            <div className="img-wrapper">
              {url && <Image layout="fill" src={url} objectFit="contain" />}
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
                      <div className="info-value">
                        {info?.value(newLook?.[info?.id] || 0)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Divider />
              <div className="item-section">
                <div className="item-title">{name}</div>
                <div className="tags">
                  {features?.toString()?.replaceAll(',', '  ·  ')}
                </div>
                {items?.length > 0 && (
                  <Row gutter={[20, 20]} className="items">
                    {items.map(
                      ({ itemId: item }) => (
                        <Col span={8} key={item?._id}>
                          <div className="item-wrapper">
                            <div className="item-image">
                              {item?.image?.url && (
                                <Image
                                  objectFit="contain"
                                  layout="fill"
                                  src={item?.image?.url}
                                />
                              )}
                            </div>
                            <div className="item-name">{item?.name}</div>
                            <div className="item-name">{item?.brand}</div>
                            <div className="price">{`$${item?.price || 0}`}</div>
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
      </SecurityLayout>
    </>
  );
};

export default NewLookItem;
