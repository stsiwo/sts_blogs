import * as React from 'react';
import './MenuWrapper.scss';
import Menu from './Menu/Menu';


const MenuWrapper: React.FunctionComponent<{}> = (props: {}) => {

    return (
      <div className="header-menu-wrapper">
        <Menu />
      </div>
    );
} 

export default MenuWrapper;
