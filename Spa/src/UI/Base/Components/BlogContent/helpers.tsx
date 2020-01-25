import { Node } from 'Components/fork/slate'
import { ImageCustomElementProps } from './types';
var debug = require('debug')('ui:BlogConent-helpers')


export const replaceTmpSrcWithPublicSrc = (content: Node[]): Node[] => {
  debug('start replaceTmpSrcWithPublicSrc')

  content.forEach((node: Node) => {
    if (node.type === 'image') {
      (node as ImageCustomElementProps).src = (node as ImageCustomElementProps).publicSrc.toJSON()
      delete node.imageFile
      delete node.publicSrc
    }
  })

  return content
}
