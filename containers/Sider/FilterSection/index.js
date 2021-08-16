import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, Row, Col, Button } from 'antd';
import styled from 'styled-components';
import { CaretRightOutlined } from '@ant-design/icons';
import { getConfigSelector } from 'store/config/selectors';
import crudActions from 'store/crudActions';
import crudSelectors from 'store/crudSelectors';
import { useRouter } from 'next/router';
import xor from 'lodash/xor';
import { useTranslation } from 'i18n';

const { Panel } = Collapse;

const FilterSection = ({ pageSource }) => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { q } = query;
  const dispatch = useDispatch();
  const filters = useSelector(getConfigSelector);
  const { filter: filterData } = useSelector(crudSelectors.[pageSource].getFilters);

  const retrieveList = (filter, isRefresh) => {
    dispatch(crudActions?.[pageSource]?.getAll({
      data: {
        ...filter,
        orderBy: '-createdAt',
      },
      options: {
        isRefresh,
      },
    }))
  }

  const handleFilter = (id, source) => () => {
    retrieveList({
      pageSize: 10,
      offset: 0,
      filter: {
        ...filterData,
        ...q && {
          q,
        },
        [source]: {
          $all: xor(filterData?.[source]?.$all, [id]),
        },
      },
    }, true)
  }
  
  return (
    <FilterSectionWrapper>
      <div className="filter-title">
        {t('sider.filter')}
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
                    {...filterData?.[filter.source]?.$all?.includes(item._id) && {
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
    </FilterSectionWrapper>
  )
}

const FilterSectionWrapper = styled.div`
  flex-grow: 2;
  ${'' /* overflow: hidden; */}
  display: flex;
  flex-direction: column;

  .ant-collapse-borderless > .ant-collapse-item {
      border: none;
  }

  .ant-collapse {
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
      text-transform: uppercase;
  }
`;

FilterSection.defaultProps = {
  pageSource: 'newlooks',
}

export default FilterSection;
