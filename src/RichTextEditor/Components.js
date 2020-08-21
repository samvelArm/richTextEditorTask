import React from "react"
import { MIN_MARGIN } from "./constants"

export const DefaultElement = ({ attributes, children }) => {
  return <p {...attributes}>{children}</p>
}

export const IndentElement = ({ attributes, children, indent }) => {
  return (
    <ol
      {...attributes}
      style={{ marginLeft: `${indent}px`, paddingInlineStart: "16px" }}
    >
      {children}
    </ol>
  )
}

export const ListItem = ({ attributes, children, margin }) => {
  return (
    <li {...attributes} style={{ paddingLeft: `${margin - MIN_MARGIN}px` }}>
      {children}
    </li>
  )
}
