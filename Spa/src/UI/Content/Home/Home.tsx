import * as React from 'react';
import './Home.scss';
import { GoSearch } from 'react-icons/go'
import { BlogType } from 'domain/blog/BlogType';

//test image
const whiteAvatar = require('../../../../tests/data/images/white-1920x1280.jpg');
const redImage = require('../../../../tests/data/images/red-girl-1920x1279.jpg');
import range = require('lodash/range');
import { CssPropertyAnimationType, searchInputAnimationStatus } from 'ui/Base/Animation/types';
import { useCssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import { useResponsive } from 'Hooks/Responsive/useResponsive';
import BlogItem from 'Components/BlogItem/BlogItem';
import { getBlogTestData } from '../../../../tests/data/BlogFaker';


const Home: React.FunctionComponent<{}> = (props: {}) => {

  // search input ref
  const searchInputRef = React.useRef<HTMLInputElement>()
  // search input display status
  const [currentSearchInputAnimationStatus, setSearchInputAnimationStatus] = React.useState<CssPropertyAnimationType>(searchInputAnimationStatus)
  const [currentRecentBlogs, setRecentBlogs] = React.useState<BlogType>()
  const [currentPopularBlogs, setPopularBlogs] = React.useState<BlogType>()
  const [currentRecommendedBlogs, setRecommendedBlogs] = React.useState<BlogType>()
  const currentScreenSize = useResponsive()

  const handleSearchIconClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    searchInputRef.current.style.width = currentSearchInputAnimationStatus.width.value[+currentSearchInputAnimationStatus.isNextDisplay]
    searchInputRef.current.style.padding = currentSearchInputAnimationStatus.padding.value[+currentSearchInputAnimationStatus.isNextDisplay]
    setSearchInputAnimationStatus({
      ...currentSearchInputAnimationStatus,
      isNextDisplay: !currentSearchInputAnimationStatus.isNextDisplay
    })
  }

  const renderBlogs: () => React.ReactNode = () => {
    return getBlogTestData(5).map((blog: BlogType) => <BlogItem blog={blog}/>)
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


