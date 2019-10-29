import * as React from 'react';
import './Blog.scss';
import { useParams } from 'react-router';
import { BlogType } from '../../../domain/blog/BlogType';
import { getBlogTestData } from '../../../../tests/data/BlogFaker';
import { TagType } from '../../../domain/tag/TagType';
import { getTagTestData } from '../../../../tests/data/TagFaker';

const Blog: React.FunctionComponent<{}> = (props: {}) => {

  let { id } = useParams()

  const testBlog: BlogType = getBlogTestData(1)[0]

  const testTags: TagType[] = getTagTestData(20)

  const renderTags = (tagList: TagType[]): React.ReactNode => {
    return tagList.map((tag: TagType) => <div className="tag-icon" key={tag.id}>{tag.name}</div>)
  }

  return (
    <div className="blog-wrapper">
      <h1 className="blog-title">{testBlog.title}</h1>
      <h2 className="blog-subtitle">{testBlog.subTitle}</h2>
      <div className="blog-tags-wrapper">
        {renderTags(testTags)}
      </div>
      <div className="blog-author-wrapper">
        <img src="" alt="author avatar" className="blog-author-avatar"/>
        <h3 className="blog-author-name">author name</h3>
      </div>
      <div className="blog-content-wrapper">
        {testBlog.content}
      </div>
    </div>
    );
  }
  
  export default Blog;
  
  
  
  
  
