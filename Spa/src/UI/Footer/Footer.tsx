import * as React from 'react';
import { useResponsiveComponent } from 'Hooks/ResponsiveComponentHook';
import { useCssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import './Footer.scss';


const Footer: React.FunctionComponent<{}> = (props: {}) => {

  const currentScreenWidth = useResponsiveComponent();
  const cssGlobal = useCssGlobalContext();

  return (
    <footer className="footer-wrapper">
      <div className="footer-content-wrapper">
        <div className="footer-content-about-me-wrapper">
          <h2 className="footer-content-about-me-title">About Me</h2>
          <img src="" alt="about me img"/>
          <span className="footer-content-about-me-name">Satoshi Iwao</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

