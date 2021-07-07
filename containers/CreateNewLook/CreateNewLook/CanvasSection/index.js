import React, { Component } from "react";
import useImage from "use-image";
import { Button } from "antd";
import { Stage, Layer, Group, Text, Image } from "react-konva";
import TransformerComponent from "../Transformer";
import CanvasSectionStyles from "./styles";

const BgImage = ({ url, ...props }) => {
  const [image] = useImage(url, "Anonymous");
  return <Image image={image} width={448} height={448} {...props} />;
};

const ItemImage = ({ url, ...props }) => {
  const [image] = useImage(url, "Anonymous");
  return <Image image={image} width={150} height={150} {...props} />;
};

class CanvasSection extends Component {
  constructor(props) {
    super(props);
    this.newLookRef = React.createRef();
  }

  state = {
    selectedShapeName: "",
  };

  handleStageMouseDown = (e) => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: "",
      });
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const name = e.target.name();
    // const rect = this.state.rectangles.find(r => r.name === name);
    if (name && name !== "backgroundImg") {
      this.setState({
        selectedShapeName: name,
      });
    } else {
      this.setState({
        selectedShapeName: "",
      });
    }
  };

  onNext = () => {
    const uri = this.newLookRef?.current?.toDataURL();
    if (uri) {
      this.setState({
        selectedShapeName: "",
      });
      this.props?.setNewLookImg(uri);
      this.props?.setCurrentStep(1);
    }
  };

  render() {
    return (
      <CanvasSectionStyles>
        <Stage
          width={450}
          height={450}
          onMouseDown={this.handleStageMouseDown}
          ref={this.newLookRef}
        >
          <Layer>
            {this.props?.background && (
              <Group name="group" x={0} y={0}>
                <BgImage url={this.props?.background} name="backgroundImg" />
              </Group>
            )}
            {this.props?.listItems?.map((item) => (
              <Group name="group" draggable>
                <ItemImage url={item?.image?.url} name={`${item._id}`} />
              </Group>
            ))}
            {this.props?.listEmoji?.map((item) => (
              <Group name="group" x={400} y={200}>
                <ItemImage
                  url={item?.image?.url}
                  name={`${item._id}`}
                  draggable
                />
              </Group>
            ))}
            <TransformerComponent
              selectedShapeName={this.state.selectedShapeName}
            />
          </Layer>
        </Stage>
        <div className="action-section">
          <Button size="large" type="primary" onClick={this.onNext}>
            CREATE
          </Button>
        </div>
      </CanvasSectionStyles>
    );
  }
}

export default CanvasSection;
