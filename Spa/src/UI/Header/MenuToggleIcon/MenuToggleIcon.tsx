import * as React from 'react';
import './MenuToggleIcon.scss';
import { useResponsiveComponent } from '../../Base/Hooks/ResponsiveComponentHook';


const MenuToggleIcon: React.FunctionComponent<{}> = (props: {}) => {

    return (
      <i className="header-menu-toggle-icon">
        <div className="">MenuToggleIcon</div> 
      </i>
    );
} 

export default MenuToggleIcon;
