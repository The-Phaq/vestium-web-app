import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton, Empty } from 'antd';
import { Waypoint } from 'react-waypoint';
import SecurityLayout from 'layouts/Security';
import Divider from 'components/Divider';
import { newlooksSelectors, getNewLooksSelectors } from 'store/newlooks/selectors';
import { getAllNewlooks } from 'store/newlooks/actions';
import NewLookItem from './NewLookItem';
import HomeWrapper from './styles';

const HomePage = () => {
  const dispatch = useDispatch();

  const newLooks = useSelector(getNewLooksSelectors);
  const loading = useSelector(newlooksSelectors.getLoading);
  const enabledLoadMore = useSelector(newlooksSelectors.enabledLoadMore);

  const retrieveList = (filterData, isRefresh) => {
    dispatch(getAllNewlooks({
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
      limit: 10,
      offset: 0,
      // filter: {
      //   stylesIds: ['607c2a173f0a867f636f9ab2'],
      // },
    }, true);
  }, [])

  return (
    <SecurityLayout>
      <HomeWrapper>
        {newLooks.map((newLook, index) => (
          <Fragment key={newLook.id}>
            <NewLookItem newLook={newLook} />
            {index + 1 < newLooks.length && <Divider className="divider" />}
          </Fragment>
        ))}
        {loading && (
          <Skeleton active />
        )}
        {!loading && !newLooks?.length && (
          <Empty description="No items" />
        )}
        {enabledLoadMore && (
          <Waypoint onEnter={handleEnterWaypoint} />
        )}
      </HomeWrapper>
    </SecurityLayout>
  )
}

export default HomePage;
