import * as React from 'react';
import './Home.scss';
import { GoSearch } from 'react-icons/go'
import { BlogType } from 'domain/blog/BlogType';
import { SortEnum } from 'domain/blog/Sort';

//test image
const whiteAvatar = require('../../../../tests/data/images/white-1920x1280.jpg');
const redImage = require('../../../../tests/data/images/red-girl-1920x1279.jpg');
import { CssPropertyAnimationType, searchInputAnimationStatus } from 'ui/Base/Animation/types';
import { useCssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import { useResponsive } from 'Hooks/Responsive/useResponsive';
import BlogItem from 'Components/BlogItem/BlogItem';
import { getBlogTestData } from '../../../../tests/data/BlogFaker';
import BePartOfIt from 'Components/BePartOfIt/BePartOfIt';
import ManageYourBlogs from 'Components/ManageYourBlogs/ManageYourBlogs';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useRequest } from 'Hooks/Request/useRequest';
import { RequestMethodEnum, BlogListResponseDataType, QueryStringType, ResponseResultStatusEnum, ErrorResponseDataType, ResponseResultType } from 'requests/types';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { logger } from 'configs/logger';
const log = logger("Home");

declare type BlogOptionType = {
  recent: BlogType[]
  popular: BlogType[]
  recommended: BlogType[]
}

declare type QueryStringOptionType = {
  [P in keyof BlogOptionType]: QueryStringType
}

declare type BlogOptionListType = {
  active: keyof BlogOptionType
  blogs: BlogOptionType
}

declare type ScrollPosStateType = {
  x: number
  y: number
}


const Home: React.FunctionComponent<RouteComponentProps<{}>> = (props: RouteComponentProps<{}>) => {

  // search input ref
  const searchInputRef = React.useRef<HTMLInputElement>()
  // search input display status
  const [currentSearchInputAnimationStatus, setSearchInputAnimationStatus] = React.useState<CssPropertyAnimationType>(searchInputAnimationStatus)
  const [currentBlogOptionList, setBlogOptionList] = React.useState<BlogOptionListType>({
    active: 'recent',
    blogs: {
      recent: [],
      popular: [],
      recommended: [],
    }
  })
  const { currentRequestStatus: currentBlogsRequestStatus, sendRequest: sendBlogsRequest } = useRequest({})
  const currentScreenSize = useResponsive()
  const { auth } = useAuthContext()

  const handleSearchIconClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    searchInputRef.current.style.width = currentSearchInputAnimationStatus.width.value[+currentSearchInputAnimationStatus.isNextDisplay]
    searchInputRef.current.style.padding = currentSearchInputAnimationStatus.padding.value[+currentSearchInputAnimationStatus.isNextDisplay]
    setSearchInputAnimationStatus({
      ...currentSearchInputAnimationStatus,
      isNextDisplay: !currentSearchInputAnimationStatus.isNextDisplay
    })
  }

  const handleSelectedBlogOptionClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    e.preventDefault() // this prevents scroll y to move to top when click this?? not to top but still make it move.
    // solve above problem by adding min-height to fetched blogs item wrapper.
    const selectedOption: string = e.currentTarget.getAttribute('data-option')
    setBlogOptionList((prev: BlogOptionListType) => ({
      blogs: {
        ...prev.blogs
      },
      active: selectedOption as keyof BlogOptionType
    }))
  }

  const handleSearchKeyDownEvent: React.EventHandler<React.KeyboardEvent<HTMLInputElement>> = (e) => {
    if (e.key == 'Enter' && e.currentTarget.value !== '') {
      props.history.push('/blogs?keyword=' + e.currentTarget.value + '&tags=' + e.currentTarget.value)
    }
  }

  const queryStringOption: QueryStringOptionType = React.useMemo<QueryStringOptionType>(() => ({
    recent: {
      limit: 5,
      sort: SortEnum.DATE_ASC
    },
    popular: {
      limit: 5,
      sort: SortEnum.CLAP_ASC
    },
    recommended: {
      limit: 5,
      tags: '',
    }
  }), [])



  React.useEffect(() => {
    sendBlogsRequest({
      path: '/blogs',
      method: RequestMethodEnum.GET,
      queryString: queryStringOption[currentBlogOptionList.active],
    })
      .then((result: ResponseResultType<BlogListResponseDataType>) => {
        log('inside "then" at Home')
        if (result.status === ResponseResultStatusEnum.SUCCESS) {
          log('fetch success at Home')
          setBlogOptionList((prev: BlogOptionListType) => {
            return {
              active: currentBlogOptionList.active,
              blogs: {
                ...prev.blogs,
                [currentBlogOptionList.active]: result.data.blogs,
              }
            }
          })
        }
      })
  }, [
      currentBlogOptionList.active
    ])

  const renderBlogs: () => React.ReactNode = () => {
    const currentBlogOption: string = currentBlogOptionList.active
    return currentBlogOptionList.blogs[currentBlogOption as keyof BlogOptionType].map((blog: BlogType) => <BlogItem blog={blog} />)
  }

  return (
    <div className="home-wrapper">
      <div className="home-search-bar-wrapper">
        <input type='text' className="hidden-input" placeholder="enter keyword or tags for blog search ..." ref={searchInputRef} onKeyDown={handleSearchKeyDownEvent} role="search-input" />
        <div className="icon-wrapper" onClick={handleSearchIconClickEvent} role="search-icon">
          <GoSearch className="icon" />
        </div>
      </div>
      <div className="home-title-wrapper" role="slogan">
        <h1 className="home-slogan">Share Your Knowledge and Expand What You Can Do</h1>
      </div>
      <div className="context-wrapper">
        <div className="main-wrapper">
          <div className="home-blog-tabs-wrapper">
            <button className={"tab " + (currentBlogOptionList.active === 'recent' && 'active-tab')} onClick={handleSelectedBlogOptionClickEvent} data-option={"recent"}>Recent</button>
            <button className={"tab " + (currentBlogOptionList.active === 'popular' && 'active-tab')} onClick={handleSelectedBlogOptionClickEvent} data-option={"popular"}>Popular</button>
            {(auth.authed &&
              <button className={"tab " + (currentBlogOptionList.active === 'recommended' && 'active-tab')} onClick={handleSelectedBlogOptionClickEvent} data-option={"recommended"}>Recommended</button>
            )}
          </div>
          <div className="home-blog-list-wrapper">
            {(currentBlogsRequestStatus.status === ResponseResultStatusEnum.FETCHING &&
              <p role="fetching">fetching ... </p>
            )}
            {(currentBlogsRequestStatus.status !== ResponseResultStatusEnum.FETCHING &&
              currentBlogOptionList.blogs[currentBlogOptionList.active as keyof BlogOptionType].length === 0 &&
              <p>blogs are empty</p>
            )}
            {(currentBlogsRequestStatus.status === ResponseResultStatusEnum.FAILURE &&
              <p>blogs are not currently available</p>
            )}
            {(currentBlogsRequestStatus.status !== ResponseResultStatusEnum.FETCHING &&
              currentBlogOptionList.blogs[currentBlogOptionList.active as keyof BlogOptionType].length !== 0 &&
              renderBlogs()
            )}
          </div>
        </div>
        <div className="aside-wrapper">
          {(!auth.authed &&
            <BePartOfIt />
          )}
          {(auth.authed &&
            <ManageYourBlogs />
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Home);


