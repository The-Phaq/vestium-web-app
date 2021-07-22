import React, { Component } from "react";
import useImage from "use-image";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Stage, Layer, Group, Text, Image } from "react-konva";
import SharpEdgeButton from "components/SharpEdgeButton";
import TransformerComponent from "../Transformer";
import CanvasSectionStyles from "./styles";

const BgImage = ({ url, ...props }) => {
  const [image] = useImage(url, "Anonymous");
  return <Image image={image} width={600} height={600} {...props} />;
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
    isNext: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isNext && this.state.isNext) {
      const uri = this.newLookRef?.current?.toDataURL();
      this.setState({
        isNext: true,
      });
      if (uri) {
        this.props?.setNewLookImg(uri);
        this.props?.setCurrentStep(1);
      }
    }
  }

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
      attrs: {
        x: e.target.x(),
        y: e.target.y(),
        rotation: e.target.rotation(),
        scaleX: e.target.scaleX(),
        scaleY: e.target.scaleY(),
      },
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

  onTransformEnd = (e) => {
    const name = e.target.name();
    const items = this.props?.listItems.slice();
    const index = name.split("_")?.[1];
    let item = items[index];
    // update item position
    item = {
      ...item,
      attrs: {
        x: e.target.x(),
        y: e.target.y(),
        rotation: e.target.rotation(),
        scaleX: e.target.scaleX(),
        scaleY: e.target.scaleY(),
      },
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

  onDelete = () => {
    if (!this.state?.selectedShapeName) return;
    const index = this.state.selectedShapeName.split("_")?.[1];
    const items = this.props?.listItems.slice();
    // remove from the list:
    items.splice(index, 1);
    this.props.setListItems(items);
  };

  onNext = () => {
    this.setState({
      selectedShapeName: "",
      isNext: true,
    });
  };

  render() {
    return (
      <CanvasSectionStyles>
        <Stage
          width={600}
          height={600}
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
                onTransformEnd={this.onTransformEnd}
                draggable
                x={item?.attrs?.x || 40}
                y={item?.attrs?.y || 40}
                rotation={item?.attrs?.rotation || 0}
                scaleX={item?.attrs?.scaleX || 1}
                scaleY={item?.attrs?.scaleY || 1}
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
          <div>
            <Button type="text" onClick={this.onDelete} icon={<DeleteOutlined />}>
              Remove
            </Button>
          </div>
          <br />
          <div>
            <SharpEdgeButton size="large" type="primary" onClick={this.onNext}>
              CREATE
            </SharpEdgeButton>
          </div>
        </div>
      </CanvasSectionStyles>
    );
  }
}

export default CanvasSection;
