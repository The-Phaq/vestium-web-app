import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from 'antd';
import { Waypoint } from 'react-waypoint';
import SecurityLayout from 'layouts/Security';
import Divider from 'components/Divider';
import { newlooksSelectors } from 'store/newlooks/selectors';
import { getAllNewlooks } from 'store/newlooks/actions';
import NewLookItem from './NewLookItem';
import HomeWrapper from './styles';

const newLooks = [
  {
    id: 1,
    img: '/images/newLook.png',
    user: {
      name: 'Anne Giao',
      avatar: '/images/avatar.png',
    },
    votes: 214,
    shares: 46,
    followers: 132,
    name: 'Back Magic',
    tags: ['office', 'everyDay', 'casual', 'sporty', 'black', 'spring', 'summer', 'medium'],
    items: [
      {
        id: 1,
        name: 'Dress',
        brandName: 'Gucci',
        price: 39.99,
        img: '/images/dress.png',
      },
      {
        id: 2,
        name: 'Heels',
        brandName: 'Gucci',
        price: 39.99,
        img: '/images/dress.png',
      },
      {
        id: 3,
        name: 'Purse',
        brandName: 'Gucci',
        price: 39.99,
        img: '/images/watch.png',
      },
      {
        id: 4,
        name: 'Watch',
        brandName: 'Gucci',
        price: 39.99,
        img: '/images/watch.png',
      },
      {
        id: 5,
        name: 'Glass',
        brandName: 'Gucci',
        price: 39.99,
        img: '/images/watch.png',
      },
    ],
  },
  {
    id: 2,
    img: '/images/newLook.png',
    user: {
      name: 'Anne Giao',
      avatar: '/images/avatar.png',
    },
    votes: 214,
    shares: 46,
    followers: 132,
    name: 'Back Magic',
    tags: ['office', 'everyDay', 'casual', 'sporty', 'black', 'spring', 'summer', 'medium'],
  },
]

const HomePage = () => {
  const dispatch = useDispatch();

  const newlookItems = useSelector(newlooksSelectors.getDataArr);
  const loading = useSelector(newlooksSelectors.getLoading);
  const enabledLoadMore = useSelector(newlooksSelectors.enabledLoadMore);
  console.log('asdasd test', newlookItems)

  const retrieveList = (filterData, isRefresh) => {
    dispatch(getAllNewlooks({
      data: {
        ...filterData,
        includes: 'styles,items',
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
          <Skeleton loading />
        )}
        {enabledLoadMore && (
          <Waypoint onEnter={handleEnterWaypoint} />
        )}
      </HomeWrapper>
    </SecurityLayout>
  )
}

export default HomePage;
