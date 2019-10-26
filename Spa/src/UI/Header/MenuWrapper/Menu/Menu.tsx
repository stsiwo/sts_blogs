import * as React from 'react';
import './Menu.scss';
import { Link } from 'react-router-dom';


const Menu: React.FunctionComponent<{}> = (props: {}) => {

  return (
    <ul className="header-menu-ul">
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
    </ul>
  );
}

export default Menu;
