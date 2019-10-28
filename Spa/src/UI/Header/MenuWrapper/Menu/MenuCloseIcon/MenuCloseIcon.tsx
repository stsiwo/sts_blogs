import * as React from 'react';
import './MenuCloseIcon.scss';
import { useCssGlobalContext } from '../../../../Base/Context/CssGlobalContext/CssGlobalContext';
import { useResponsiveComponent } from '../../../../Base/Hooks/ResponsiveComponentHook';
import { useDispatch } from 'react-redux';
import { toggleNavBarActionCreator } from '../../../../../actions/creators';


const MenuCloseIcon: React.FunctionComponent<{}> = (props: {}) => {

  const dispatch = useDispatch()

  const handleCloseNavBarClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    dispatch(toggleNavBarActionCreator(false))
  }

  const globalCss = useCssGlobalContext();
  const currentScreenWidth = useResponsiveComponent();

  return (
    currentScreenWidth < globalCss.laptopSize && (
      <i className="regular-icon header-menu-close-icon" onClick={handleCloseNavBarClickEvent}>
        &#10006;
      </i>
    )
  );
}

export default MenuCloseIcon;
