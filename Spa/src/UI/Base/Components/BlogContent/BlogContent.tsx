import * as React from 'react';
import './BlogContent.scss';
import { BlogContentPropType, ImageCustomElementProps } from './types';
import { Link } from 'react-router-dom';
// Import the Slate editor factory.
import { createEditor, Node, Editor, Transforms, Element } from '../fork/slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, RenderElementProps } from '../fork/slate-react'
import { generateBlogContentPublicImageUrl, generateBlogContentPublicImagePath, generateFileWithUuidv4 } from 'src/utils';
import { FloatProperty, FlexDirectionProperty, PositionProperty } from 'csstype';
import { withEmbeds, EmbedsElement } from 'Components/slate/EmbedPlugins';
import { withImages, ImageElement } from 'Components/slate/ImagePlugins';
import { withLinks, LinkElement } from 'Components/slate/LinkPlugins';
import { withHistory } from 'Components/fork/slate-history';
import { BlockQuoteElement, BulletedListElement, HeadingOneElement, HeadingTwoElement, ListItemElement, NumberedListElement, Leaf, HOTKEYS, LIST_TYPES, toggleMark } from 'Components/slate/RichText';
import { ToolBar } from '../slate/ToolBar'
import isHotkey from 'is-hotkey'
import { logger } from 'configs/logger';
const log = logger("BlogContent");


const BlogContent: React.FunctionComponent<BlogContentPropType> = (props: BlogContentPropType) => {
  // Create a Slate editor object that won't change across renders.
  // can't extract to another file otherwise get errors
  const editor = React.useMemo(() => withEmbeds(withImages(withLinks(withReact(withHistory(createEditor()))))), [])

  const defaultValue: Element[] = props.value.length !== 0 ? props.value as Element[] : [
    {
      type: 'paragraph',
      children: [{ text: "" }],
    },
  ]

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
    <div>
      <div className="slate-wrapper">
        <Slate
          editor={editor}
          value={defaultValue}
          onChange={value => {
            props.onChange(value)
            // need to save request every time user change content
            // better to use rxjs to controll how to request
          }}>
          <ToolBar userId={props.userId} />
          <Editable
            role="blog-content-editable"
            className="slate-editor clear-fix"
            placeholder={props.placeholder}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            name={props.name}
            spellCheck
            autoFocus
            onKeyDown={(event: React.KeyboardEvent) => {
              if (!event.ctrlKey) {
                return
              }

              switch (event.key) {
                // undo 
                case 'z': {
                  event.preventDefault()
                  log("let's undo")
                  editor.undo()
                  break
                }

                // redo
                case 'y': {
                  event.preventDefault()
                  log("let's undo")
                  editor.redo()
                  break
                }
              }
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as unknown as KeyboardEvent)) {
                  event.preventDefault()
                  const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS]
                  log("mark at onKeyDown of toolbar")
                  log(mark)
                  toggleMark(editor, mark)
                }
              }
            }
            }
          />
        </Slate>
      </div>
    </div>
  );
};

export default BlogContent;
