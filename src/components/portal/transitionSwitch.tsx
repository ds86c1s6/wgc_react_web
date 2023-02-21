import React, {} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Routes, Route } from 'react-router-dom'
import { portalRoutes } from '@/routes/routes'
import { createBrowserHistory } from 'history'

const DEFAULT_CONFIG = {
  enter: 'from-right',
  exit: 'to-right'
}

const getAnimationConfig = () => {
  const matchedRoute = portalRoutes.find(i => new RegExp(`^${i.path}$`).test(location.pathname));
  return DEFAULT_CONFIG
}

let oldLocation = null;
// 路由滑动切换组件，给予路由切换动画和持久化功能
export const TransitionSwitch = () => {
  const history = createBrowserHistory();
  
  let classNames = '';
  if(history.action === 'PUSH') {
    classNames = 'forward-' + getAnimationConfig().enter || '';
  }else if(history.action === 'POP' && oldLocation) {
    classNames = 'back-' + getAnimationConfig().exit || '';
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
        <Routes>
          {
            portalRoutes.map((route: any) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              )
            })
          }
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}