import * as React from 'react';
import { useCssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import './Header.scss';
import MenuToggleIcon from './MenuToggleIcon/MenuToggleIcon';
import Menu from './Menu/Menu';
import { useResponsive } from 'Hooks/Responsive/useResponsive';
import { Link } from 'react-router-dom';


const Header: React.FunctionComponent<{}> = (props: {}) => {

  const currentScreenSize = useResponsive()

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
      <Link to="/" className="black-link" role="title-link">
        <h1 className="header-title">STS</h1>
      </Link>
      {(currentScreenSize.isLTELaptop && renderMenuSidebar())}
      {(!currentScreenSize.isLTELaptop && renderHorizontalMenu())}
    </header>
  );
}

export default Header;
