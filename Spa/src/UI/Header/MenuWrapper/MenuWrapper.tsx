import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNavBarActionCreator } from 'actions/creators';
import { StateType } from 'states/types';
import Menu from './Menu/Menu';
import './MenuWrapper.scss';


const MenuWrapper: React.FunctionComponent<{}> = (props: {}) => {

    const isNavBarOpen = useSelector((state: StateType) => state.ui.isNavBarOpen)
    const dispatch = useDispatch()

    const handleNavBarOutsideClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
      dispatch(toggleNavBarActionCreator(false))
    }

    return isNavBarOpen && (
      <div className="header-menu-wrapper" onClick={handleNavBarOutsideClickEvent}>
        <Menu />
      </div>
    );
} 

export default MenuWrapper;
