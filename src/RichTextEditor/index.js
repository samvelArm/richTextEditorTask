import React, { useCallback, useMemo, useState } from "react"
import { Editable, Slate, withReact } from "slate-react"
import { createEditor } from "slate"

import Toolbar from "../Toolbar"
import Ruler from "../Ruler"

import { DEFAULT_INDENT, DEFAULT_MARGIN, initialVal } from "./constants"
import { DefaultElement, IndentElement, ListItem } from "./Components"

import "./RichTextEditor.scss"

const RichTextEditor = () => {
  const [value, setValue] = useState(initialVal)

  const [indent, setIndent] = useState({ x: DEFAULT_INDENT, y: 0 })
  const [margin, setMargin] = useState(DEFAULT_MARGIN)

  const myEditor = useMemo(() => withReact(createEditor()), [])

  const renderElement = useCallback(
    (props) => {
      switch (props.element.type) {
        case "ordered-list":
          return <IndentElement indent={indent.x} {...props} />
        case "list-item":
          return <ListItem margin={margin} {...props} />
        default:
          return <DefaultElement {...props} />
      }
    },
    [indent, margin]
  )

  return (
    <div className="rich-text-editor">
      <Slate editor={myEditor} value={value} onChange={(v) => setValue(v)}>
        <Toolbar />
        <Ruler
          indent={indent}
          margin={margin}
          setIndent={setIndent}
          setMargin={setMargin}
        />
        <div className="editor">
          <Editable renderElement={renderElement} />
        </div>
      </Slate>
    </div>
  )
}

export default RichTextEditor
