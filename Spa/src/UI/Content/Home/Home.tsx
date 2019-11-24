import * as React from 'react';
import './Home.scss';
import { GoSearch } from 'react-icons/go'

const Home: React.FunctionComponent<{}> = (props: {}) => {

  // search input ref
  const searchInputRef = React.useRef<HTMLInputElement>()
  // search input display status
  const [currentSearchInputDisplayStatus, setSearchInputDisplayStatus] = React.useState<boolean>(false)

  const handleSearchIconClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    if (currentSearchInputDisplayStatus) {
      searchInputRef.current.style.width = '0px'
      searchInputRef.current.style.padding = '0px'
    } else {
      searchInputRef.current.style.width = '300px'
      searchInputRef.current.style.padding = '5px'
    }
    setSearchInputDisplayStatus(!currentSearchInputDisplayStatus)
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
      <div className="home-featured-tag-blog-wrapper">
        <h1 className="">featured tag blos list</h1>
      </div>
      <div className="home-recommendation-blog-wrapper">
        <h1 className="">recommendation blog list if member</h1>
      </div>
      <div className="home-membership-promotion-wrapper">
        <h1 className="">become member to post your blog</h1>
      </div>
    </div>
  );
}

export default Home;


