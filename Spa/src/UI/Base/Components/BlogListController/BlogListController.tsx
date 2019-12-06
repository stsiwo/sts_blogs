import * as React from 'react';
import './BlogListController.scss';
import { BlogListControllerPropType } from './types';
import { useResponsive } from 'Hooks/Responsive/useResponsive';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
import { ResponseResultStatusEnum } from 'requests/types';
import { MdRefresh, MdCancel, MdSettings } from 'react-icons/md';
import PageLimitSelect from 'Components/Pagination/PageLimitSelect';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { AiOutlineFileAdd } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

const BlogListController: React.FunctionComponent<BlogListControllerPropType> = (props: BlogListControllerPropType) => {

  const currentScreenSize = useResponsive()
  const { auth } = useAuthContext()
  const { url, path } = useRouteMatch()

  return (
    <div className="blog-list-controller-wrapper">
      <FetchStatus
        currentFetchStatus={props.currentFetchStatus}
        setFetchStatus={props.setFetchStatus}
      />
      <div className="icon-wrapper-row blog-list-controller-refresh">
        {(props.currentFetchStatus.status !== ResponseResultStatusEnum.FETCHING &&
          <div className="icon-wrapper" onClick={props.handleRefreshClickEvent} role="refresh-icon">
            <MdRefresh className="icon" />
          </div>
        )}
        {(props.currentFetchStatus.status === ResponseResultStatusEnum.FETCHING &&
          <div className="icon-wrapper" onClick={props.handleCancelClickEvent}>
            <MdCancel className="icon" />
          </div>
        )}
      </div>
      {(currentScreenSize.isLTETablet &&
        <div className="icon-wrapper-row">
          <div className="icon-wrapper" onClick={props.handleFilterSortNavClickEvent}>
            <MdSettings className="icon" />
          </div>
        </div>
      )}
      {(auth.authed &&
        <Link to={`${url}/new`} className="aside-new-blog-link" role='new-blog-link'>
          <div className="icon-wrapper-row">
            <div className="icon-wrapper">
              <AiOutlineFileAdd className="icon" />
            </div>
          </div>
        </Link>
      )}
      <PageLimitSelect
        currentPaginationStatus={props.currentPaginationStatus}
        setPaginationStatus={props.setPaginationStatus}
      />
    </div>
  );
}

export default BlogListController;








