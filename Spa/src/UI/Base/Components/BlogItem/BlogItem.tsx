import * as React from 'react';
import './BlogItem.scss';
import { BlogItemPropType, BlogItemOverlayPropsType, AnimationStatusType } from './types';
import { useResponsive } from 'Hooks/Responsive/useResponsive';
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { TagType } from 'domain/tag/TagType';
import { dateFormatOption } from 'src/utils';
import { useRouteMatch } from 'react-router';
const whiteAvatar = require('../../../../../tests/data/images/white-1920x1280.jpg');
const redImage = require('../../../../../tests/data/images/red-girl-1920x1279.jpg');


const BlogItemOverlay: React.FunctionComponent<BlogItemOverlayPropsType> = (props: BlogItemOverlayPropsType) => {

  let { path, url } = useRouteMatch();

  const onTransaction: React.EventHandler<React.TransitionEvent<HTMLDivElement>> = (e) => {
    // when mouse leaves
    if (!props.currentOverlayState.isMouseEnter) {
      console.log('didmount is false and componentshow to false at end of transaction')
      props.setOverlayState({
        ...props.currentOverlayState,
        componentShow: false,
      })
    }
  }

  React.useEffect(() => {
    if (props.currentOverlayState.isMouseEnter) {
      console.log('overlay component did mounted to true at did update')
      props.setOverlayState({
        ...props.currentOverlayState,
        didMounted: true,
      })
    }
  }, [
      props.currentOverlayState.isMouseEnter
    ])


  return (
    <div
      className="blog-item-controller-overlay"
      /**ref={overlayDivRef}**/
      onTransitionEnd={onTransaction}
      style={{
        ...(props.currentOverlayState.didMounted ? { opacity: 1 } : { opacity: 0 })
      }}
    >
      <div className="blog-item-controller-content" >
        <Link to={`${path}/update/${props.blogId}`} className="link" role='blog-edit-link'>
          <div className="white-icon-wrapper">
            <FaEdit className="icon" />
          </div>
        </Link>
        <div className="white-icon-wrapper">
          <MdDeleteForever className="icon" />
        </div>
      </div>
    </div>
  );
}


const BlogItem: React.FunctionComponent<BlogItemPropType> = (props: BlogItemPropType) => {

  const currentScreenSize = useResponsive()
  const overlayDivRef = React.useRef<HTMLDivElement>()
  const [currentOverlayState, setOverlayState] = React.useState<AnimationStatusType>({
    didMounted: false,
    componentShow: false,
    isMouseEnter: false
  })

  const [curBool, setBool] = React.useState<boolean>(false)

  const handleBlogItemMouseEnterEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    console.log('enter eh is called')
    console.log('componentShow to true')
    console.log('isMouseEnter to true')
    setOverlayState({
      ...currentOverlayState,
      componentShow: true,
      isMouseEnter: true
    })
  }

  const handleBlogItemMouseLeaveEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    console.log('leave eh is called')
    console.log('didmount to false')
    console.log('isMouseEnter to false')
    setOverlayState({
      ...currentOverlayState,
      didMounted: false,
      isMouseEnter: false,
    })
  }

  const renderTags = (tagSet: Set<string>): React.ReactNode => {
    return Array.from(tagSet).map((tag: string) => <div className="blog-list-filter-tags-tag" key={tag}>{tag}</div>)
  }

  const isOverlay: boolean = props.isEditDeleteOverlay ? props.isEditDeleteOverlay : false

  return (
    <div className="blog-list-item-wrapper" onMouseEnter={handleBlogItemMouseEnterEvent} onMouseLeave={handleBlogItemMouseLeaveEvent} role="blog-item">
      <img className="blog-list-item-img" src={props.blog.mainImageUrl} alt="blog item" width="150px" height="100px" />
      <div className="blog-list-item-desc">
        <h2 className="blog-list-item-desc-title">{props.blog.title}</h2>
        {(!currentScreenSize.isMobileL &&
          <h3 className="blog-list-item-desc-subtitle">{props.blog.subtitle}</h3>)}
        <div className="blog-list-item-desc-detail">
          {renderTags(props.blog.tags)}
          <p className="blog-list-item-desc-detail-date">{props.blog.createdDate.toLocaleDateString("en-US", dateFormatOption)}</p>
        </div>
        <div className="blog-list-item-desc-author">
          <img src={props.blog.author.avatarUrl} alt="avatar image" className="blog-list-item-desc-author-img" />
          <p className="blog-list-item-desc-author-name">{props.blog.author.name}</p>
        </div>
        {(isOverlay && currentOverlayState.componentShow &&
          <BlogItemOverlay
            currentOverlayState={currentOverlayState}
            setOverlayState={setOverlayState}
            handleDeleteBlogClickEvent={props.handleDeleteBlogClickEvent}
            blogId={props.blog.id}
          />
        )}
      </div>
    </div>
  );
}

export default BlogItem;







