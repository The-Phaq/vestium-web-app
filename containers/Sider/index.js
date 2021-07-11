import React from 'react';
import Divider from 'components/Divider';
import xor from 'lodash/xor';
import { useSelector, useDispatch } from 'react-redux';
import { getFiguresSelectors } from 'store/figures/selectors';
import crudActions from 'store/crudActions';
import crudSelectors from 'store/crudSelectors';
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
    key: 'new-looks',
    source: 'newlooks',
    filterKey: 'stylesIds',
  },
  {
    text: 'BOUTIQUE',
    url: '/boutique',
    key: 'boutique',
    source: 'items',
    filterKey: 'figureIds',
  },
  {
    text: 'CREATE NEW LOOK',
    isHighlight: true,
    Icon: PlusCircleFilled,
    url: '/create-new-look',
    key: 'create-new-look',
    source: 'newlooks',
    filterKey: 'stylesIds',
  },
];

const filterPages = [
  ...buttons.filter(item => item.source),
  {
    url: '/favorites',
    key: 'favorites',
    source: 'items',
    filterKey: 'figureIds',
  },
  {
    key: 'new-looks',
    source: 'newlooks',
    filterKey: 'stylesIds',
  },
];

const Sider = () => {
  const dispatch = useDispatch();
  const { pathname, query } = useRouter();
  const url = getCurrentTab(pathname, 1);
  const currentFilterPage = filterPages.find(filterPage => filterPage.key === (url || 'new-looks'));

  const figures = useSelector(getFiguresSelectors);
  const { filter } = useSelector(crudSelectors.[currentFilterPage?.source].getFilters);
  const currentFigureIds = filter?.[currentFilterPage?.filterKey] || [];


  const { q } = query;

  const retrieveList = (filterData, isRefresh) => {
    dispatch(crudActions?.[currentFilterPage?.source]?.getAll({
      data: {
        ...filterData,
      },
      options: {
        isRefresh,
      },
    }))
  }

  const handleFilterNewLooks = id => () => {
    retrieveList({
      pageSize: 10,
      offset: 0,
      filter: {
        ...q && {
          q,
        },
        [currentFilterPage?.filterKey]: xor(currentFigureIds, [id]),
      },
    }, true)
  }

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
                {...(url || 'new-looks') === key && {
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
                        {...currentFigureIds.includes(item.id) && {
                          type: 'primary',
                        }}
                        onClick={handleFilterNewLooks(item.id)}
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
