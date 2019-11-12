import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from 'uiBaseContext/AuthContext/AuthContext';
import './Logout.scss';

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



