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
import { useSelector, useDispatch } from 'react-redux';
import { StateType } from '../../../../states/types';
import { toggleFilterSortBarActionCreator } from '../../../../actions/creators';
import { useResponsiveComponent } from '../../../Base/Hooks/ResponsiveComponentHook';
import { useCssGlobalContext } from '../../../Base/Context/CssGlobalContext/CssGlobalContext';
import { useRouteMatch } from 'react-router';

const BlogManagement: React.FunctionComponent<{}> = (props: {}) => {


  const [currentBlogs, setBlogs] = React.useState(getBlogTestData())
  const controllerRefs: Map<string, React.MutableRefObject<HTMLDivElement>> = new Map()

  const isFilterSortBarOpen = useSelector((state: StateType) => state.ui.isFilterSortBarOpen)
  const dispatch = useDispatch()

  const currentWidth = useResponsiveComponent()
  const cssGlobal = useCssGlobalContext()

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

  const [currentFilterDate, setFilterDate] = React.useState(new Date())

  const handleDatePickerClickEvent = (selectedDate: Date): void => {
    setFilterDate(selectedDate)
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
            <button className="blog-management-item-controller" onClick={handleBlogControllerOpenClickEvent} id={blog.id}>&hellip;</button>
          </div>
          <div className="blog-management-item-controller-wrapper" ref={divRef} id={blog.id}>

            <Link to={`${url}/${blog.id}`} className="blog-management-aside-new-blog-link">
              <button className="blog-management-item-edit-btn">Edit</button>
            </Link>
            <button className="blog-management-item-delete-btn">Delete</button>
            <button className="blog-management-item-close-btn" onClick={handleBlogControllerCloseClickEvent} id={blog.id}>&#10005;</button>
          </div>
        </div>
      )
    })
  }

  let { path, url } = useRouteMatch();

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
      {/**(currentWidth > cssGlobal.tabletSize || (isFilterSortBarOpen && currentWidth <= cssGlobal.tabletSize)) &&
      **/}
    </div>
  );
}

export default BlogManagement;




