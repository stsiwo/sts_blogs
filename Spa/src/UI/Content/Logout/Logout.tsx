import * as React from 'react';
import './Logout.scss';
import { Link } from 'react-router-dom';
import { toggleLoginStatusActionCreator } from '../../../actions/creators';
import { useDispatch } from 'react-redux';
import { useAuthContext } from '../../Base/Context/AuthContext/AuthContext';

const Logout: React.FunctionComponent<{}> = (props: {}) => {

  const { dispatch } = useAuthContext()
  dispatch({ 
    type: 'logout'
  })

  return (
    <div className="logout-wrapper">
      <div>successfully logout.</div>
      <Link to='/' >Home</Link>
    </div>
  );
}

export default Logout;



