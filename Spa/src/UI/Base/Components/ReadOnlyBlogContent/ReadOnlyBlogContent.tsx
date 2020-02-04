import * as React from 'react'
import { Leaf, BlockQuoteElement, BulletedListElement, HeadingOneElement, HeadingTwoElement, ListItemElement, NumberedListElement } from 'Components/slate/RichText';
import { Slate, Editable, withReact } from 'Components/fork/slate-react';
import { Node, createEditor } from 'Components/fork/slate'
import { withEmbeds, EmbedsElement } from 'Components/slate/EmbedPlugins';
import { withImages, ImageElement } from 'Components/slate/ImagePlugins';
import { withLinks, LinkElement } from 'Components/slate/LinkPlugins';
import { withHistory } from 'Components/fork/slate-history';

declare type ReadOnlyBlogContentPropsType = {
  value: Node[]
}

const ReadOnlyBlogContent: React.FunctionComponent<ReadOnlyBlogContentPropsType> = ({ value }) => {

  // can't extract to another file otherwise get errors
  const editor = React.useMemo(() => withEmbeds(withImages(withLinks(withReact(withHistory(createEditor()))))), [])

  // can't extract to another file otherwise get errors
  const renderElement = React.useCallback(props => {
    switch (props.element.type) {
      case 'image':
        return <ImageElement {...props} />
      case 'video':
        return <EmbedsElement {...props} />
      case 'link':
        return <LinkElement {...props} />
      case 'block-quote':
        return <BlockQuoteElement {...props} />
      case 'bulleted-list':
        return <BulletedListElement {...props} />
      case 'heading-one':
        return <HeadingOneElement {...props} />
      case 'heading-two':
        return <HeadingTwoElement {...props} />
      case 'list-item':
        return <ListItemElement {...props} />
      case 'numbered-list':
        return <NumberedListElement {...props} />
      default:
        return <p {...props.attributes}>{props.children}</p>
    }
  }, [])
  const renderLeaf = React.useCallback(props => <Leaf {...props} />, [])

  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={value => {
        }}>
        <Editable
          role="blog-content-editable"
          className="slate-editor clear-fix"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </>
  )
}

export default ReadOnlyBlogContent
