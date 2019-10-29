import * as React from 'react';
import './Setting.scss';
import { useResponsiveComponent } from '../../Base/Hooks/ResponsiveComponentHook';
import { useCssGlobalContext } from '../../Base/Context/CssGlobalContext/CssGlobalContext';
import { Link, Route } from 'react-router-dom';
import Profile from './Profile/Profile';
import { SettingContentComponents, SettingContentComponentsType } from './SettingContentComponents';


const Setting: React.FunctionComponent<{}> = (props: {}) => {

  const [currentSettingContent, setSettingContent] = React.useState("Profile");

  const renderSettingContent: (componentName: string) => React.ReactNode = (componentName) => {
    const ComponentName: React.ComponentType = SettingContentComponents.find((settingContentComponent: SettingContentComponentsType) => settingContentComponent.label.localeCompare(componentName) === 0).component
    return <ComponentName />;
  }

  const handleSettingListClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
    const selectedSettingItem: string = e.currentTarget.innerHTML;
    setSettingContent(selectedSettingItem);
  }

  const renderSettingContentList = (): React.ReactNode => {
    return SettingContentComponents.map((settingContentComponent: SettingContentComponentsType) => {
      return (
          <li className="setting-list-li" onClick={handleSettingListClick} key={settingContentComponent.label}>
            {settingContentComponent.label}
          </li>
      )
    })
  }

  return (
    <div className="setting-wrapper">
      <aside className="setting-list-wrapper">
        <ul className="setting-list-ul">
          {renderSettingContentList()}
        </ul>
      </aside>
      <article className="setting-content">
        {renderSettingContent(currentSettingContent)}
      </article>
    </div>
  );
}

export default Setting;

