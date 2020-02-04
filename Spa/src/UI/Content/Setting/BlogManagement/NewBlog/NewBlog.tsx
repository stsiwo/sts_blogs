import * as React from 'react';
import './NewBlog.scss';
import { getUuidv4 } from 'src/utils';
import EditBlog from 'Components/EditBlog/EditBlog';
import { BlogType, initialBlogState } from 'domain/blog/BlogType';
var debug = require('debug')('ui:NewBlog')

const NewBlog: React.FunctionComponent<{}> = (props: {}) => {

  const [currentBlog, setBlog] = React.useState<BlogType>(initialBlogState)

  if (!currentBlog.id) {
    setBlog((prev: BlogType) => ({
      ...prev,
      id: getUuidv4()
    }))
  }

  return (
    <EditBlog
      context={"New"}
      blogId={currentBlog.id} 
      currentBlog={currentBlog}
      setBlog={setBlog}
      isInitialGetFetchDone={true}
    />
  );
}

export default NewBlog;







