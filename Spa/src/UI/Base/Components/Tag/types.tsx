import * as React from 'react'

export declare type TagPropType = {
  name: string
  withCancelBtn?: boolean
  wrapperStyle?: string
  nameStyle?: string
  blackStyle?: boolean
  handleTagDeleteClickEvent?: React.EventHandler<React.MouseEvent<HTMLDivElement>>
}
