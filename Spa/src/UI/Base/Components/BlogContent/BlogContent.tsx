import * as React from 'react';
import './BlogContent.scss';
import { BlogContentPropType, ImageCustomElementProps } from './types';
import { Link } from 'react-router-dom';
// Import the Slate editor factory.
import { createEditor, Mark, NodeEntry, Text, Element } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'src/slate-react'
import { Editor } from 'slate'
import { CustomElementProps, CustomElement } from 'src/slate-react/components/custom';
import { AiOutlinePicLeft, AiOutlinePicRight, AiOutlinePicCenter, AiOutlineFullscreen } from 'react-icons/ai';
import { FaBold, FaCode, FaItalic, FaImage } from 'react-icons/fa';
import { generateBlogContentPublicImageUrl, generateBlogContentPublicImagePath } from 'src/utils';
import { FloatProperty } from 'csstype';
var debug = require('debug')('ui:BlogContent')

/**
 * temporarly disable image 
 *  - need to think how to deal with rich-text (with Slate)
 **/

const BlogContent: React.FunctionComponent<BlogContentPropType> = (props: BlogContentPropType) => {

  const defaultElement: Element = {
    type: 'paragraph',
    children: [
      {
        text: '',
        marks: [] as any[],
      },
    ],
  }

  const defaultValue: Element[] = props.value.length !== 0 ? props.value as Element[] : [
    defaultElement
  ]
  debug('*** blog content value')
  debug(defaultValue)

  // Define our own custom set of helpers for common queries.
  const CustomEditor = {
    // extract current editor's mark contains 'bold' mark
    isBoldMarkActive(editor: Editor): boolean {
      const { selection } = editor
      const activeMarks = Editor.activeMarks(editor)
      return activeMarks.some(mark => mark.type === 'bold')
    },

    isItalicMarkActive(editor: Editor): boolean {
      const { selection } = editor
      const activeMarks = Editor.activeMarks(editor)
      return activeMarks.some(mark => mark.type === 'italic')
    },

    isCodeBlockActive(editor: Editor): NodeEntry | undefined | boolean {
      const { selection } = editor
      const isCode = selection
        ? Editor.match(editor, selection, { type: 'code' })
        : false
      return isCode
    },
  }

  // Create a custom editor plugin function that will augment the editor.
  const withCustom = (editor: Editor) => {
    const { exec, isVoid } = editor

    editor.isVoid = (element: Element): boolean => {
      debug('custom isVoid')
      debug(element.type)
      debug(element.type === 'figure' ? true : isVoid(element))
      return element.type === 'figure' ? true : isVoid(element)
    }

    editor.exec = command => {

      debug('current selection')
      debug(editor.selection)

      // Define a command to toggle the bold mark formatting.
      if (command.type === 'toggle_bold_mark') {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        // Delegate to the existing `add_mark` and `remove_mark` commands, so that
        // other plugins can override them if they need to still.
        editor.exec({
          type: isActive ? 'remove_mark' : 'add_mark',
          mark: { type: 'bold' },
        })
      }

      if (command.type === 'toggle_italic_mark') {
        const isActive = CustomEditor.isItalicMarkActive(editor)
        // Delegate to the existing `add_mark` and `remove_mark` commands, so that
        // other plugins can override them if they need to still.
        editor.exec({
          type: isActive ? 'remove_mark' : 'add_mark',
          mark: { type: 'italic' },
        })
      }

      // Define a command to toggle the code block formatting.
      else if (command.type === 'align_image_left') {
        debug('executing command align_image_left')
        editor.exec({
          type: 'add_mark',
          mark: { type: 'left_align' },
        })
      }

      // Define a command to toggle the code block formatting.
      else if (command.type === 'toggle_code_block') {
        const isActive = CustomEditor.isCodeBlockActive(editor)
        // There is no `set_nodes` command, so we can transform the editor
        // directly using the helper instead.
        Editor.setNodes(
          editor,
          { type: isActive ? null : 'code' },
          { match: 'block' }
        )
      }

      else if (command.type === 'insert_figure') {
        const tempInput = document.createElement('input')
        tempInput.type = 'file'
        tempInput.onchange = (e) => {
          const tempFile: File = (e.target as HTMLInputElement).files[0]
          const imgSrc: string = window.URL.createObjectURL(tempFile);

          const imgText: Text = {
            text: '',
            marks: [] as any[]
          }

          const imgElement: Element = {
            type: 'image',
            children: [
              imgText
            ],
            src: imgSrc,
            publicSrc: generateBlogContentPublicImageUrl(props.userId, tempFile.name),
            imageFile: tempFile, // need to remove when saving. extract file into formdata separately
            attributes: {
              onLoad: (e: React.SyntheticEvent) => {
                window.URL.revokeObjectURL(imgSrc)
              },
            }
          }

          const figureElement: Element = {
            type: 'figure',
            children: [
              imgElement
            ]
          }

          const nextDefaultElement: Element = defaultElement
          Editor.insertNodes(editor, figureElement)
          Editor.insertNodes(editor, nextDefaultElement)
        }
        tempInput.click();
      }

      // Otherwise, fall back to the built-in `exec` logic for everything else.
      else {
        exec(command)
      }
    }

    return editor
  }

  // Create a Slate editor object that won't change across renders.
  const editor = React.useMemo(() => withCustom(withReact(createEditor())), [])

  const BoldMark: React.FunctionComponent<CustomElementProps> = props => {
    return <strong {...props.attributes}>{props.children}</strong>
  }


  const ItalicMark: React.FunctionComponent<CustomElementProps> = props => {
    return <i {...props.attributes}>{props.children}</i>
  }

  const leftAlignStyle = {
    maxWidth: '50%',
    margin: '0 auto auto auto',
    display: 'inline-block',
    float: 'left' as FloatProperty
  }

  const LeftAlign: React.FunctionComponent<CustomElementProps> = props => {
    debug('insert LeftAlign component')
    return <span style={leftAlignStyle} {...props.attributes}>{props.children}</span>
  }

  const CodeElement: React.FunctionComponent<CustomElementProps> = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  }

  const FigureElement: React.FunctionComponent<ImageCustomElementProps> = props => {
    /** need to think how to handle Text at image **/
    /** where to put 'props.children' **/
    debug('inside FigureElement: ')
    debug(props)
    return (
      <>
        <figure {...props.attributes} className="editable-figure">
          <img src={props.element.children[0].src} {...props.element.children[0].attributes} className="editable-img" />
          <figcaption>test caption</figcaption>
        </figure>
      </>
    )
  }


  const renderMark = React.useCallback(props => {
    debug('inside renderMark func')
    switch (props.mark.type) {
      case 'bold': {
        debug('start picking up bold Component as mark')
        return <BoldMark {...props} />
      }
      case 'italic': {
        return <ItalicMark {...props} />
      }
      case 'left_align': {
        debug('start picking up left_align Component as mark')
        return <LeftAlign {...props} />
      }
    }
  }, [])

  const DefaultElement: React.FunctionComponent<CustomElementProps> = props => {
    return <p {...props.attributes}>{props.children}</p>
  }

  const renderElement = React.useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      case 'figure':
        return <FigureElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const customVoid: (element: Element) => boolean = (element) => {
    return false
  }


  return (
    <Slate
      editor={editor}
      defaultValue={defaultValue}
      onChange={value => {
        debug('current selection:')
        debug(editor.selection)
        console.log(value)
        // extract files and put those into different state
        const imageList: File[] = []
        const imagePathList: string[] = []
        value.forEach((node: Element) => {
          if (node.type === 'image') {
            imageList.push(node.imageFile)
            imagePathList.push(generateBlogContentPublicImagePath(props.userId, node.imageFile.name))
          }
        })
        // Save the value to Local Storage.
        props.onChange(value, imageList, imagePathList)
        const content = JSON.stringify(value)
        localStorage.setItem('content', content)
        // need to save request every time user change content
        // better to use rxjs to controll how to request
      }}
    >
      <>
        <div
          className="small-icon-wrapper"
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
            event.preventDefault()
            editor.exec({ type: 'toggle_bold_mark' })
          }}
        >
          <FaBold className="small-icon" />
        </div>
        <div
          className="small-icon-wrapper"
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
            event.preventDefault()
            editor.exec({ type: 'toggle_code_block' })
          }}
        >
          <FaCode className="small-icon" />
        </div>
        <div
          className="small-icon-wrapper"
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
            event.preventDefault()
            editor.exec({ type: 'toggle_italic_mark' })
          }}
        >
          <FaItalic className="small-icon" />
        </div>
       {/**
        <div
          className="small-icon-wrapper"
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
            event.preventDefault()
            editor.exec({ type: 'insert_figure' })
          }}
        >
          <FaImage className="small-icon" />
        </div>
        <div
          className="small-icon-wrapper"
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
            event.preventDefault()
            editor.exec({ type: 'align_image_left' })
          }}
        >
          <AiOutlinePicLeft className="small-icon" />
        </div>
        **/}
        <Editable
          role="blog-content-editable"
          className="blog-content-editable clear-fix"
          placeholder={props.placeholder}
          renderElement={renderElement}
          renderMark={renderMark}
          onFocus={props.onFocus}
          name={props.name}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (!event.ctrlKey) {
              return
            }

            switch (event.key) {
              case '`': {
                event.preventDefault()
                editor.exec({ type: 'toggle_code_block' })
                break
              }

              case 'b': {
                event.preventDefault()
                editor.exec({ type: 'toggle_bold_mark' })
                break
              }
            }
          }}
        />
      </>
    </Slate>
  );
}

export default BlogContent;









