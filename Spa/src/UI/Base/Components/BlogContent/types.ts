import * as React from 'react'

export declare type BlogContentPropType = {
  userId: string
  name: string
  id: string
  value: string
  placeholder: string
  onChange: (content: string, imageFiles: File[]) => void 
  onFocus: React.EventHandler<React.FocusEvent<HTMLInputElement>>
  errorMsg: string
}


