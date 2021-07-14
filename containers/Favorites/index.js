import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton, Empty } from 'antd';
import { useRouter } from 'next/router';
import { Waypoint } from 'react-waypoint';
import SecurityLayout from 'layouts/Security';
import Divider from 'components/Divider';
import { favoritesSelectors, getFavoritesSelectors } from 'store/favorites/selectors';
import { getAllFavorites } from 'store/favorites/actions';
import FilterSection from 'containers/Sider/FilterSection';
import NewLookItem from 'containers/HomePage/NewLookItem';
import HomeWrapper from './styles';

const Favorites = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const favorites = useSelector(getFavoritesSelectors);
  
  const loading = useSelector(favoritesSelectors.getLoading);
  const enabledLoadMore = useSelector(favoritesSelectors.enabledLoadMore);

  const { q } = query;

  const retrieveList = (filterData, isRefresh) => {
    dispatch(getAllFavorites({
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
    <SecurityLayout FilterSection={FilterSection} pageSource="favorites">
      <HomeWrapper>
        {favorites.map((favorite, index) => (
          <Fragment key={favorite.id}>
            <NewLookItem newLook={favorite} />
            {index + 1 < favorites.length && <Divider className="divider" />}
          </Fragment>
        ))}
        {loading && (
          <Skeleton active />
        )}
        {!loading && !favorites?.length && (
          <Empty description="No items" />
        )}
        {enabledLoadMore && (
          <Waypoint onEnter={handleEnterWaypoint} />
        )}
      </HomeWrapper>
    </SecurityLayout>
  )
}

export default Favorites;
