import { BlogType, initialBlogState } from 'domain/blog/BlogType';
import { TagType } from 'domain/tag/TagType';
import * as React from 'react';
import { useParams } from 'react-router';
import { BlogResponseDataType, RequestMethodEnum, ResponseResultStatusEnum, ResponseResultType } from 'requests/types';
import Tag from 'Components/Tag/Tag';
import { useRequest } from 'Hooks/Request/useRequest';
import './Blog.scss';
import { getBlogTestData } from '../../../../tests/data/BlogFaker';
import { dateFormatOption } from 'src/utils';
import { useResponsive } from 'Hooks/Responsive/useResponsive';
import { ScreenSizeStatusType } from 'Hooks/Responsive/types';
import { FaBookmark, FaThumbsUp } from 'react-icons/fa';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import BePartOfIt from 'Components/BePartOfIt/BePartOfIt';
import ManageYourBlogs from 'Components/ManageYourBlogs/ManageYourBlogs';
import BlogContent from 'Components/BlogContent/BlogContent';
import ReadOnlyBlogContent from 'Components/ReadOnlyBlogContent/ReadOnlyBlogContent';
const mainImage = require('../../../../tests/data/images/colorful-1280x1280.jpg');
const avatarImage = require('../../../../tests/data/images/coffe-4289545_640.jpg');
const redImage = require('../../../../tests/data/images/red-girl-1920x1279.jpg');
const whiteImage = require('../../../../tests/data/images/white-1920x1280.jpg');


const Blog: React.FunctionComponent<{}> = (props: {}) => {

  let { blogId } = useParams()

  const [currentBlog, setBlog] = React.useState<BlogType>(initialBlogState)
  const { currentRequestStatus: currentBlogFetchStatus, setRequestStatus: setBlogFetchStatus, sendRequest: fetchBlog } = useRequest({})
  const currentScreenSize: ScreenSizeStatusType = useResponsive()
  const { auth } = useAuthContext()

  React.useEffect(() => {
    fetchBlog({
      path: '/blogs/' + blogId,
      method: RequestMethodEnum.GET
    })
      // call from previous 'catch' and 'then' of 'fetchBlog'
      // since resolve promise in the 'catch'
      .then((result: ResponseResultType<BlogResponseDataType>) => {
        if (result.status === ResponseResultStatusEnum.SUCCESS) setBlog(result.data.blog)
      })
  }, []);

  const renderTitleSubTitle: () => React.ReactNode = () => {
    return (
      <>
        <h1 className="blog-title" role='blog-title'>{currentBlog.title}</h1>
        <h2 className="blog-subtitle" role='blog-subtitle'>{currentBlog.subtitle}</h2>
      </>
    );
  }

  if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FETCHING) return (<p>fetching your data</p>)

  if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FAILURE) return (<p>sorry.. requested blog is not available now</p>)

  return (currentBlogFetchStatus.status === ResponseResultStatusEnum.SUCCESS &&
    <div className="context-wrapper">
      <div className="main-wrapper">
        <div className="blog-wrapper">
          {(!currentScreenSize.isMobileL && !currentBlog.mainImageUrl &&
            renderTitleSubTitle()
          )}
          {(!currentScreenSize.isMobileL && currentBlog.mainImageUrl &&
            <div className="title-subtitle-wrapper" style={{
              backgroundImage: `url('${currentBlog.mainImageUrl}')`,
            }}>
              <div className="title-subtitle-content">
                {renderTitleSubTitle()}
              </div>
            </div>
          )}
          {(currentScreenSize.isMobileL &&
            <>
              <img src={currentBlog.mainImageUrl} className="blog-main-img" />
              {renderTitleSubTitle()}
            </>
          )}
          <div className="blog-author-wrapper">
            <img src={currentBlog.author ? currentBlog.author.avatarUrl : ""} className="blog-author-avatar" />
            <h3 className="blog-author-name">author name</h3>
            <p className="blog-date">{currentBlog.createdDate.toLocaleDateString("en-US", dateFormatOption)}</p>
          </div>
          <div className="blog-content-wrapper" role='blog-content'>
            <ReadOnlyBlogContent 
              value={currentBlog.content}
            />
          </div>
          <div className="clap-bookmark-wrapper">
            <div className="icon-wrapper">
              <FaBookmark className="icon" />
            </div>
            <div className="icon-wrapper">
              <FaThumbsUp className="icon" />
            </div>
          </div>
          <div className="related-blog-list">
          </div>
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
  );
}

export default Blog;





