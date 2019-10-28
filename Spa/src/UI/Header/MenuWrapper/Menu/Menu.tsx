import * as React from 'react';
import './Menu.scss';
import { Link } from 'react-router-dom';
import MenuCloseIcon from './MenuCloseIcon/MenuCloseIcon';
import { useSelector } from 'react-redux';
import { StateType } from '../../../../states/types';


const Menu: React.FunctionComponent<{}> = (props: {}) => {

  const isNavBarOpen = useSelector((state: StateType) => state.ui.isNavBarOpen)
  const handleStopPropagationClickEvent: React.EventHandler<React.MouseEvent<HTMLUListElement>> = (e) => {
    e.stopPropagation()
  }

  const isLogin = useSelector((state: StateType) => state.app.isLogin)

  return isNavBarOpen && (
    <ul className="header-menu-ul" onClick={handleStopPropagationClickEvent}>
      <MenuCloseIcon />
      <li className="header-menu-li">
        <Link className="header-menu-li-link" to="./" >item1</Link>
      </li>
      <li className="header-menu-li">
        <Link className="header-menu-li-link" to="./" >item2</Link>
      </li>
      <li className="header-menu-li">
        <Link className="header-menu-li-link" to="./" >item3</Link>
      </li>
      <li className="header-menu-li">
        <Link className="header-menu-li-link" to="./" >item4</Link>
      </li>
      {isLogin &&
        <li className="header-menu-li">
          <Link className="header-menu-li-link" to="./logout" >Logout</Link>
        </li>}
      {!isLogin &&
        <React.Fragment>
          <li className="header-menu-li">
            <Link className="header-menu-li-link" to="./signup" >Signup</Link>
          </li>
          <li className="header-menu-li">
            <Link className="header-menu-li-link" to="./login" >Login</Link>
          </li>
        </React.Fragment>
      }
    </ul>
  );
}

export default Menu;
