import React from 'react';
import Divider from 'components/Divider';
import { useSelector } from 'react-redux';
import { getFiguresSelectors } from 'store/figures/selectors';
import { Button, Collapse, Row, Col } from 'antd';
import { useRouter } from 'next/router';
import { getCurrentTab } from 'utils/tools';
import Link from 'next/link';
import { PlusCircleFilled, CaretRightOutlined } from '@ant-design/icons';
import SiderWrapper from './styles';

const { Panel } = Collapse;

const buttons = [
  {
    text: 'NEW LOOK',
    isPrimary: true,
    url: '/',
    key: 'new-look',
  },
  {
    text: 'BOUTIQUE',
    url: '/boutique',
    key: 'boutique',
  },
  {
    text: 'CREATE NEW LOOK',
    isHighlight: true,
    Icon: PlusCircleFilled,
    url: '/create-new-look',
    key: 'create-new-look',
  },
];

const Sider = () => {
  const { pathname } = useRouter();
  const figures = useSelector(getFiguresSelectors);

  const url = getCurrentTab(pathname, 1);
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
          {buttons.map(({ Icon, text, key, isHighlight, url: btnUrl }, index) => (
            <Link href={btnUrl} key={`button-${String(index)}`}>
              <Button
                {...(url || 'new-look') === key && {
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
            </Link>
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
            {figures.map((figure, index) => (
              <Panel
                header={figure.text}
                key={`button-${String(index)}`}
                className="filter-panel"
              >
                <Row gutter={[8, 8]}>
                  {figure?.items?.map(item => (
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
