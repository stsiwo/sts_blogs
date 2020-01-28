import * as React from 'react';
import './NewBlog.scss';
import { getUuidv4 } from 'src/utils';
import EditBlog from 'Components/EditBlog/EditBlog';
import { BlogType, initialBlogState } from 'domain/blog/BlogType';
var debug = require('debug')('ui:NewBlog')

const NewBlog: React.FunctionComponent<{}> = (props: {}) => {

  const blogId = getUuidv4()
  const [currentBlog, setBlog] = React.useState<BlogType>(initialBlogState)

  return (
    <EditBlog
      context={"New"}
      blogId={blogId} 
      currentBlog={currentBlog}
      setBlog={setBlog}
    />
  );
}

export default NewBlog;







