import * as React from 'react';
import './ManageYourBlogs.scss';
import { ManageYourBlogsPropType } from './types';
import { Link } from 'react-router-dom';

const ManageYourBlogs: React.FunctionComponent<ManageYourBlogsPropType> = (props: ManageYourBlogsPropType) => {

  return (
    <div className="be-part-of-it-wrapper">
      <h2 className="be-part-of-it-title">Manage Your Blogs</h2>
      <p className="be-part-of-it-desc">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      <Link to="/signup" className="link">
        <button className="btn">Explore</button>
      </Link>
    </div>
  );
}

export default ManageYourBlogs;








