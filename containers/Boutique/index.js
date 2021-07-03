import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllItems } from 'store/items/actions';
import { itemsSelectors } from 'store/items/selectors';
import { Row, Col, Skeleton } from 'antd';
import { Waypoint } from 'react-waypoint';
import SecurityLayout from 'layouts/Security';
import ItemCard from 'components/ItemCard';
import BoutiqueWrapper from './styles';

const Boutique = () => {
  const dispatch = useDispatch();
  const items = useSelector(itemsSelectors.getDataArr);
  const loading = useSelector(itemsSelectors.getLoading);
  const enabledLoadMore = useSelector(itemsSelectors.enabledLoadMore);

  const retrieveList = (filterData, isRefresh) => {
    dispatch(getAllItems({
      data: {
        ...filterData,
      },
      options: {
        isRefresh,
      },
    }))
  }

  const handleEnterWaypoint = () => {
    if (enabledLoadMore && !loading) {
      retrieveList({}, false);
    }
  }

  useEffect(() => {
    retrieveList({
      pageSize: 12,
      offset: 0,
      // include: 'brand',
    }, true);
  }, [])
  return (
    <SecurityLayout>
      <BoutiqueWrapper>
        <Row gutter={[20, 40]}>
          {items.map(item => (
            <Col md={6} sm={12} xs={24} key={item.id}>
              <ItemCard data={item} />
            </Col>
          ))}
          {loading && (
            <Col span={24}>
              <Skeleton active />
            </Col>
          )}
          {enabledLoadMore && (
            <Waypoint onEnter={handleEnterWaypoint} />
          )}
        </Row>
      </BoutiqueWrapper>
    </SecurityLayout>
  )
}

export default Boutique;
