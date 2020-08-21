import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import Draggable from "react-draggable"

import { MIN_MARGIN } from "../RichTextEditor/constants"
import "./ruler.scss"

class Ruler extends PureComponent {
  handleDragIndent = (e, position) => {
    const { margin, setIndent } = this.props
    const marginPosition = position.x + margin
    if (marginPosition > 1000) {
      setIndent({ x: 1000 - margin, y: 0 })
    } else {
      setIndent({ x: position.x, y: 0 })
    }
  }

  handleDragMargin = (e, position) => {
    const { indent, setMargin } = this.props
    const margin = position.x - indent.x
    setMargin(margin < MIN_MARGIN ? MIN_MARGIN : margin)
  }

  render() {
    const { indent, margin } = this.props
    const positionMargin = {
      x: indent.x + margin,
      y: 0,
    }
    return (
      <div className="ruler-wrapper">
        <div className="ruler-actions">
          <Draggable
            axis="x"
            position={indent}
            onDrag={this.handleDragIndent}
            bounds="parent"
          >
            <div className="drag-handle-1" />
          </Draggable>
          <Draggable
            axis="x"
            position={positionMargin}
            bounds="parent"
            onDrag={this.handleDragMargin}
          >
            <div className="drag-handle-2" />
          </Draggable>
        </div>
        <div className="ruler">
          <label>0</label>
          <label>100</label>
          <label>200</label>
          <label>300</label>
          <label>400</label>
          <label>500</label>
          <label>600</label>
          <label>700</label>
          <label>800</label>
          <label>900</label>
          <label />
        </div>
      </div>
    )
  }
}

Ruler.propTypes = {
  indent: PropTypes.object.isRequired,
  setIndent: PropTypes.func.isRequired,
  setMargin: PropTypes.func.isRequired,
  margin: PropTypes.number.isRequired,
}

export default Ruler
