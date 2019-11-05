import * as React from 'react';
import { useCssGlobalContext } from '../Base/Context/CssGlobalContext/CssGlobalContext';
import { useResponsiveComponent } from '../Base/Hooks/ResponsiveComponentHook';
import './Header.scss';
import MenuToggleIcon from './MenuToggleIcon/MenuToggleIcon';
import Menu from './MenuWrapper/Menu/Menu';
import MenuWrapper from './MenuWrapper/MenuWrapper';
import SignupForm from './Modal/SignupForm/SignupForm';
import LoginForm from './Modal/LoginForm/LoginForm';


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
