import React, { useState } from "react";
import { Row, Col, Tabs, Steps } from "antd";
import xorBy from "lodash/xorBy";
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
    <Row gutter={[16, 32]}>
      <Col span={12}>
        <CanvasSection
          background={background}
          listItems={listBoutique}
          setListItems={setListBoutique}
          setCurrentStep={setCurrentStep}
          setNewLookImg={setNewLookImg}
        />
      </Col>
      <Col span={12}>
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
      </Col>
    </Row>
  );
};

export default CreateNewLook;
