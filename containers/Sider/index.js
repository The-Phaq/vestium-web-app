import React from 'react';
import Divider from 'components/Divider';
import { Button, Collapse, Row, Col } from 'antd';
import { PlusCircleFilled, CaretRightOutlined } from '@ant-design/icons';
import SiderWrapper from './styles';

const { Panel } = Collapse;

const buttons = [
  {
    text: 'NEW LOOK',
    isPrimary: true,
  },
  {
    text: 'BOUTIQUE',
  },
  {
    text: 'CREATE NEW LOOK',
    isHighlight: true,
    Icon: PlusCircleFilled,
  },
]

const filters = [
  {
    text: 'OCCASION',
    items: [
      {
        id: '1',
        text: 'office',
        isPrimary: true,
      },
      {
        id: '2',
        text: 'evening',
      },
      {
        id: '3',
        text: 'every day',
      },
      {
        id: '4',
        text: 'cocktail',
      },
      {
        id: '5',
        text: 'sport',
      },
      {
        id: '6',
        text: 'beach',
      },
    ],
  },
  {
    text: 'STYLE',
  },
  {
    text: 'COLOR',
  },
  {
    text: 'BUDGET',
  },
]

const Sider = () => {
  return (
    <SiderWrapper width={255}>
      <div className="sider-content">
        <div className="logo">
          <img
            alt="logo"
            src="/images/logo.png"
          />
        </div>
        <div className="title">
          VESTIUMS
        </div>
        <div className="actions-section">
          {buttons.map(({ Icon, text, isPrimary, isHighlight }, index) => (
            <Button
              key={`button-${String(index)}`}
              {...isPrimary && {
                type: 'primary',
              }}
              {...Icon && {
                icon: <Icon />,
              }}
              {...isHighlight && {
                className: 'highlight-btn',
              }}
            >
              {text}
            </Button>
          ))}
        </div>
        <Divider className="divider" />
        <div className="filter-section">
          <div className="filter-title">
            FILTER
          </div>
          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIconPosition="right"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="filter-content"
          >
            {filters.map((filter, index) => (
              <Panel
                header={filter.text}
                key={`button-${String(index)}`}
                className="filter-panel"
              >
                <Row gutter={[8, 8]}>
                  {filter?.items?.map(item => (
                    <Col span={12} key={item.id}>
                      <Button
                        shape="round"
                        {...item.isPrimary && {
                          type: 'primary',
                        }}
                      >
                        {item.text}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
      <Divider vertical color="#fff" />
    </SiderWrapper>
  )
}

export default Sider;
