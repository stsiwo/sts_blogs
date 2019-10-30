import * as React from 'react';
import './BlogManagement.scss';
import { BlogType } from '../../../../domain/blog/BlogType';
import { getBlogTestData } from '../../../../../tests/data/BlogFaker';
import { dateFormatOption } from '../../../../utils';
import Icon from '../../../Base/Components/Icon/Icon';


const BlogManagement: React.FunctionComponent<{}> = (props: {}) => {

  const controllerRefs: Map<string, HTMLDivElement> = new Map()

  const handleBlogControllerOpenClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    controllerRefs.get(e.currentTarget.id).style.display = 'flex';
  }

  const handleBlogControllerCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    controllerRefs.get(e.currentTarget.id).style.display = 'none';
  }

  const setControllerRef = (element: HTMLDivElement) => {
    controllerRefs.set(element.id, element)
  }

  const renderBlogs = (blogs: BlogType[]): React.ReactNode => {
    return blogs.map((blog: BlogType) => {
      return (
        <div className="blog-management-item-wrapper" key={blog.id}>
          <img src="" alt="blog item" className="blog-management-item-img" />
          <h3 className="blog-management-item-title">{blog.title}</h3>
          <div className="blog-management-item-created-date">{blog.createdDate.toLocaleDateString("en-US", dateFormatOption)}</div>
          <div className="blog-management-btn-wrapper">
            <button className="blog-management-item-controller" onClick={handleBlogControllerOpenClickEvent} id={`blog-${blog.id}`}>&hellip;</button>
          </div>
          <div className="blog-management-item-controller-wrapper" ref={setControllerRef} id={`blog-${blog.id}`}>
            <button className="blog-management-item-edit-btn">Edit</button>
            <button className="blog-management-item-delete-btn">Delete</button>
            <button className="blog-management-item-close-btn" onClick={handleBlogControllerCloseClickEvent} id={`blog-${blog.id}`}>&#10005;</button>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="blog-management-wrapper">
      <div className="blog-management-main-wrapper">
        <h2 className="blog-management-title">Blog Management</h2>
        <div className="blog-management-items-wrapper">
          {renderBlogs(getBlogTestData(20))}
        </div>
        <div className="blog-management-pagination-wrapper">
          pagination
        </div>
      </div>
      <aside className="blog-management-aside-wrapper">
        <ul className="blog-management-aside-ul">
          <li className="blog-management-aside-li">
            Create New Blog
          </li>
          <li className="blog-management-aside-li">
            Filter Blogs
          </li>
          <li className="blog-management-aside-li">
            Sort Blogs
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default BlogManagement;




