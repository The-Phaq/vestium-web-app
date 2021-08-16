import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NextSeo } from "next-seo";
import { Col, Row, Skeleton, Image } from "antd";
import { reactItem, deleteReactItem } from "store/items/actions";
import flatten from "lodash/flatten";
import Button from "components/Button";
import SecurityLayout from "layouts/Security";
import { logout } from "store/auth/actions";
import styled from "styled-components";

const NewLookItem = ({ boutique: boutiqueFromProps }) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.items.loading);
  const boutique = useSelector((state) => state.items.currentData);

  const {
    _id,
    subcategory,
    figures,
    category,
    isFavorite,
    link,
    image,
    name,
    brand,
    price,
  } = boutique || {};
  const features = useMemo(() => {
    return flatten([[category], subcategory, figures]);
  }, [category, subcategory, figures]);

  const reactAction = ({ id, actionType, isDone }) => {
    const action = isDone ? deleteReactItem : reactItem;
    dispatch(
      action({
        id,
        actionType,
      }),
    );
  };

  useEffect(() => {
    if (boutiqueFromProps?.statusCode === 401) {
      dispatch(logout());
      window.location = "/auth/login";
    }
  }, [boutiqueFromProps?.statusCode]);

  return (
    <>
      <NextSeo
        title={`Boutique detail: ${boutiqueFromProps?.name}`}
        description={`Boutique detail: ${boutiqueFromProps?.name}`}
        openGraph={{
          type: "website",
          url: "https://vestium-web-app.vercel.app",
          title: `Boutique detail: ${boutiqueFromProps?.name}`,
          description: `Boutique detail: ${boutiqueFromProps?.name}`,
          images: [
            {
              url: boutiqueFromProps?.image?.url,
              width: 800,
              height: 600,
              alt: "Boutique Detail",
            },
          ],
        }}
      />
      <SecurityLayout>
        <BoutiqueItemWrapper gutter={[20, 20]}>
          <Col span={24}>{loading && <Skeleton active />}</Col>
          <Col md={11} sm={24} xs={24}>
            <div className="img-wrapper">
              {image?.url && (
                <Image layout="fill" src={image?.url} objectFit="contain" />
              )}
            </div>
          </Col>
          <Col md={13} sm={24} xs={24}>
            <div className="info-section">
              <div className="user-section">
                <div className="user">
                  {/* <Avatar src={user?.avatar} icon={<UserOutlined />} size={44} />
                  <div className="name">{`${user?.firstName || ''} ${user?.lastName || ''}`}</div> */}
                </div>
                <div className="info">
                  {/* {infos.map((info) => (
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
                            onClick: () => info.onClick(boutique),
                          }}
                          {...(info?.Icon && {
                            icon: <info.Icon />,
                          })}
                        >
                          {info?.text || ""}
                        </Button>
                      )}
                      <div className="info-value">
                        {info?.value(get(boutique, info?.id, 0))}
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>
              {/* <Divider /> */}
              <div className="item-section">
                <div className="item-title">{name}</div>
                <div className="item-brand">{brand}</div>
                <div className="item-price">{`$${price}`}</div>
                <div className="tags">
                  {features
                    ?.map((feature) => feature?.name)
                    ?.toString()
                    ?.replaceAll(",", "  ·  ")}
                </div>
                {link && (
                  <Button>
                    <a href={link} target="_blank" rel="noreferrer">
                      BUY ON YOOX
                    </a>
                  </Button>
                )}
                <Button
                  {...(isFavorite && { type: "primary" })}
                  onClick={() =>
                    reactAction({
                      id: _id,
                      actionType: "FAVORITE",
                      isDone: isFavorite,
                    })
                  }
                >
                  {`${isFavorite ? "ADDED TO FAVORITE" : "ADD TO FAVORITE"}`}
                </Button>
              </div>
            </div>
          </Col>
        </BoutiqueItemWrapper>
      </SecurityLayout>
    </>
  );
};

export const BoutiqueItemWrapper = styled(Row)`
  margin: 10px !important;
  padding: 0 20px;

  .img-wrapper .ant-image {
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
    min-height: 400px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  .item-section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .ant-btn {
      min-width: 220px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .detail-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10;
    }

    .item-title {
      font-size: 20px;
      text-transform: uppercase;
      font-weight: 800;
      text-align: center;
    }
    .item-brand {
      font-size: 26px;
      text-transform: uppercase;
      font-weight: 800;
      text-align: center;
    }

    .item-price {
      margin-top: 5px;
      margin-bottom: 5px;
      font-size: 20px;
      font-weight: 800;
    }

    .tags {
      width: 80%;
      font-size: 14px;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 14px;
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
            color: ${({ theme }) => theme.palette.primary};

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

            .img-icon img {
              filter: brightness(0) invert(1);
            }
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

export default NewLookItem;
