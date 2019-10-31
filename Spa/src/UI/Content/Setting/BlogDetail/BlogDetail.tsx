import * as React from 'react';
import './BlogDetail.scss';

const BlogDetail: React.FunctionComponent<{}> = (props: {}) => {

  return (
    <div className="blog-detail-wrapper">
      <h2 className="blog-detail-title">New/Update Blog</h2>
      <form className="blog-detail-form">
        <div className="blog-detail-form-title-wrapper" >
          <label htmlFor="title" className="blog-detail-form-title-label">Title</label>
          <input type="text" name="title" id="title" className="blog-detail-form-title-input" placeholder="enter blog title..." />
        </div>
        <div className="blog-detail-form-subtitle-wrapper" >
          <label htmlFor="subtitle" className="blog-detail-form-subtitle-label">Sub Title</label>
          <input type="text" name="subtitle" id="subtitle" className="blog-detail-form-subtitle-input" placeholder="enter blog subtitle..." />
        </div>
        <div className="blog-detail-form-tags-wrapper" >
          <label htmlFor="tags" className="blog-detail-form-tags-label">Tags</label>
          <input type="text" name="tags" id="tags" className="blog-detail-form-tags-input" placeholder="enter blog tags..." />
        </div>
        <div className="blog-detail-form-image-wrapper" >
          <label htmlFor="tags" className="blog-detail-form-image-label">Main Image</label>
          <input type="file" name="tags" id="tags" className="blog-detail-form-image-input" placeholder="enter blog image..." />
        </div>
        <div className="blog-detail-form-content-wrapper" >
          <label htmlFor="content" className="blog-detail-form-content-label">Content</label>
          <input type="text" name="content" id="content" className="blog-detail-form-content-input" placeholder="enter blog content..." />
        </div>
        <div className="blog-detail-btns-wrapper">
          <input type="button" className="blog-detail-btns-reset" value="Reset"/>
          <input type="button" className="blog-detail-btns-save" value="Save" />
        </div>
      </form>
    </div>
  );
}

export default BlogDetail;






