import React from 'react';
import Image from 'next/image';
import ItemCardWrapper from './styles';

const ItemCard = ({ data }) => {
  const { name, brandName, price, img } = data || {};
  return (
    <ItemCardWrapper>
      <div className="image-wrapper">
        <Image objectFit="contain" layout="fill" src={img} />
      </div>
      <div className="item-title">
        {name}
      </div>
      <div className="item-title">
        {brandName}
      </div>
      <div className="price">
        {`$${price?.toFixed(2)}`}
      </div>
    </ItemCardWrapper>
  )
}

export default ItemCard;