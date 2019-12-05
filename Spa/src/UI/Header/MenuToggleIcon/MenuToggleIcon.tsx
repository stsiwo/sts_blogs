import * as React from 'react';
import { useDispatch } from 'react-redux';
import { toggleNavBarActionCreator } from 'actions/creators';
import './MenuToggleIcon.scss';
import { MdMenu } from 'react-icons/md'


const MenuToggleIcon: React.FunctionComponent<{}> = (props: {}) => {

    const dispatch = useDispatch()

    const handleMenuToggleIconEvent: React.EventHandler<React.MouseEvent> = (e) => {
      dispatch(toggleNavBarActionCreator(true))
    }

    return (
      <i className="icon-wrapper header-menu-toggle-icon" onClick={handleMenuToggleIconEvent} role="menu-toggle-icon">
        <MdMenu className="icon"/>
      </i>
    );
} 

export default MenuToggleIcon;
