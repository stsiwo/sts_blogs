import * as React from 'react';
import './BlogItem.scss';
import { BlogItemPropType } from './types';
import { useResponsive } from 'Hooks/Responsive/useResponsive';
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
const whiteAvatar = require('../../../../../tests/data/images/white-1920x1280.jpg');
const redImage = require('../../../../../tests/data/images/red-girl-1920x1279.jpg');

const BlogItem: React.FunctionComponent<BlogItemPropType> = (props: BlogItemPropType) => {

  const currentScreenSize = useResponsive()

  return (
    <div className="blog-list-item-wrapper">
      <img className="blog-list-item-img" src={redImage} alt="blog item" width="150px" height="100px" />
      <div className="blog-list-item-desc">
        <h2 className="blog-list-item-desc-title">sample title might be a little bit longer</h2>
        {(!currentScreenSize.isMobileL &&
          <h3 className="blog-list-item-desc-subtitle">sample subtitle might be longer than blog title so might need to concatinate it</h3>)}
        <div className="blog-list-item-desc-detail">
          <p className="blog-list-item-desc-detail-main-tag">main tag</p>
          <p className="blog-list-item-desc-detail-date">blog date</p>
        </div>
        <div className="blog-list-item-desc-author">
          <img src={whiteAvatar} alt="avatar image" className="blog-list-item-desc-author-img" />
          <p className="blog-list-item-desc-author-name">author name</p>
        </div>
        <div className="blog-item-controller-overlay" >
          <div className="blog-item-controller-content" >
            <Link to={`./update/${1}`} className="link" role='blog-edit-link'>
              <div className="white-icon-wrapper">
                <FaEdit className="icon" />
              </div>
            </Link>
            <div className="white-icon-wrapper">
              <MdDeleteForever className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;







