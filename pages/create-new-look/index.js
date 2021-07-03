import React from "react";
import dynamic from "next/dynamic";

const CreateNewLook = dynamic(() => import("containers/CreateNewLook"), {
  ssr: false,
});

const index = () => {
  return <CreateNewLook />;
};

export default index;
