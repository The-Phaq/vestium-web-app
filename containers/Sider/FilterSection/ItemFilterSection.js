import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, Row, Col, Button } from 'antd';
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

  const handleFilter = (id, source) => () => {
    const filter = {};

    set(filter, source, xor(get(filterData, source, []), [id]))
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
        {filters.map((filter, index) => (
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
                    {...get(filterData, filter.source, [])?.includes(item._id) && {
                      type: 'primary',
                    }}
                    onClick={handleFilter(item._id, filter.source)}
                  >
                    {item.name}
                  </Button>
                </Col>
              ))}
            </Row>
          </Panel>
        ))}
      </Collapse>
    </ItemFilterSectionWrapper>
  )
}

const ItemFilterSectionWrapper = styled.div`
  flex-grow: 2;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .ant-collapse-borderless > .ant-collapse-item {
      border: none;
  }

  .ant-collapse {
      ${'' /* height: 57vh; */}
      overflow-y: auto;

      .filter-panel {
          background: #fff;
          text-transform: uppercase;

          .ant-btn {
              width: 100%;
              white-space: break-spaces;
              padding: 4px 7px;
              text-align: center;
              line-height: 14px;
              height: auto;
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