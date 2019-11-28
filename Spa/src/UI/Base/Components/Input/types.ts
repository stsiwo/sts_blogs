import * as React from 'react'
import { BlogType } from 'domain/blog/BlogType';

export declare type BaseInputPropType = React.PropsWithChildren<{
  wrapperStyle: string
  labelStyle: string
  label: string
  id: string
}>

export declare type InputPropType = BaseInputPropType & {
  inputStyle: string
  placeholder: string
  name: string
  inputValue: any
  onInputChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>
  onInputFocus: React.EventHandler<React.FocusEvent<HTMLInputElement>>
  errorMsg: string
  /** don't use 'ref' key, it not gonna work. use 'forwardRef' instead **/
  forwardRef?: React.MutableRefObject<HTMLInputElement>
}

export declare type TagInputPropType = BaseInputPropType & {
  inputStyle: string
  inputValue: any
  onInputChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>
  onInputFocus: React.EventHandler<React.FocusEvent<HTMLInputElement>>
  currentBlog: BlogType 
  setBlog: React.Dispatch<React.SetStateAction<BlogType>>
}

export declare type ImageInputPropType = {
  wrapperStyle: string
  imgStyle: string
  labelStyle: string
  labelWrapperStyle: string
  placeholder: string
  label: string
  id: string
  name: string
  inputStyle: string
  inputValue: any
  handleImageUploadChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>
  onInputFocus: React.EventHandler<React.FocusEvent<HTMLInputElement>>
  handleRevokeObjectURLOnLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>>
  src: string
}
