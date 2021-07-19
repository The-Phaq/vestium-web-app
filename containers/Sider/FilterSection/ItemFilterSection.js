import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, Row, Col, Button, Slider } from 'antd';
import styled from 'styled-components';
import { CaretRightOutlined } from '@ant-design/icons';
import { getBoutiqueConfigSelector } from 'store/config/selectors';
import crudActions from 'store/crudActions';
import crudSelectors from 'store/crudSelectors';
import { useRouter } from 'next/router';
import xor from 'lodash/xor';
import get from 'lodash/get';
import set from 'lodash/set';

const { Panel } = Collapse;

const ItemFilterSection = () => {
  const { query } = useRouter();
  const { q } = query;
  const dispatch = useDispatch();
  const filters = useSelector(getBoutiqueConfigSelector);
  
  const { filter: filterData } = useSelector(crudSelectors.items.getFilters);


  const retrieveList = (filter, isRefresh) => {
    dispatch(crudActions?.items?.getAll({
      data: {
        ...filter,
      },
      options: {
        isRefresh,
      },
    }))
  }

  const handleFilter = (item, filterType) => () => {
    const filter = {};
    if (filterType.validateData(filterData?.[filterType.source], filterType.getData(item))) {
      set(filter, filterType.source, filterType.getData(item, get(filterData, filterType.source)))
    } else set(filter, filterType.source, '')
    retrieveList({
      pageSize: 10,
      offset: 0,
      filter: {
        ...filterData,
        ...q && {
          q,
        },
        ...filter,
      },
    }, true)
  }

  const priceFilter = filters.find(filter => filter.filterType === 'price');

  const handleFilterPrice = value => {
    retrieveList({
      pageSize: 10,
      offset: 0,
      filter: {
        ...filterData,
        ...q && {
          q,
        },
        price: {
          $gt: value[0],
          $lt: value[1],
        },
      },
    }, true)
  }
  
  return (
    <ItemFilterSectionWrapper>
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
        {filters.filter(filter => filter.filterType !== 'price').map((filter, index) => (
          <Panel
            header={filter.name}
            key={`button-${String(index)}`}
            className="filter-panel"
          >
            <Row gutter={[8, 8]}>
              {filter?.items?.map(item => (
                <Col span={12} key={item._id}>
                  <Button
                    shape="round"
                    {...filter.filterType?.getActive(get(filterData, filter.filterType.source), item) && {
                      type: 'primary',
                    }}
                    onClick={handleFilter(item, filter.filterType)}
                  >
                    {item.name}
                  </Button>
                </Col>
              ))}
            </Row>
          </Panel>
        ))}
        {priceFilter && (
          <Panel
            header={priceFilter.name}
            className="filter-panel"
          >
            <Slider
              range
              min={priceFilter?.items?.[0]}
              max={priceFilter?.items?.[1]}
              {...priceFilter?.items && {
                defaultValue: priceFilter?.items,
              }}
              onAfterChange={handleFilterPrice}
            />
          </Panel>
        )}
      </Collapse>
    </ItemFilterSectionWrapper>
  )
}

const ItemFilterSectionWrapper = styled.div`
  flex-grow: 2;
  ${'' /* overflow: hidden; */}
  display: flex;
  flex-direction: column;

  .ant-collapse-borderless > .ant-collapse-item {
      border: none;
  }

  .ant-collapse {
      ${'' /* height: 57vh; */}
      ${'' /* overflow-y: auto; */}

      .filter-panel {
          background: #fff;
          text-transform: uppercase;

          .ant-btn {
              width: 100%;
              white-space: break-spaces;
              padding: 4px 7px;
              text-align: center;
              line-height: 14px;
              height: 100%;
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          }
      }
  }

  .ant-collapse::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
      border-radius: 10px;
  }

  .ant-collapse::-webkit-scrollbar {
      width: 10px;
      background-color: #f5f5f5;
  }

  .ant-collapse::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: ${({ theme }) => theme.palette.primary};
  }

  .filter-title {
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 14px;
  }
`;

export default ItemFilterSection;
