import * as React from 'react'
import { ImageToolBarBtn } from './ImagePlugins'
import { EmbedsToolBarBtn } from './EmbedPlugins'
import { LinkToolBarBtn } from './LinkPlugins'
import { RichTextToolBar } from './RichText'
import { PositionProperty, FlexDirectionProperty } from 'csstype';
import "./Slate.scss"

declare type ToolBarPropType = {
  userId: string
}

export const ToolBar: React.FunctionComponent<ToolBarPropType> = (props) => {

  return (
    <div className="slate-toolbar-wrapper">
      <ImageToolBarBtn userId={props.userId}/>{' '}
      <EmbedsToolBarBtn />{' '}
      <LinkToolBarBtn />{' '}
      <RichTextToolBar />
    </div>
  )
}
