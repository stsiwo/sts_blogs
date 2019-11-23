import * as React from 'react';
import './Home.scss';

const Home: React.FunctionComponent<{}> = (props: {}) => {

  return (
    <div className="home-wrapper">
      <div className="home-title-wrapper">
        <h1 className="home-slogan">Share Your Knowledge and Expand What You Can Do</h1> 
      </div>
      <div className="home-featured-tag-blog-wrapper">
        <h1 className="">featured tag blos list</h1> 
      </div>
      <div className="home-recommendation-blog-wrapper">
        <h1 className="">recommendation blog list if member</h1> 
      </div>
      <div className="home-membership-promotion-wrapper">
        <h1 className="">become member to post your blog</h1> 
      </div>
    </div>
  );
}

export default Home;


