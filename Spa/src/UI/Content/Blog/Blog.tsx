import * as React from 'react';
import './Blog.scss';
import { useParams } from 'react-router';

const Blog: React.FunctionComponent<{}> = (props: {}) => {

  let { id } = useParams()

  return (
    <div className="blog-wrapper">
      <h1>{id}</h1>
    </div>
    );
  }
  
  export default Blog;
  
  
  
  
  
