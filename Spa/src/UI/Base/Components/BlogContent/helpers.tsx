import { Node } from 'Components/fork/slate'
import { ImageCustomElementProps } from './types';
import { logger } from 'configs/logger';
const log = logger("BlogConent-helpers");


export const replaceTmpSrcWithPublicSrc = (content: Node[]): Node[] => {
  log('start replaceTmpSrcWithPublicSrc')

  if (content) {
    content.forEach((node: Node) => {
      if (node.type === 'image') {
        if ((node as ImageCustomElementProps).publicSrc) {
          (node as ImageCustomElementProps).src = (node as ImageCustomElementProps).publicSrc.toJSON();
          (node as ImageCustomElementProps).isNew = false
          delete node.imageFile
          delete node.publicSrc
        }
      }
    })
  }
  return content
}
