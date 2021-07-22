import React, { useState } from "react";
import { Steps } from "antd";
import SecurityLayout from "layouts/Security";
// import components
import Step1 from "./CreateNewLook";
import Step2 from "./AddInfomation";
import Step3 from './Review';
import CreateNewLookStyles from "./styles";

const { Step } = Steps;

const CreateNewLook = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [newLookImg, setNewLookImg] = useState(undefined);
  const [newLookData, setNewLookData] = useState({});
  const [listBoutique, setListBoutique] = useState([]);

  return (
    <SecurityLayout>
      <CreateNewLookStyles>
        {currentStep === 0 && (
          <Step1
            setCurrentStep={setCurrentStep}
            setNewLookImg={setNewLookImg}
            setListBoutique={setListBoutique}
            listBoutique={listBoutique}
          />
        )}
        {currentStep === 1 && (
          <Step2 setNewLookData={setNewLookData} setCurrentStep={setCurrentStep} newLookImg={newLookImg} />
        )}
        {currentStep === 2 && (
          <Step3 listBoutique={listBoutique} newLookImg={newLookImg} newLookData={newLookData} />
        )}
      </CreateNewLookStyles>
    </SecurityLayout>
  );
};

export default CreateNewLook;
