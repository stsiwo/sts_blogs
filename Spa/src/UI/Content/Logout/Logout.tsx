import * as React from 'react';
import './Logout.scss';
import { removeUserInfo } from '../../../storages/user';
import { Link } from 'react-router-dom';
import { toggleLoginStatusActionCreator } from '../../../actions/creators';
import { useDispatch } from 'react-redux';

const Logout: React.FunctionComponent<{}> = (props: {}) => {

  // remove user info from storage; which means user logout
  removeUserInfo()

  // also update redux store to update all component to match user logged out
  const dispatch = useDispatch()
  dispatch(toggleLoginStatusActionCreator(false))
  

  return (
    <div className="logout-wrapper">
      <div>successfully logout.</div>
      <Link to='/' >Home</Link>
    </div>
  );
}

export default Logout;



