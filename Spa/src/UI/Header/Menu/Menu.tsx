import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { StateType } from 'states/types';
import './Menu.scss';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { toggleNavBarActionCreator } from 'actions/creators';
import { MdClose } from 'react-icons/md'
import { useResponsiveComponent } from 'Hooks/ResponsiveComponentHook';
import { useCssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';


const Menu: React.FunctionComponent<{}> = (props: {}) => {

  const isNavBarOpen = useSelector((state: StateType) => state.ui.isNavBarOpen)
  const dispatch = useDispatch()
  const currentScreenWidth = useResponsiveComponent()
  const cssGlobal = useCssGlobalContext()
  const ulRef = React.useRef<HTMLUListElement>()

  const { auth } = useAuthContext()
  //const aniProps = useSpring({ width: isNavBarOpen ? currentScreenWidth + 'px' : '0px' })

  const handleCloseNavBarClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    dispatch(toggleNavBarActionCreator(false))
  }

  React.useEffect(() => {
    if (currentScreenWidth < cssGlobal.laptopSize && ulRef.current.style) {
      ulRef.current.style.width = isNavBarOpen ? '100%' : '0px'
    }
  })

  return (
    <ul className="header-menu-ul" ref={ulRef}>
      {(currentScreenWidth < cssGlobal.laptopSize &&
        <div className="header-menu-close-icon-row">
          <div className="icon-wrapper" onClick={handleCloseNavBarClickEvent}>
            <MdClose className="icon header-menu-close-icon" />
          </div>
        </div>
      )}
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
      {auth.authed &&
        <li className="header-menu-li">
          <Link className="header-menu-li-link" to="/logout" >Logout</Link>
        </li>}
      {!auth.authed &&
        <React.Fragment>
          <li className="header-menu-li">
            <Link className="header-menu-li-link" to="/signup" >Signup</Link>
          </li>
          <li className="header-menu-li">
            <Link className="header-menu-li-link" to="/login" >Login</Link>
          </li>
        </React.Fragment>
      }
    </ul>
  );
}

export default Menu;
