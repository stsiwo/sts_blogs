import * as React from 'react';
import './Setting.scss';
import { useResponsiveComponent } from '../../Base/Hooks/ResponsiveComponentHook';
import { useCssGlobalContext } from '../../Base/Context/CssGlobalContext/CssGlobalContext';
import { Link, Route } from 'react-router-dom';
import Profile from './Profile/Profile';
import { SettingContentComponents } from './SettingContentComponents';


const Setting: React.FunctionComponent<{}> = (props: {}) => {

  const [currentSettingContent, setSettingContent] = React.useState("Profile");

  const renderSettingContent: (componentName: string) => React.ReactNode = (componentName) => {
    const ComponentName: React.ComponentType = SettingContentComponents[componentName];
    return <ComponentName />;
  }

  const handleSettingListClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
    const selectedSettingItem: string = e.currentTarget.innerHTML;
    setSettingContent(selectedSettingItem);
  }

  return (
    <div className="setting-wrapper">
      <aside className="setting-list-wrapper">
        <ul className="setting-list-ul">
          <li className="setting-list-li" onClick={handleSettingListClick} >
            Profile
          </li>
          <li className="setting-list-li" onClick={handleSettingListClick} >
            Profile
          </li>
          <li className="setting-list-li" onClick={handleSettingListClick} >
            Profile
          </li>
          <li className="setting-list-li" onClick={handleSettingListClick} >
            Profile
          </li>
          <li className="setting-list-li" onClick={handleSettingListClick} >
            Profile
          </li>
          <li className="setting-list-li" onClick={handleSettingListClick} >
            Profile
          </li>
          <li className="setting-list-li" onClick={handleSettingListClick} >
            Profile
          </li>
          <li className="setting-list-li" onClick={handleSettingListClick} >
            Profile
          </li>
          <li className="setting-list-li" onClick={handleSettingListClick} >
            Profile
          </li>
        </ul>
      </aside>
      <article className="setting-content">
        {renderSettingContent(currentSettingContent)}
      </article>
    </div>
  );
}

export default Setting;

