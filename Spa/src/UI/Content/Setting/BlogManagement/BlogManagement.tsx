import * as React from 'react';
import './BlogManagement.scss';
import { BlogType } from '../../../../domain/blog/BlogType';
import { getBlogTestData } from '../../../../../tests/data/BlogFaker';
import { dateFormatOption } from '../../../../utils';
import Icon from '../../../Base/Components/Icon/Icon';
import { getTagTestData } from '../../../../../tests/data/TagFaker';
import Tag from '../../../Base/Components/Tag/Tag';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

declare type TagType = {
  name: string
}

const BlogManagement: React.FunctionComponent<{}> = (props: {}) => {


  const [currentTags, setTag] = React.useState([{ name: 'sampletag' }])
  const [currentBlogs, setBlogs] = React.useState(getBlogTestData())
  const controllerRefs: Map<string, React.MutableRefObject<HTMLDivElement>> = new Map()
  const tagInputRef = React.useRef(null)

  console.log(currentTags)

  const handleBlogControllerOpenClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    controllerRefs.get(e.currentTarget.id).current.style.display = 'flex';
  }

  const handleBlogControllerCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    controllerRefs.get(e.currentTarget.id).current.style.display = 'none';
  }

  //  const setControllerRef = (element: HTMLDivElement) => {
  //    console.log(element)
  //    controllerRefs.set(element.id, element)
  //  }

  const renderCurrentTags = () => {
    return currentTags.map((tag: TagType) => {
      return (
        <Tag name={tag.name} withCancelBtn />
      )
    })
  }

  const [currentFilterDate, setFilterDate] = React.useState(new Date())

  const handleDatePickerClickEvent = (selectedDate: Date): void => {
    setFilterDate(selectedDate)
  }

  const handleTagInputEnterOrTabKeyClickEvent: React.EventHandler<React.KeyboardEvent<HTMLInputElement>> = (e) => {

    if (e.currentTarget.value === "") return false

    if (e.key == 'Enter' || e.key == 'Tab') {
      console.log("you entered")
      console.log(e.currentTarget.value)
      setTag([
        ...currentTags,
        { name: e.currentTarget.value }
      ])
      e.currentTarget.value = ""
    }
  }

  const renderBlogs = (blogs: BlogType[]): React.ReactNode => {

    return blogs.map((blog: BlogType) => {
      const divRef = React.useRef(null)
      controllerRefs.set(blog.id, divRef)
      return (
        <div className="blog-management-item-wrapper" key={blog.id}>
          <img src="" alt="blog item" className="blog-management-item-img" />
          <h3 className="blog-management-item-title">{blog.title}</h3>
          <div className="blog-management-item-created-date">{blog.createdDate.toLocaleDateString("en-US", dateFormatOption)}</div>
          <div className="blog-management-btn-wrapper">
            <button className="blog-management-item-controller" onClick={handleBlogControllerOpenClickEvent} id={`blog-${blog.id}`}>&hellip;</button>
          </div>
          <div className="blog-management-item-controller-wrapper" ref={divRef} id={`blog-${blog.id}`}>
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
          {renderBlogs(currentBlogs)}
        </div>
        <div className="blog-management-pagination-wrapper">
          pagination
        </div>
      </div>
      <aside className="blog-management-aside-wrapper">
        <ul className="blog-management-aside-ul">
          <li className="blog-management-aside-li">
            <Link to="./" className="blog-management-aside-new-blog-link">
              <h3 className="blog-management-aside-new-blog-label">Create New Blog</h3>
            </Link>
          </li>
          <li className="blog-management-aside-li">
            <h3 className="blog-management-aside-filter-title">Filter Blogs</h3>
            <div className="blog-management-aside-filter-tags-wrapper" >
              <h4 className="blog-management-aside-filter-tags-title">Tags</h4>
              <input type="text" className="blog-management-aside-filter-tags-input" onKeyDown={handleTagInputEnterOrTabKeyClickEvent} ref={tagInputRef} />
              {renderCurrentTags()}
            </div>
            <div className="blog-management-aside-filter-keyword-wrapper" >
              <h4 className="blog-management-aside-filter-keyword-title">Keywords</h4>
              <input type="text" className="blog-management-aside-filter-keyword-input" />
            </div>
            <div className="blog-management-aside-filter-date-wrapper" >
              <h4 className="blog-management-aside-filter-date-title">Date</h4>
              <DatePicker
                selected={currentFilterDate}
                onChange={handleDatePickerClickEvent}
              />
            </div>
          </li>
          <li className="blog-management-aside-li">
            <h3 className="blog-management-aside-sort-title">Sort Blogs</h3>
            <div className="blog-management-aside-sort-items-wrapper" >
              <div className="blog-management-aside-sort-item-wrapper" >
                Date Asc
              </div>
              <div className="blog-management-aside-sort-item-wrapper" >
                Date Desc
              </div>
              <div className="blog-management-aside-sort-item-wrapper" >
                Title Asc 
              </div>
              <div className="blog-management-aside-sort-item-wrapper" >
                Title Desc 
              </div>
              <div className="blog-management-aside-sort-item-wrapper" >
                Review Asc 
              </div>
              <div className="blog-management-aside-sort-item-wrapper" >
                Review Desc 
              </div>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default BlogManagement;




