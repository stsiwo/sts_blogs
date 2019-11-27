import * as React from 'react';
import './BlogItem.scss';
import { BlogItemPropType } from './types';
import { useResponsive } from 'Hooks/Responsive/useResponsive';
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
const whiteAvatar = require('../../../../../tests/data/images/white-1920x1280.jpg');
const redImage = require('../../../../../tests/data/images/red-girl-1920x1279.jpg');


declare type AnimationStatusType = {
  didMounted: boolean
  componentShow: boolean
  isMouseEnter: boolean
}

declare type TestPorpsType = {
  setOverlayState: React.Dispatch<React.SetStateAction<AnimationStatusType>>
  currentOverlayState: AnimationStatusType
}

const BlogItemOverlay: React.FunctionComponent<TestPorpsType> = (props: TestPorpsType) => {

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
        <Link to={`./update/${1}`} className="link" role='blog-edit-link'>
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

  return (
    <div className="blog-list-item-wrapper" onMouseEnter={handleBlogItemMouseEnterEvent} onMouseLeave={handleBlogItemMouseLeaveEvent}>
      <img className="blog-list-item-img" src={redImage} alt="blog item" width="150px" height="100px" />
      <div className="blog-list-item-desc">
        <h2 className="blog-list-item-desc-title">sample title might be a little bit longer</h2>
        {(!currentScreenSize.isMobileL &&
          <h3 className="blog-list-item-desc-subtitle">sample subtitle might be longer than blog title so might need to concatinate it</h3>)}
        <div className="blog-list-item-desc-detail">
          <p className="blog-list-item-desc-detail-main-tag">main tag</p>
          <p className="blog-list-item-desc-detail-date">blog date</p>
        </div>
        <div className="blog-list-item-desc-author">
          <img src={whiteAvatar} alt="avatar image" className="blog-list-item-desc-author-img" />
          <p className="blog-list-item-desc-author-name">author name</p>
        </div>
        {(currentOverlayState.componentShow &&
          <BlogItemOverlay
            currentOverlayState={currentOverlayState}
            setOverlayState={setOverlayState}
          />
        )}
      </div>
    </div>
  );
}

export default BlogItem;







