import * as React from 'react';
import { useCssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import { useResponsiveComponent } from 'Hooks/ResponsiveComponentHook';
import './Header.scss';
import MenuToggleIcon from './MenuToggleIcon/MenuToggleIcon';
import Menu from './Menu/Menu';


const Header: React.FunctionComponent<{}> = (props: {}) => {

  const currentScreenWidth = useResponsiveComponent();
  const cssGlobal = useCssGlobalContext();

  const renderMenuSidebar = () => {
    return (
      <React.Fragment>
        <MenuToggleIcon />
        <Menu />
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
