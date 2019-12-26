import * as React from 'react'
import { Node } from 'slate'
import { CustomElementProps } from 'src/slate-react/components/custom';

export declare type BlogContentPropType = {
  userId: string
  name: string
  id: string
  value: Node[] 
  placeholder: string
  onChange: (content: Node[], imageFiles: File[], imagePaths: string[]) => void 
  onFocus: React.EventHandler<React.FocusEvent<HTMLInputElement>>
  errorMsg: string
}

export declare type ImageCustomElementProps = CustomElementProps & {
  src: string
  publicSrc: URL
  imageFile?: Blob // extract this when saving. need to remove.
  style?: string
}

