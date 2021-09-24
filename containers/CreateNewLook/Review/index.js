import React, { useMemo, useState, useEffect } from "react";
import { Row, Col, Image } from "antd";
import { useTranslation } from "i18n";
import { useSelector, useDispatch } from "react-redux";
import { getConfigSelector } from "store/config/selectors";
import { getUrl, uploadMedia } from "api/uploadMedia";
import SharpEdgeButton from "components/SharpEdgeButton";
import flatten from "lodash/flatten";
import uniqBy from "lodash/uniqBy";
import intersectionBy from "lodash/intersectionBy";
import { useRouter } from "next/router";
import { createNewlooks, getAllNewlooks } from "store/newlooks/actions";
import styled from "styled-components";

const InfoWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  .title {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .features {
    width: 70%;
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
`;

const ReviewWrapper = styled.div`
  display: flex;

  .title {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
`;

const b64toBlob = (base64String) =>
  fetch(base64String).then((res) => res.blob());

const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

const Review = ({ listBoutique,setCurrentStep,  newLookImg, newLookData }) => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const configData = useSelector(getConfigSelector);
  const user = useSelector((state) => state.user?.user);
  const listItems = useMemo(() => {
    return uniqBy(
      listBoutique?.filter((boutique) => !boutique?.isEmoji),
      "_id",
    );
  });

  const onBack = () => {
    setCurrentStep(1);
  };

  const features = useMemo(() => {
    return flatten(
      configData?.map((config) =>
        intersectionBy(
          config.items,
          newLookData?.[config.source]?.map((id) => ({ _id: id })),
          "_id",
        ),
      ),
    );
  }, [newLookData]);

  const onClick = async () => {
    try {
      setLoading(true);
      const file = await b64toBlob(newLookImg);
      file.name = `new-look-${guid()}`;
      const responseS3 = await getUrl(file.name, file.type);
      const response = await uploadMedia(responseS3.uploadUrl, file);
      if (response)
        dispatch(
          createNewlooks({
            data: {
              ...newLookData,
              url: responseS3.url,
              image: {
                url: responseS3.url,
                name: file.name,
              },
              items: listItems?.map((boutique) => ({
                itemId: boutique?._id,
              })),
              userId: user?._id,
            },
            options: {
              customApiResource: "newlooks/me",
            },
          }),
        ).then(() => {
          dispatch(
            getAllNewlooks({
              data: {
                orderBy: "-createdAt",
                pageSize: 10,
                offset: 0,
              },
            }),
          ).then(() => push("/"));
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <ReviewWrapper>
      <div className="canvas-image">
        <div className="title text-uppercase">{t("createNewLook.title")}</div>
        <Image
          style={{ borderRadius: 20, border: '1px solid #ccc'}}
          src={newLookImg}
          fallback="data:image/png;base64,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"
          height={500}
          width={500}
        />
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <SharpEdgeButton  size="large" onClick={onBack}>
            BACK
          </SharpEdgeButton>
        </div>
      </div>
      <InfoWrapper>
        <div className="title">{newLookData?.name}</div>
        <div className="features">
          {features
            ?.map((feature) => feature.name)
            ?.toString()
            ?.replaceAll(",", "  ·  ")}
        </div>
        {listItems?.length > 0 && (
          <Row gutter={[20, 20]} className="items">
            {listItems.map(
              ({ _id: id, name: itemName, brand, price, image }) => (
                <Col span={8} key={id}>
                  <div className="item-wrapper">
                    <div className="item-image">
                      <Image
                        objectFit="contain"
                        layout="fill"
                        src={image?.url}
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
        <div style={{ width: "100%" }}>
          <br />
          <br />
          <br />
          <SharpEdgeButton
            loading={loading}
            type="primary"
            size="large"
            onClick={onClick}
            className="text-uppercase"
          >
            {t("button.sendNewLook")}
          </SharpEdgeButton>
          <br />
          <br />
          <SharpEdgeButton className="text-uppercase" size="large">
            {t("button.addFavorite")}
          </SharpEdgeButton>
        </div>
      </InfoWrapper>
    </ReviewWrapper>
  );
};

export default Review;
