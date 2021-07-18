import React, { Component } from "react";
import useImage from "use-image";
import SharpEdgeButton from "components/SharpEdgeButton";
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

  onDragEnd = (e) => {
    const name = e.target.name();
    const items = this.props?.listItems.slice();
    const index = name.split("_")?.[1];
    let item = this.props.listItems[index];
    // update item position
    item = {
      ...item,
      x: e.target.x(),
      y: e.target.y(),
    };
    // remove from the list:
    items.splice(index, 1);
    // add to the top
    items.push(item);
    this.props.setListItems(items);
    this.setState({
      selectedShapeName: `${item._id}_${items.length - 1}`,
    });
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
            {this.props?.listItems?.map((item, intex) => (
              <Group
                name={`${item._id}_${intex}`}
                key={`${item._id}_${intex}`}
                onDragEnd={this.onDragEnd}
                draggable
                x={item?.x || 40}
                y={item?.y || 40}
              >
                <ItemImage
                  url={item?.image?.originUrl}
                  name={`${item._id}_${intex}`}
                />
              </Group>
            ))}
            <TransformerComponent
              selectedShapeName={this.state.selectedShapeName}
            />
          </Layer>
        </Stage>
        <div className="action-section">
          <SharpEdgeButton size="large" type="primary" onClick={this.onNext}>
            CREATE
          </SharpEdgeButton>
        </div>
      </CanvasSectionStyles>
    );
  }
}

export default CanvasSection;
