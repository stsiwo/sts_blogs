import * as React from 'react';
import './MenuCloseIcon.scss';
import { useCssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import { useResponsiveComponent } from 'Hooks/ResponsiveComponentHook';
import { useDispatch } from 'react-redux';
import { toggleNavBarActionCreator } from 'actions/creators';
import { MdClose } from 'react-icons/md'


const MenuCloseIcon: React.FunctionComponent<{}> = (props: {}) => {

  const dispatch = useDispatch()

  const handleCloseNavBarClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    dispatch(toggleNavBarActionCreator(false))
  }

  const globalCss = useCssGlobalContext();
  const currentScreenWidth = useResponsiveComponent();

  return (
    currentScreenWidth < globalCss.laptopSize && (
      <div className="icon-wrapper header-menu-close-icon-wrapper" onClick={handleCloseNavBarClickEvent}>
        <MdClose className="icon header-menu-close-icon" />
      </div>
    )
  );
}

export default MenuCloseIcon;
