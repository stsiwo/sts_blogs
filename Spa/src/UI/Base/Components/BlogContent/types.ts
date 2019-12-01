import * as React from 'react'

export declare type BlogContentPropType = {
  name: string
  id: string
  value: string
  placeholder: string
  onChange: (content: string) => void 
  onFocus: React.EventHandler<React.FocusEvent<HTMLInputElement>>
  errorMsg: string
}


