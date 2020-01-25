import FetchStatus from 'Components/ApiFetch/FetchStatus';
import ImageInput from 'Components/Input/ImageInput';
import Tag from 'Components/Tag/Tag';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { BlogType, initialBlogState } from 'domain/blog/BlogType';
import { useRequest } from 'Hooks/Request/useRequest';
import { useBlogValidation } from 'Hooks/Validation/Blog/useBlogValidation';
import * as React from 'react';
import { useParams } from 'react-router';
import { BlogResponseDataType, RequestMethodEnum, ResponseResultStatusEnum, ResponseResultType } from 'requests/types';
import './UpdateBlog.scss';
import Input from 'Components/Input/Input';
import TagInput from 'Components/Input/TagInput';
import BlogContent from 'Components/BlogContent/BlogContent';
import { Node } from 'Components/fork/slate'
import { replaceTmpSrcWithPublicSrc } from 'Components/BlogContent/helpers';
import { generateFileWithUuidv4 } from 'src/utils';
import EditBlog from 'Components/EditBlog/EditBlog';
var debug = require('debug')('ui:UpdateBlog')

const UpdateBlog: React.FunctionComponent<{}> = (props: {}) => {

  const { blogId } = useParams()
  const [currentBlog, setBlog] = React.useState<BlogType>(initialBlogState)
  const { currentRequestStatus: currentBlogFetchStatus, setRequestStatus: setBlogFetchStatus, sendRequest: fetchBlog } = useRequest({})

  React.useEffect(() => {
    debug('initial fetch at useEffect')
    fetchBlog({
      path: '/blogs/' + blogId,
      method: RequestMethodEnum.GET
    })
      // call from previous 'catch' and 'then' of 'fetchBlog'
      // since resolve promise in the 'catch'
      .then((result: ResponseResultType<BlogResponseDataType>) => {
        debug('then func of fetchBlog func')
        if (result.status === ResponseResultStatusEnum.SUCCESS) {
          setBlog(result.data.blog)
        }
      })
  }, []);

  if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FETCHING) return (<p>fetching your data</p>)

  if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FAILURE) return (<p>sorry.. your data is not available now</p>)

  return (currentBlogFetchStatus.status === ResponseResultStatusEnum.SUCCESS &&
    <EditBlog
      blogId={blogId}
      currentBlog={currentBlog}
      setBlog={setBlog}
      currentBlogFetchStatus={currentBlogFetchStatus}
      setBlogFetchStatus={setBlogFetchStatus}
    />
  );

}

export default UpdateBlog;







