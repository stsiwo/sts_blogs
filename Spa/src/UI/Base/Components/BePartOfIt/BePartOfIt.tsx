import * as React from 'react';
import './BePartOfIt.scss';
import { BePartOfItPropType } from './types';
import { Link } from 'react-router-dom';

const BePartOfIt: React.FunctionComponent<BePartOfItPropType> = (props: BePartOfItPropType) => {

  return (
    <div className="be-part-of-it-wrapper">
      <h2 className="be-part-of-it-title">Be Part of It</h2>
      <p className="be-part-of-it-desc">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      <Link to="/signup" className="link">
        <button className="btn" role="join-link">Join</button>
      </Link>
    </div>
  );
}

export default BePartOfIt;








