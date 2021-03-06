import React from "react";
import { Image } from "antd";

import Link from "next/link";
import ItemCardWrapper from "./styles";

const ItemCard = ({ data }) => {
  const { name, brand, price, image, _id } = data || {};
  return (
    <ItemCardWrapper>
      <Link href={`/boutique/${_id}`}>
        <a style={{ width: '100%'}}>
          <div className="image-wrapper">
            <Image
              objectFit="contain"
              layout="fill"
              src={image?.url}
              preview={false}
            />
          </div>
          <div className="item-brand">{brand}</div>
          <div className="item-title">{name}</div>
          <div className="price">{`$${price}`}</div>
        </a>
      </Link>
    </ItemCardWrapper>
  );
};

export default ItemCard;
