import React, { useState } from "react";
import { Tabs } from "antd";
import styled from 'styled-components';
import Divider from 'components/Divider';
import { useTranslation } from 'i18n';
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
  const {t} = useTranslation();
  const [background, setBackground] = useState(null);

  const setBoutique = (item) => {
    setListBoutique((boutiques) => [...boutiques, item]);
  };

  return (
    <CreateNewLookWrapper>
      <div className="canvas-wrapper">
        <div className="title text-uppercase">
          {t('createNewLook.title')}
        </div>
        <CanvasSection
          background={background}
          listItems={listBoutique}
          setListItems={setListBoutique}
          setCurrentStep={setCurrentStep}
          setNewLookImg={setNewLookImg}
        />
      </div>
      <Divider className="content-divider" vertical color="#fff" />
      <div className="children-content-wrapper">
        <Tabs defaultActiveKey="1">
          <TabPane tab={<div className="text-uppercase">{t('createNewLook.tabs.background')}</div>} key="1">
            <ListBackground setBackground={setBackground} />
          </TabPane>
          <TabPane tab={<div className="text-uppercase">{t('createNewLook.tabs.boutique')}</div>} key="2">
            <ListBoutique setBoutique={setBoutique} />
          </TabPane>
          <TabPane tab={<div className="text-uppercase">{t('createNewLook.tabs.elements')}</div>} key="3">
            <ListEmoji setEmoji={setBoutique} />
          </TabPane>
        </Tabs>
      </div>
    </CreateNewLookWrapper>
  );
};

const CreateNewLookWrapper = styled.div`
  display: flex;

  .content-divider {
    padding-left: 20px;
  }

  .canvas-wrapper {
    .title {
      font-size: 18px;
      font-weight: 500;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }

  .children-content-wrapper {
    margin-left: 20px;
    overflow-y: auto;
  }
`;

export default CreateNewLook;
