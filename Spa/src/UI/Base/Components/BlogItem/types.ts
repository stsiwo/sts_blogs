import * as React from 'react'
import { BlogType } from 'domain/blog/BlogType';

export declare type BlogItemPropType = {
  blog: BlogType
  divRef?: React.MutableRefObject<HTMLDivElement>
  handleDeleteBlogClickEvent?: React.EventHandler<React.MouseEvent<HTMLDivElement>>
  isEditDeleteOverlay?: boolean

}

export declare type AnimationStatusType = {
  didMounted: boolean
  componentShow: boolean
  isMouseEnter: boolean
}

export declare type BlogItemOverlayPropsType = {
  setOverlayState: React.Dispatch<React.SetStateAction<AnimationStatusType>>
  currentOverlayState: AnimationStatusType
  handleDeleteBlogClickEvent?: React.EventHandler<React.MouseEvent<HTMLDivElement>>
  blogId: string
}


