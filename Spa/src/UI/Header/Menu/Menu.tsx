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
import { useRequest } from 'Hooks/Request/useRequest';
import { RequestMethodEnum } from 'requests/types';
import { withRouter, RouteComponentProps } from 'react-router-dom';


const Menu: React.FunctionComponent<RouteComponentProps<{}>> = (props: RouteComponentProps<{}>) => {

  const isNavBarOpen = useSelector((state: StateType) => state.ui.isNavBarOpen)
  const dispatch = useDispatch()
  const ulRef = React.useRef<HTMLUListElement>()
  const currentScreenSize = useResponsive()
  const { currentRequestStatus: currentLogoutRequestStatus, setRequestStatus: setLogoutRequestStatus, sendRequest: sendLogoutRequest } = useRequest({})

  const { auth, authDispatch } = useAuthContext()
  //const aniProps = useSpring({ width: isNavBarOpen ? currentScreenWidth + 'px' : '0px' })

  const handleCloseNavBarClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    dispatch(toggleNavBarActionCreator(false))
  }

  React.useEffect(() => {
    if (currentScreenSize.isLTELaptop && ulRef.current.style) {
      ulRef.current.style.width = isNavBarOpen ? '100%' : '0px'
    }
  })

  const handleLogoutClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    handleCloseNavBarClickEvent(e)

    sendLogoutRequest({
      path: '/token/remove',
      method: RequestMethodEnum.POST,
    })
      .then((data: any) => {
        // this 'then' block is called only when request success
        if (data) {
          console.log('logout request success')
          authDispatch({
            type: 'logout',
          })
          console.log('before redirect to home')
          props.history.push('/')
        }
      })
  }

  return (
    <ul className="header-menu-ul" ref={ulRef} role="menu">
      {(currentScreenSize.isLTELaptop &&
        <div className="header-menu-close-icon-row" >
          <div className="icon-wrapper" onClick={handleCloseNavBarClickEvent} role="menu-close-icon">
            <MdClose className="icon header-menu-close-icon" />
          </div>
        </div>
      )}
      <li className="header-menu-li">
        <Link className="header-menu-li-link" to="/blogs" onClick={handleCloseNavBarClickEvent} >Blogs</Link>
      </li>
      {auth.authed &&
        <>
          <li className="header-menu-li">
            <Link className="header-menu-li-link" to="/setting/profile" onClick={handleCloseNavBarClickEvent}>Account</Link>
          </li>
          <li className="header-menu-li">
            <Link className="header-menu-li-link" to="/" onClick={handleLogoutClickEvent}>Logout</Link>
          </li>
        </>
      }
      {!auth.authed &&
        <React.Fragment>
          <li className="header-menu-li">
            <Link className="header-menu-li-link" to="/signup" onClick={handleCloseNavBarClickEvent}>Signup</Link>
          </li>
          <li className="header-menu-li">
            <Link className="header-menu-li-link" to="/login" onClick={handleCloseNavBarClickEvent}>Login</Link>
          </li>
        </React.Fragment>
      }
    </ul>
  );
}

export default withRouter(Menu);
