import * as React from 'react';
import { useCssGlobalContext } from 'uiBaseContext/CssGlobalContext/CssGlobalContext';
import { useResponsiveComponent } from 'uiBaseHook/ResponsiveComponentHook';
import './Header.scss';
import MenuToggleIcon from './MenuToggleIcon/MenuToggleIcon';
import Menu from './MenuWrapper/Menu/Menu';
import MenuWrapper from './MenuWrapper/MenuWrapper';


const Header: React.FunctionComponent<{}> = (props: {}) => {

  const currentScreenWidth = useResponsiveComponent();
  const cssGlobal = useCssGlobalContext();

  const renderMenuSidebar = () => {
    return (
      <React.Fragment>
        <MenuToggleIcon />
        <MenuWrapper />
      </React.Fragment>
    );
  }

  const renderHorizontalMenu = () => {
    return (
      <Menu />
    );
  }

  return (
    <header className="header-wrapper">
      <h1 className="header-title">title</h1>
      {(currentScreenWidth < cssGlobal.laptopSize && renderMenuSidebar())}
      {(currentScreenWidth >= cssGlobal.laptopSize && renderHorizontalMenu())}
    </header>
  );
}

export default Header;
