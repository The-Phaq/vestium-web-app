import React from 'react';
import Image from 'next/image';
import ItemCardWrapper from './styles';

const ItemCard = ({ data }) => {
  const { name, brandName, price, image } = data || {};
  return (
    <ItemCardWrapper>
      <div className="image-wrapper">
        <Image objectFit="contain" layout="fill" src={image?.url} />
      </div>
      <div className="item-title">
        {name}
      </div>
      <div className="item-title">
        {brandName}
      </div>
      <div className="price">
        {price}
      </div>
    </ItemCardWrapper>
  )
}

export default ItemCard;