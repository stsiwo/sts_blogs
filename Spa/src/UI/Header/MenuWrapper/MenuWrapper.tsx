import * as React from 'react';
import './MenuWrapper.scss';
import Menu from './Menu/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { StateType } from '../../../states/types';
import { toggleLoginFormActionCreator } from '../../../actions/creators';


const MenuWrapper: React.FunctionComponent<{}> = (props: {}) => {

    const isNavBarOpen = useSelector((state: StateType) => state.ui.isLoginFormOpen)
    const dispatch = useDispatch()

    const handleNavBarOutsideClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
      dispatch(toggleLoginFormActionCreator(false))
    }

    return isNavBarOpen && (
      <div className="header-menu-wrapper" onClick={handleNavBarOutsideClickEvent}>
        <Menu />
      </div>
    );
} 

export default MenuWrapper;
