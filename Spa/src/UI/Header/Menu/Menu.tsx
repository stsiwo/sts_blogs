import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { StateType } from 'states/types';
import './Menu.scss';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { toggleNavBarActionCreator } from 'actions/creators';
import { MdClose } from 'react-icons/md'
import { useCssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import { useResponsive } from 'Hooks/Responsive/useResponsive';


const Menu: React.FunctionComponent<{}> = (props: {}) => {

  const isNavBarOpen = useSelector((state: StateType) => state.ui.isNavBarOpen)
  const dispatch = useDispatch()
  const ulRef = React.useRef<HTMLUListElement>()
  const currentScreenSize = useResponsive()

  const { auth, authDispatch } = useAuthContext()
  //const aniProps = useSpring({ width: isNavBarOpen ? currentScreenWidth + 'px' : '0px' })

  const handleCloseNavBarClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    dispatch(toggleNavBarActionCreator(false))
  }

  React.useEffect(() => {
    if (currentScreenSize.isLTELaptop && ulRef.current.style) {
      ulRef.current.style.width = isNavBarOpen ? '100%' : '0px'
    }
  })

  const handleLogoutClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    console.log("logout clicked")
     authDispatch({
       type: 'logout'
     })
  }

  return (
    <ul className="header-menu-ul" ref={ulRef}>
      {(currentScreenSize.isLTELaptop &&
        <div className="header-menu-close-icon-row">
          <div className="icon-wrapper" onClick={handleCloseNavBarClickEvent}>
            <MdClose className="icon header-menu-close-icon" />
          </div>
        </div>
      )}
      <li className="header-menu-li">
        <Link className="header-menu-li-link" to="/blogs" >Blogs</Link>
      </li>
      {auth.authed &&
        <>
          <li className="header-menu-li">
            <Link className="header-menu-li-link" to="/setting/profile" >Account</Link>
          </li>
          <li className="header-menu-li">
            <Link className="header-menu-li-link" to="/" onClick={handleLogoutClickEvent}>Logout</Link>
          </li>
        </>
      }
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
