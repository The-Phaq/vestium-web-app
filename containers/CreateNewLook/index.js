import React, { useState } from "react";
import { Row, Col, Tabs, Steps } from "antd";
import SecurityLayout from "layouts/Security";
// import components
import Step1 from "./CreateNewLook";
import Step2 from "./AddInfomation";
import CreateNewLookStyles from "./styles";

const { Step } = Steps;

const CreateNewLook = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [newLookImg, setNewLookImg] = useState(undefined);

  return (
    <SecurityLayout>
      <CreateNewLookStyles>
        <div className="step-section">
          <Steps progressDot current={currentStep}>
            <Step title="Create New Look" />
            <Step title="Add Infomation" />
            <Step title="Review New Look" />
          </Steps>
        </div>
        {currentStep === 0 && (
          <Step1
            setCurrentStep={setCurrentStep}
            setNewLookImg={setNewLookImg}
          />
        )}
        {currentStep === 1 && (
          <Step2 setCurrentStep={setCurrentStep} newLookImg={newLookImg} />
        )}
      </CreateNewLookStyles>
    </SecurityLayout>
  );
};

export default CreateNewLook;
