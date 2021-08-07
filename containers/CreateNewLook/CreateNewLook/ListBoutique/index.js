import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Empty, Skeleton, Button } from "antd";
import { getAllItems } from "store/items/actions";
import { itemsSelectors } from "store/items/selectors";
import find from "lodash/find";
import { Waypoint } from "react-waypoint";
import SingleItem from "./SingleItem";
import ListItemVariants from "./ListItemVariants";
import ListBoutiqueStyles from "./styles";

const ListBoutique = ({ setBoutique }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.config.category.item);
  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const items = useSelector(itemsSelectors.getDataArr);
  const loading = useSelector(itemsSelectors.getLoading);
  const enabledLoadMore = useSelector(itemsSelectors.enabledLoadMore);

  const retrieveList = (filterData, isRefresh) => {
    dispatch(
      getAllItems({
        data: {
          ...filterData,
        },
        options: {
          isRefresh,
        },
      })
    );
  };

  const handleEnterWaypoint = () => {
    if (enabledLoadMore && !loading) {
      retrieveList({}, false);
    }
  };

  useEffect(() => {
    retrieveList(
      {
        perPage: 10,
        offset: 0,
      },
      true
    );
  }, []);

  const onSelectBg = (id, variantId) => () => {
    if (!id) return;
    let boutique = find(items, (bg) => bg._id === id);
    if (variantId && boutique?.imageVariants) {
      const variant = find(boutique?.imageVariants, (v) => v._id === variantId);
      if (variant)
        boutique = {
          ...boutique,
          image: { ...variant },
        };
    }
    if (!boutique?.image?.url) return;
    setBoutique(boutique);
  };

  const handleFilterBoutique = (id) => () => {
    setCurrentCategoryId((categoryId) => (categoryId === id ? "" : id));
    retrieveList(
      {
        perPage: 10,
        offset: 0,
        ...(currentCategoryId !== id && {
          filter: {
            categoryId: id,
          },
        }),
      },
      true
    );
  };

  return (
    <ListBoutiqueStyles>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <div className="filter-boutique">
            {categories.map((category) => (
              <Button
                shape="round"
                {...(currentCategoryId === category._id && {
                  type: "primary",
                })}
                key={category?._id}
                onClick={handleFilterBoutique(category._id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </Col>
        {items?.length > 0 &&
          items.map((boutique) => (
            <Col span={8} key={boutique._id}>
              {!boutique?.imageVariants && (
                <SingleItem boutique={boutique} onSelectBg={onSelectBg} />
              )}
              {boutique?.imageVariants && (
                <ListItemVariants mainItem={boutique} onSelectBg={onSelectBg} />
              )}
            </Col>
          ))}
        {loading && (
          <Col span={24}>
            <Skeleton active />
          </Col>
        )}
        {enabledLoadMore && <Waypoint onEnter={handleEnterWaypoint} />}
      </Row>
      {items?.length === 0 && !loading && <Empty />}
    </ListBoutiqueStyles>
  );
};

export default ListBoutique;
