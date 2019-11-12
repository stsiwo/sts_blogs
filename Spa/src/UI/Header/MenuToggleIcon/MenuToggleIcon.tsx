import * as React from 'react';
import { useDispatch } from 'react-redux';
import { toggleNavBarActionCreator } from '../../../actions/creators';
import './MenuToggleIcon.scss';


const MenuToggleIcon: React.FunctionComponent<{}> = (props: {}) => {

    const dispatch = useDispatch()

    const handleMenuToggleIconEvent: React.EventHandler<React.MouseEvent> = (e) => {
      dispatch(toggleNavBarActionCreator(true))
    }

    return (
      <i className="header-menu-toggle-icon" onClick={handleMenuToggleIconEvent}>
        <div className="">MenuToggleIcon</div> 
      </i>
    );
} 

export default MenuToggleIcon;
