import React from 'react';
import Image from 'next/image';
import { formatMoney } from 'utils/tools';
import ItemCardWrapper from './styles';

const ItemCard = ({ data }) => {
    const { name, brand, price, image } = data || {};
    return (
        <ItemCardWrapper>
            <div className="image-wrapper">
                <Image objectFit="contain" layout="fill" src={image?.url} />
            </div>
            <div className="item-title">{name}</div>
            <div className="item-title">{brand}</div>
            <div className="price">{`$ ${formatMoney(price, 2)}`}</div>
        </ItemCardWrapper>
    );
};

export default ItemCard;
