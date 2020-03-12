import * as React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthRoute } from 'Components/AuthRoute';
const BlogManagement = React.lazy(() => import(/* webpackChunkName: "blogManagement" */"./BlogManagement/BlogManagement"));
const NewBlog = React.lazy(() => import(/* webpackChunkName: "newBlog" */"./BlogManagement/NewBlog/NewBlog"));
const UpdateBlog = React.lazy(() => import(/* webpackChunkName: "updateBlog" */"./BlogManagement/UpdateBlog/UpdateBlog"));
const Profile = React.lazy(() => import(/* webpackChunkName: "profile" */"./Profile/Profile"));
import './Setting.scss';
import { logger } from 'configs/logger';
const log = logger("Setting");

declare type SettingNavItemType = {
  name: string
  label: string
}


const Setting: React.FunctionComponent<{}> = (props: {}) => {

  const settingNavList: SettingNavItemType[] = [
    {
      name: 'profile',
      label: 'Profile'
    },
    {
      name: 'blogs',
      label: 'Blog Management'
    },
  ]

  const renderSettingContentList = (): React.ReactNode => {
    return settingNavList.map((settingItem: SettingNavItemType) => {
      return (
        <li className="setting-list-li" key={settingItem.name}>
          <Link to={`${url}/${settingItem.name}`} className="link" role={`${settingItem.name}-link`}>
            {settingItem.label}
          </Link>
        </li>
      )
    })
  }

  let { path, url } = useRouteMatch();

  log(path)

  return (
    <div className="setting-wrapper">
      <aside className="setting-list-wrapper">
        <ul className="setting-list-ul">
          {renderSettingContentList()}
        </ul>
      </aside>
      <article className="setting-content">
        {/** update for PrivateAuthRoute for authenticated user to access **/}
        <AuthRoute exact path={`${path}/profile`} component={Profile} />
        <AuthRoute exact path={`${path}/blogs`} component={BlogManagement} />
        <AuthRoute exact path={`${path}/blogs/new`} component={NewBlog} />
        <AuthRoute exact path={`${path}/blogs/update/:blogId`} component={UpdateBlog} />
      </article>
    </div>
  );
}

export default Setting;

