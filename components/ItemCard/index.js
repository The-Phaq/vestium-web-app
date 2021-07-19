import React from 'react';
import { Image} from 'antd';

import Link from 'next/link';
import { formatMoney } from 'utils/tools';
import ItemCardWrapper from './styles';

const ItemCard = ({ data }) => {
    const { name, brand, price, image, _id } = data || {};
    return (
        <ItemCardWrapper>
            <div className="image-wrapper">
                <Image objectFit="contain" layout="fill" src={image?.url} />
            </div>
            <div className="item-title">
                <Link href={`/boutique/${_id}`}>
                    {name}
                </Link>
            </div>
            <div className="item-title">{brand}</div>
            <div className="price">{`$ ${formatMoney(price, 2)}`}</div>
        </ItemCardWrapper>
    );
};

export default ItemCard;
