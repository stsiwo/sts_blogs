import * as React from 'react'
import { ToolBarBtnType } from "./types";
import { Transforms, Editor, Text } from '../fork/slate'
import { useSlate, RenderElementProps, RenderLeafProps } from '../fork/slate-react';
import { IconType } from 'react-icons/lib/cjs';
import { FaBold, FaItalic, FaListUl, FaListOl, FaQuoteLeft, FaHeading, FaRegFileCode, FaUnderline } from 'react-icons/fa';
import "./Slate.scss";
import { logger } from 'configs/logger';
const log = logger("RichText");

export const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

export const LIST_TYPES = ['numbered-list', 'bulleted-list']

const emptyText = { text: '' }

export const toggleBlock = (editor: Editor, format: string) => {
  log("inside toggleBlock")
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  log("inside toggleBlock")
  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [emptyText] }
    Transforms.wrapNodes(editor, block)
  }
}

export const toggleMark = (editor: Editor, format: string) => {
  log("inside toggleMark")
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })

  return !!match
}

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}


export const BlockQuoteElement: React.FunctionComponent<RenderElementProps> = props => {
  return <blockquote {...props.attributes}>{props.children}</blockquote>
}

export const BulletedListElement: React.FunctionComponent<RenderElementProps> = props => {
  return <ul {...props.attributes}>{props.children}</ul>
}

export const HeadingOneElement: React.FunctionComponent<RenderElementProps> = props => {
  return <h1 {...props.attributes}>{props.children}</h1>
}

export const HeadingTwoElement: React.FunctionComponent<RenderElementProps> = props => {
  return <h2 {...props.attributes}>{props.children}</h2>
}

export const ListItemElement: React.FunctionComponent<RenderElementProps> = props => {
  return <li {...props.attributes}>{props.children}</li>
}

export const NumberedListElement: React.FunctionComponent<RenderElementProps> = props => {
  return <ol {...props.attributes}>{props.children}</ol>
}



export const Leaf: React.FunctionComponent<RenderLeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

declare type RichTextbuttonType = {
  format: string
  icon: IconType
}

export const BlockButton: React.FunctionComponent<RichTextbuttonType> = ({ format, icon }) => {
  const editor = useSlate()
  const Icon = icon
  const activeClassName = "slate-toolbar-btn"
  const nonActiveClassName = "slate-toolbar-btn  slate-toolbar-btn-non-active"
  const currentClassName = (!isBlockActive(editor, format)) ? nonActiveClassName : activeClassName
  return (
    <span
      role={`${format}-toolbar-icon`}
      className={currentClassName}
      onMouseDown={event => {
        event.preventDefault()
        log("Block button clicked with")
        log(format)
        toggleBlock(editor, format)
      }}
    >
      <Icon />
    </span>
  )
}

export const MarkButton: React.FunctionComponent<RichTextbuttonType> = ({ format, icon }) => {
  const editor = useSlate()
  const Icon = icon
  const activeClassName = "slate-toolbar-btn"
  const nonActiveClassName = "slate-toolbar-btn  slate-toolbar-btn-non-active"
  const currentClassName = (!isBlockActive(editor, format)) ? nonActiveClassName : activeClassName
  return (
    <span
      role={`${format}-toolbar-icon`}
      className={currentClassName}
      onMouseDown={event => {
        event.preventDefault()
        log("Mark button clicked with")
        log(format)
        toggleMark(editor, format)
      }}
    >
      <Icon />
    </span>
  )
}

export const RichTextToolBar: React.FunctionComponent<{}> = (props) => {
  /**
   * {' '}: space
   **/
  return (
    <>
      <MarkButton format="bold" icon={FaBold} />{' '}
      <MarkButton format="italic" icon={FaItalic} />{' '}
      <MarkButton format="underline" icon={FaUnderline} />{' '}
      <MarkButton format="code" icon={FaRegFileCode} />{' '}
      <BlockButton format="heading-two" icon={FaHeading} />{' '}
      <BlockButton format="block-quote" icon={FaQuoteLeft} />{' '}
      <BlockButton format="numbered-list" icon={FaListOl} />{' '}
      <BlockButton format="bulleted-list" icon={FaListUl} />{' '}
    </>
  )

}
