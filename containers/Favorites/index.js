import React from 'react';
import { Row, Col } from 'antd';
import SecurityLayout from 'layouts/Security';
import ItemCard from 'components/ItemCard';
import FavoritesWrapper from './styles';

const items = [
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
]

const Favorites = () => {
  return (
    <SecurityLayout>
      <FavoritesWrapper>
        <Row gutter={[20, 40]}>
          {items.map(item => (
            <Col md={6} sm={12} xs={24} key={item.id}>
              <ItemCard data={item} />
            </Col>
          ))}
        </Row>
      </FavoritesWrapper>
    </SecurityLayout>
  )
}

export default Favorites;
