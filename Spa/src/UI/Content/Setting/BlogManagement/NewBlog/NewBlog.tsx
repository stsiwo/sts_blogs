import { BlogType, initialBlogState } from 'domain/blog/BlogType';
import { TagType } from 'domain/tag/TagType';
import * as React from 'react';
import { useParams } from 'react-router';
import { RequestMethodEnum, ResponseResultStatusEnum } from 'requests/types';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useRequest } from 'Hooks/Request/useRequest';
import { useBlogValidation } from 'Hooks/Validation/Blog/useBlogValidation';
import './NewBlog.scss';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
import ImageInput from 'Components/Input/ImageInput';
import Input from 'Components/Input/Input';
import TagInput from 'Components/Input/TagInput';
// Import the Slate editor factory.
import { createEditor } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'src/slate-react'
import { Editor } from 'slate'
import { CustomElementProps } from 'src/slate-react/components/custom';
var debug = require('debug')('ui:NewBlog')

const NewBlog: React.FunctionComponent<{}> = (props: {}) => {

  const titleInputRef: React.MutableRefObject<HTMLInputElement> = { current: null }
  const subtitleInputRef: React.MutableRefObject<HTMLInputElement> = { current: null }

  const [currentBlog, setBlog] = React.useState<BlogType>(initialBlogState)
  const { currentValidationError, touch, validate } = useBlogValidation({ domain: currentBlog })
  const { currentRequestStatus: currentNewBlogStatus, setRequestStatus: setNewBlogStatus, sendRequest: saveRequest } = useRequest({})
  const { blogId } = useParams();
  const userId = useAuthContext()
  /** anything else **/
  const path: string = '/users/' + userId + '/blogs/'
  const method: RequestMethodEnum = RequestMethodEnum.POST

  /** EH **/
  const mapStateToFormData = (state: BlogType): FormData => {
    const formData = new FormData()
    if (state.id) formData.append('id', state.id)
    formData.set('title', state.title)
    formData.set('subtitle', state.subtitle)
    formData.set('mainImage', state.mainImage)
    formData.set('mainImageUrl', state.mainImageUrl)
    formData.set('content', state.content)
    formData.set('createdDate', state.createdDate.toJSON())
    formData.set('tags', JSON.stringify(state.tags))
    return formData
  }

  const handleSaveBlogClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    debug('start handling save button click')
    validate()
      .then(() => {
        debug('validation passed at save button event handler')
        saveRequest({
          path: path,
          method: method,
          headers: { 'content-type': 'multipart/form-data' },
          data: mapStateToFormData(currentBlog),
        })
      }, () => {
        debug('validation failed at save button event handler')
      })
  }

  const changeInputWidthDynamically = (inputRef: React.MutableRefObject<HTMLInputElement>, currentChLength: number): void => {
    console.log(inputRef)
    console.log(currentChLength)
    inputRef.current.style.width = currentChLength > 30 ? currentChLength + 'ch' : 30 + 'ch';
  }

  const handleTitleChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setBlog({
      ...currentBlog,
      title: e.currentTarget.value
    })
    changeInputWidthDynamically(titleInputRef, e.currentTarget.value.length)
  }

  const handleSubTitleChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setBlog({
      ...currentBlog,
      subtitle: e.currentTarget.value
    })
    changeInputWidthDynamically(subtitleInputRef, e.currentTarget.value.length)
  }

  const handleImageUploadChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    const imgFile: File = e.currentTarget.files[0]
    const imgSrc: string = window.URL.createObjectURL(imgFile);
    setBlog({
      ...currentBlog,
      mainImage: imgFile,
      mainImageUrl: imgSrc,
    })
  }

  const handleRevokeObjectURLOnLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = (e) => {
    window.URL.revokeObjectURL(currentBlog.mainImageUrl);
  }

  const handleContentChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setBlog({
      ...currentBlog,
      content: e.currentTarget.value
    })
  }

  const handleInitialFocusEvent: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (e) => {
    touch(e.currentTarget.name)
  }

  // Create a Slate editor object that won't change across renders.
  const editor = React.useMemo(() => withReact(createEditor()), [])

  const defaultValue = [
    {
      type: 'paragraph',
      children: [
        {
          text: 'A line of text in a paragraph. please work, please. please please',
          marks: [] as any[],
        },
      ],
    },
  ]

  const CodeElement: React.FunctionComponent<CustomElementProps> = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  }

  const DefaultElement: React.FunctionComponent<CustomElementProps> = props => {
    return <p {...props.attributes}>{props.children}</p>
  }

  const renderElement = React.useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  /** render **/
  return (
    <div className="context-wrapper">
      <div className="main-wrapper">
        <h2 className="profile-title">New Blog</h2>
        <FetchStatus
          currentFetchStatus={currentNewBlogStatus}
          setFetchStatus={setNewBlogStatus}
          fetchingMsg={'saving...'}
          successMsg={'ok'}
          failureMsg={'failed'}
        />
        <ImageInput
          handleImageUploadChange={handleImageUploadChange}
          handleRevokeObjectURLOnLoad={handleRevokeObjectURLOnLoad}
          id={"update-blog-picture-input"}
          imgStyle={"blog-detail-picture-img"}
          inputStyle={"grid-picture-input"}
          inputValue={null}
          label={"Select Main Image"}
          labelStyle={"btn grid-picture-label"}
          labelWrapperStyle={"grid-picture-input-wrapper blog-detail-input-wrapper"}
          name={"mainImage"}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter blog image..."}
          src={currentBlog.mainImageUrl}
          wrapperStyle={"blog-detail-picture-wrapper"}
        />
        <Input
          id={"title"}
          inputStyle={"black-input grid-input blog-detail-input"}
          inputValue={currentBlog.title}
          label={"Title"}
          labelStyle={"grid-input-label blog-detail-input-label"}
          name={"title"}
          onInputChange={handleTitleChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter blog title..."}
          wrapperStyle={'blog-detail-input-wrapper'}
          errorMsg={currentValidationError.title}
          forwardRef={titleInputRef}
        />
        <Input
          id={"subtitle"}
          inputStyle={"black-input grid-input blog-detail-input"}
          inputValue={currentBlog.subtitle}
          label={"Subtitle"}
          labelStyle={"grid-input-label blog-detail-input-label"}
          name={"subtitle"}
          onInputChange={handleSubTitleChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter blog subtitle..."}
          wrapperStyle={'blog-detail-input-wrapper'}
          errorMsg={currentValidationError.subtitle}
          forwardRef={subtitleInputRef}
        />
        <TagInput
          id={"tag"}
          inputStyle={"black-input grid-input blog-detail-input"}
          inputValue={currentBlog.tags}
          label={"Tags"}
          labelStyle={"grid-input-label blog-detail-input-label"}
          onInputChange={handleSubTitleChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          wrapperStyle={'blog-detail-input-wrapper'}
          currentBlog={currentBlog}
          setBlog={setBlog}
        />
        <Slate
          editor={editor}
          defaultValue={defaultValue}
        >
          <>
            <button
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
              }}
            >
              Bold
            </button>
            <Editable
              renderElement={renderElement}
              onKeyDown={(event: React.KeyboardEvent) => {
                if (event.key === '`' && event.ctrlKey) {
                  // Determine whether any of the currently selected blocks are code blocks.
                  const { selection } = editor
                  const isCode = selection
                    ? Editor.match(editor, selection, { type: 'code' })
                    : false

                  // Toggle the block type depending on `isCode`.
                  Editor.setNodes(
                    editor,
                    { type: isCode ? 'paragraph' : 'code' },
                    { match: 'block' }
                  )
                }
              }}
            />
          </>
        </Slate>
        <div className="blog-detail-input-wrapper">
          <label htmlFor="content" className="grid-input-label blog-detail-input-label">
            Content
            </label>
          <input type="text" name="content" id="content" className="black-input grid-input" placeholder="enter blog content..." value={currentBlog.content} onChange={handleTitleChangeEvent} onFocus={handleInitialFocusEvent} />
          {(currentValidationError.content && <div className="input-error">{currentValidationError.content}</div>)}
        </div>
        <input type="hidden" name='creationDate' value={currentBlog.createdDate.toJSON()} />
        <div className="blog-detail-input-wrapper">
          <input type="button" className="btn" value="Save" name='submit' onClick={handleSaveBlogClickEvent} onFocus={handleInitialFocusEvent} />
          {(currentValidationError.submit && <div className="input-error">{currentValidationError.submit}</div>)}
        </div>
      </div>
      <div className="aside-wrapper">
      </div>
    </div>
  );
}

export default NewBlog;







