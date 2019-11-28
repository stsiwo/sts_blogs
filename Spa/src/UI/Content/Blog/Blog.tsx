import { BlogType, initialBlogState } from 'domain/blog/BlogType';
import { TagType } from 'domain/tag/TagType';
import * as React from 'react';
import { useParams } from 'react-router';
import { BlogResponseDataType, RequestMethodEnum, ResponseResultStatusEnum } from 'requests/types';
import Tag from 'Components/Tag/Tag';
import { useRequest } from 'Hooks/Request/useRequest';
import './Blog.scss';

const Blog: React.FunctionComponent<{}> = (props: {}) => {

  let { blogId } = useParams()

  const [currentBlog, setBlog] = React.useState<BlogType>(initialBlogState)
  const { currentRequestStatus: currentBlogFetchStatus, setRequestStatus: setBlogFetchStatus, sendRequest: fetchBlog } = useRequest({})

  React.useEffect(() => {
    fetchBlog({
      path: '/blogs/' + blogId,
      method: RequestMethodEnum.GET
    })
      // call from previous 'catch' and 'then' of 'fetchBlog'
      // since resolve promise in the 'catch'
      .then((data: BlogResponseDataType) => {
        if (data) setBlog(data.blog)
      })
  }, []);

  const renderCurrentTags = () => {
    return Array.from(currentBlog.tags).map((tag: string) => {
      return (
        <Tag name={tag} key={tag} />
      )
    })
  }

  if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FETCHING) return (<p>fetching your data</p>)

  if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FAILURE) return (<p>sorry.. requested blog is not available now</p>)

  return (currentBlogFetchStatus.status === ResponseResultStatusEnum.SUCCESS &&
    <div className="blog-wrapper">
      <h1 className="blog-title" role='blog-title'>{currentBlog.title}</h1>
      <h2 className="blog-subtitle" role='blog-subtitle'>{currentBlog.subtitle}</h2>
      <div className="blog-tags-wrapper">
        {renderCurrentTags()}
      </div>
      <div className="blog-author-wrapper">
        <img src="" alt="author avatar" className="blog-author-avatar" />
        <h3 className="blog-author-name">author name</h3>
      </div>
      <div className="blog-content-wrapper" role='blog-content'>
        {currentBlog.content}
      </div>
    </div>
  );
}

export default Blog;





