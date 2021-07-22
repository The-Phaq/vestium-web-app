import React, { useState } from "react";
import { Tabs } from "antd";
import styled from 'styled-components';
import Divider from 'components/Divider';
// import components
import CanvasSection from "./CanvasSection";
import ListBackground from "./ListBackground";
import ListBoutique from "./ListBoutique";
import ListEmoji from "./ListEmoji";

const { TabPane } = Tabs;

const CreateNewLook = ({
  listBoutique,
  setListBoutique,
  setCurrentStep,
  setNewLookImg,
}) => {
  const [background, setBackground] = useState(null);

  const setBoutique = (item) => {
    setListBoutique((boutiques) => [...boutiques, item]);
  };

  return (
    <CreateNewLookWrapper>
      <div className="canvas-wrapper">
        <div className="title">
          CREATE NEW LOOK
        </div>
        <CanvasSection
          background={background}
          listItems={listBoutique}
          setListItems={setListBoutique}
          setCurrentStep={setCurrentStep}
          setNewLookImg={setNewLookImg}
        />
      </div>
      <Divider vertical color="#fff" />
      <div className="content-wrapper">
        <Tabs defaultActiveKey="1">
          <TabPane tab="BACKGROUND" key="1">
            <ListBackground setBackground={setBackground} />
          </TabPane>
          <TabPane tab="BOUTIQUE" key="2">
            <ListBoutique setBoutique={setBoutique} />
          </TabPane>
          <TabPane tab="ELEMENTS" key="3">
            <ListEmoji setEmoji={setBoutique} />
          </TabPane>
        </Tabs>
      </div>
    </CreateNewLookWrapper>
  );
};

const CreateNewLookWrapper = styled.div`
  display: flex;

  .canvas-wrapper {
    .title {
      font-size: 18px;
      font-weight: 500;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }

  .content-wrapper {
    margin-left: 20px;
  }
`;

export default CreateNewLook;
