import * as React from 'react';
import './Home.scss';
import { GoSearch } from 'react-icons/go'
import { BlogType } from 'domain/blog/BlogType';

//test image
const whiteAvatar = require('../../../../tests/data/images/white-1920x1280.jpg');
const redImage = require('../../../../tests/data/images/red-girl-1920x1279.jpg');
import range = require('lodash/range');
import { CssPropertyAnimationType, searchInputAnimationStatus } from 'ui/Base/Animation/types';
import { useResponsiveComponent } from 'Hooks/ResponsiveComponentHook';
import { useCssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';


const Home: React.FunctionComponent<{}> = (props: {}) => {

  // search input ref
  const searchInputRef = React.useRef<HTMLInputElement>()
  // search input display status
  const [currentSearchInputAnimationStatus, setSearchInputAnimationStatus] = React.useState<CssPropertyAnimationType>(searchInputAnimationStatus)
  const [currentRecentBlogs, setRecentBlogs] = React.useState<BlogType>()
  const [currentPopularBlogs, setPopularBlogs] = React.useState<BlogType>()
  const [currentRecommendedBlogs, setRecommendedBlogs] = React.useState<BlogType>()
  const currentScreenWidth = useResponsiveComponent()
  const cssGlobal = useCssGlobalContext()

  const handleSearchIconClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    searchInputRef.current.style.width = currentSearchInputAnimationStatus.width.value[+currentSearchInputAnimationStatus.isNextDisplay]
    searchInputRef.current.style.padding = currentSearchInputAnimationStatus.padding.value[+currentSearchInputAnimationStatus.isNextDisplay]
    setSearchInputAnimationStatus({
      ...currentSearchInputAnimationStatus,
      isNextDisplay: !currentSearchInputAnimationStatus.isNextDisplay
    })
  }

  const renderBlogs: () => React.ReactNode = () => {
    return range(5).map((num) => {
      return (
        <div className="blog-list-item-wrapper">
          <img className="blog-list-item-img" src={redImage} alt="blog item" width="150px" height="100px" />
          <div className="blog-list-item-desc">
            <h2 className="blog-list-item-desc-title">sample title might be a little bit longer</h2>
        {(currentScreenWidth > cssGlobal.mobileLSize && 
          <h3 className="blog-list-item-desc-subtitle">sample subtitle might be longer than blog title so might need to concatinate it</h3>)}
            <div className="blog-list-item-desc-detail">
              <p className="blog-list-item-desc-detail-main-tag">main tag</p>
              <p className="blog-list-item-desc-detail-date">blog date</p>
            </div>
            <div className="blog-list-item-desc-author">
              <img src={whiteAvatar} alt="avatar image" className="blog-list-item-desc-author-img" />
              <p className="blog-list-item-desc-author-name">author name</p>
            </div>
          </div>
        </div>
      );
    })
  }

  return (
    <div className="home-wrapper">
      <div className="home-search-bar-wrapper">
        <input type='text' className="input" placeholder="enter keyword or tags for blog search ..." ref={searchInputRef} />
        <div className="icon-wrapper" onClick={handleSearchIconClickEvent}>
          <GoSearch className="icon" />
        </div>
      </div>
      <div className="home-title-wrapper">
        <h1 className="home-slogan">Share Your Knowledge and Expand What You Can Do</h1>
      </div>
      <div className="context-wrapper">
        <div className="main-wrapper">
          <div className="home-blog-tabs-wrapper">
            <button className="tab" >Recent</button>
            <button className="tab" >Popular</button>
            <button className="tab" >Recommended</button>
          </div>
          <div className="home-blog-list-wrapper">
            {renderBlogs()}
          </div>
        </div>
        <div className="aside-wrapper">
          <div className="be-part-of-it-wrapper">
            <h2 className="be-part-of-it-title">Be Part of It</h2>
            <p className="be-part-of-it-desc">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
            <button className="btn">Join</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


