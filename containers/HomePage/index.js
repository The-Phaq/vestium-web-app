import React, { Fragment } from 'react';
import SecurityLayout from 'layouts/Security';
import Divider from 'components/Divider';
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
  return (
    <SecurityLayout>
      <HomeWrapper>
        {newLooks.map((newLook, index) => (
          <Fragment key={newLook.id}>
            <NewLookItem newLook={newLook} />
            {index + 1 < newLooks.length && <Divider className="divider" />}
          </Fragment>
        ))}
      </HomeWrapper>
    </SecurityLayout>
  )
}

export default HomePage;
