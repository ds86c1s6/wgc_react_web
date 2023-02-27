import React, {} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useNavigationType, useLocation } from 'react-router-dom'
import './index.less'

const DEFAULT_CONFIG = {
  enter: 'from-right',
  exit: 'to-right'
}

let oldLocation = null;
// 路由滑动切换组件，给予路由切换动画和持久化功能
export const TransitionSwitch = (props) => {
  const navigationType = useNavigationType();
  const location = useLocation();
  
  let classNames = '';
  if(navigationType === 'PUSH') {
    classNames = 'forward-' + DEFAULT_CONFIG.enter || '';
  }else if(navigationType === 'POP' && oldLocation) {
    classNames = 'back-' + DEFAULT_CONFIG.exit || '';
  }
  oldLocation = location

  return (
    <TransitionGroup
      className="router-wrapper"
      childFactory={child => React.cloneElement(child, { classNames })}
    >
      <CSSTransition
        timeout={classNames ? 500 : 0} // 延时
        key={location.pathname}
      >
        {props.children}
      </CSSTransition>
    </TransitionGroup>
  )
}