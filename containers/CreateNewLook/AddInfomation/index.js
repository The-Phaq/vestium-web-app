import React, { useState } from "react";
import { Row, Col, Image, Form, Input, Button, Divider, Checkbox } from "antd";
import { useSelector } from 'react-redux';
import { getConfigSelector } from 'store/config/selectors';
import SharpEdgeButton from 'components/SharpEdgeButton';
import xor from 'lodash/xor';
import get from 'lodash/get';
import styled from 'styled-components';

const FormWrapper = styled(Form)`
  height: 450px;
  overflow: auto;
`;

const ButtonWrapper = styled(Button)`
  display: inline-flex;
  padding: 5px 7px;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 120px;
  min-width: 120px;
  justify-content: center;
  text-align: center;
  height: 100%;
  align-items: center;
  line-height: 16px;
  margin-right: 8px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &.ant-button-primary {
    border-color: ${({ theme }) => theme.palette.primary};
    background: ${({ theme }) => theme.palette.primary};
    color: #fff;
  }
`;

const AddInfomation = ({ setNewLookData, newLookImg, setCurrentStep }) => {
  const [form] = Form.useForm();
  const configData = useSelector(getConfigSelector);
  const [filterData, setFilterData] = useState({});
  
  const onFinish = values => {
    setNewLookData({
      ...values,
      ...filterData,
    });
    setCurrentStep(2);
  }

  return (
    <Row gutter={[16, 32]}>
      <Col span={12}>
        <Image
          src={newLookImg}
          fallback="data:image/png;base64,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"
        />
      </Col>
      <Col span={12}>
        <FormWrapper form={form} onFinish={onFinish}>
          <Form.Item name="name" label="NAME">
            <Input />
          </Form.Item>
          {configData.map(config => (
            config?.name === 'Color' ? (
              <Checkbox.Group onChange={values => setFilterData(filter => ({
                ...filter,
                [config.source]: values,
              }))} style={{marginTop: '10px', width: '100%', overflow: 'hidden'}}>
                <div style={{ minHeight: '40px',display: 'flex', width: '100%', overflowX: 'auto'}}>
                  {config?.items.length ? (
                    <>
                      {
                        config?.items.map(item => (
                          <CheckBoxWrapper
                            value={item?._id}
                            {...item?.hsl && {
                              color: `hsl(${item?.hsl?.H}, ${item?.hsl?.S}%, ${item?.hsl?.L}%)`,
                            }}
                          >
                            {item?.name}
                          </CheckBoxWrapper>
                        ))
                      }
                    </>
                  ) : <div>No data</div>}
                </div>
              </Checkbox.Group>
            ) : (
              <>
                <label style={{ textTransform: 'uppercase '}}>{config.name}</label>
                <br />
                <div style={{ minHeight: '40px',display: 'flex', width: '100%', overflowX: 'auto'}}>
                  {config?.items?.length ? (
                    config?.items?.map(item => (
                        <ButtonWrapper
                          {...filterData[config.source]?.includes(item._id) && {
                            type: 'primary',
                          }}
                          onClick={() => setFilterData(filter => ({
                            ...filter,
                            [config.source]: xor(get(filter, config.source, []), [item._id]),
                          }))}
                        >
                          {item.name}
                        </ButtonWrapper>
                    ))
                  ) : <div>No data</div>}
                </div>
                <Divider />
              </>
            )
          ))}
          {/* <AttributeSelector source="colorIds" label="COLOR" type="colors" /> */}
          
          <div style={{ width: '100%', textAlign: 'center'}}>
          <br />
          <br />
            <SharpEdgeButton  type="primary" size="large" htmlType="submit">
              CREATE
            </SharpEdgeButton>
          </div>
        </FormWrapper>
      </Col>
    </Row>
  );
};


export const CheckBoxWrapper = styled(Checkbox)`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;



  span {
    display: inline-flex;
    padding: 5px 7px;
    border: none;
    background: #fff;
    color: #000;
    width: 120px;
    justify-content: center;
    text-align: center;
    height: 100%;
    align-items: center;
    line-height: 16px;
  }

  .ant-checkbox {
    display: none !important;
  }

  &:after {
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    width: 40px;
    min-width: 40px;
    height: 40px;
    min-height: 40px;
    background: ${({ color }) => color};
    color: ${({ color }) => color};
    border-radius: 50%;
    justify-content: center;
    content: '✓';
    font-size: 24px;
    font-weight: 800;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  &.ant-checkbox-wrapper-checked:after {
    background: #fff;
  }


  .ant-checkbox-checked + span {
    ${'' /* border-color: ${({ theme, color }) => color || theme.palette.primary};
    background: ${({ theme, color }) => color || theme.palette.primary};
    color: #fff; */}
  }
`;


export default AddInfomation;
