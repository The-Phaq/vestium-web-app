import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton, Empty } from 'antd';
import { useRouter } from 'next/router';
import { Waypoint } from 'react-waypoint';
import SecurityLayout from 'layouts/Security';
import Divider from 'components/Divider';
import { myCreationsSelectors, getMyCreationsSelectors } from 'store/myCreations/selectors';
import { getAllMyCreations } from 'store/myCreations/actions';
import FilterSection from 'containers/Sider/FilterSection';
import NewLookItem from 'containers/HomePage/NewLookItem';
import HomeWrapper from './styles';

const MyCreations = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const myCreations = useSelector(getMyCreationsSelectors);
  
  const loading = useSelector(myCreationsSelectors.getLoading);
  const enabledLoadMore = useSelector(myCreationsSelectors.enabledLoadMore);

  const { q } = query;

  const retrieveList = (filterData, isRefresh) => {
    dispatch(getAllMyCreations({
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
      pageSize: 10,
      offset: 0,
      orderBy: '-createdAt',
      ...q && {
        filter: {
          q,
        },
      },
      // filter: {
      //   stylesIds: ['607c2a173f0a867f636f9ab2'],
      // },
    }, true);
  }, [q])

  return (
    <SecurityLayout FilterSection={FilterSection} pageSource="myCreations">
      <HomeWrapper>
        {myCreations.map((myCreation, index) => (
          <Fragment key={myCreation.id}>
            <NewLookItem newLook={myCreation} />
            {index + 1 < myCreations.length && <Divider className="divider" />}
          </Fragment>
        ))}
        {loading && (
          <Skeleton active />
        )}
        {!loading && !myCreations?.length && (
          <Empty description="No items" />
        )}
        {enabledLoadMore && (
          <Waypoint onEnter={handleEnterWaypoint} />
        )}
      </HomeWrapper>
    </SecurityLayout>
  )
}

export default MyCreations;
