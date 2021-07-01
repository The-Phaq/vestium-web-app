import React from 'react';
import { Col, Row, Button } from 'antd';
import ItemCardWrapper from './styles';

const ItemInfo = ({ data }) => {
    const { label, content, labelAction, key } = data || {};
    return (
        <ItemCardWrapper>
            <Row
                gutter={[0, 24]}
                justify="space-between"
                className="title"
                key={key}
                align="middle"
            >
                <Col>
                    <Row>
                        <p>{label}:&nbsp;&nbsp;</p>
                        <div
                            style={{
                                fontWeight: 'normal',
                                fontSize: 16,
                            }}
                        >
                            {content}
                        </div>
                    </Row>
                </Col>
                <Col>
                    <Row style={{ marginBottom: 8 }}>
                        <Button type="link">{labelAction}</Button>
                    </Row>
                </Col>
            </Row>
        </ItemCardWrapper>
    );
};

export default ItemInfo;
