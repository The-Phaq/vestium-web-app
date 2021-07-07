import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Checkbox, Spin } from 'antd';
import crudSelectors from 'store/crudSelectors';
import crudActions from 'store/crudActions';
import { Waypoint } from 'react-waypoint';
import styled from 'styled-components';

export const CheckBoxWrapper = styled(Checkbox)`
  span {
    display: inline-flex;
    padding: 5px 7px;
    border-radius: 10px;
    border: 1px solid #ccc;
    background: #fff;
    color: ${({ color }) => color || '#000'};
    width: 120px;
    justify-content: center;
    text-align: center;
    height: 100%;
    align-items: center;
    line-height: 16px;
  }

  .ant-checkbox {
    display: none;
  }

  .ant-checkbox-checked + span {
    border-color: ${({ theme, color }) => color || theme.palette.primary};
    background: ${({ theme, color }) => color || theme.palette.primary};
    color: #fff;
  }
`;

const AttributeSelector = ({ source, label, type, valueProp, nameProp }) => {
  const dispatch = useDispatch();

  const items = useSelector(crudSelectors[type].getDataArr);
  const loading = useSelector(crudSelectors[type].getLoading);
  const enabledLoadMore = useSelector(crudSelectors[type].enabledLoadMore);

  const retrieveList = (filterData, isRefresh) => {
    dispatch(crudActions[type].getAll({
      data: {
        ...filterData,
      },
      options: {
        isRefresh,
      },
    }))
  }

  const handleEnterWaypoint = () => {
    if (enabledLoadMore && !loading) {
      retrieveList({}, false);
    }
  }

  useEffect(() => {
    retrieveList({
      pageSize: 10,
      offset: 0,
    }, true);
  }, [])

  return (
    <>
      <label>{label}</label>
      <Form.Item noStyle name={source}>
        <Checkbox.Group style={{marginTop: '10px', width: '100%', overflow: 'hidden'}}>
          <div style={{ minHeight: '40px',display: 'flex', width: '100%', overflowX: 'auto'}}>
            {items.length ? (
              <>
                {
                  items.map(item => (
                    <CheckBoxWrapper
                      value={item?.[valueProp]}
                      {...item?.hsl && {
                        color: `hsl(${item?.hsl?.H}, ${item?.hsl?.S}%, ${item?.hsl?.L}%)`,
                      }}
                    >
                      {item?.[nameProp]}
                    </CheckBoxWrapper>
                  ))
                }
                {loading && <Spin />}
                <Waypoint horizontal onEnter={handleEnterWaypoint} />
              </>
            ) : <div>No data</div>}
          </div>
        </Checkbox.Group>
      </Form.Item>
    </> 
  )
}

AttributeSelector.defaultProps = {
  valueProp: '_id',
  nameProp: 'name',
}

export default AttributeSelector;
