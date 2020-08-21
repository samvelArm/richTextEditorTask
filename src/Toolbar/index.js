import React from "react"
import cx from "classnames"
import "./toolbar.scss"

import { Editor, Transforms } from "slate"
import { useSlate } from "slate-react"
import { formats, LIST_TYPES } from "../RichTextEditor/constants"

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  })

  return !!match
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const Toolbar = () => {
  const editor = useSlate()

  return (
    <div className="toolbar">
      <button
        className={cx("ordered-list-button", {
          toggled: isBlockActive(editor, formats.orderedList),
        })}
        onMouseDown={() => toggleBlock(editor, formats.orderedList)}
      />
    </div>
  )
}

export default Toolbar
