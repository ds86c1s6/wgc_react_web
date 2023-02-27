import loadable from '@/components/loadable'
import React, { lazy, ReactElement, Suspense } from 'react'
import Home from '@/pages/home'
import Demo1 from '@/pages/demo1'
import Demo2 from '@/pages/demo1/demo12'
import Demo3 from '@/pages/demo1/demo13'

export interface RouteItem {
  path: string;
  component?: any;
  loadableComponent?: any;
  description: string;
  animationConfig?: {
    enter: string;
    exit: string;
  },
  demoRoot?: boolean;
  children?: Array<RouteItem>;
}


// const Layout = (path) => {
//   const Component = lazy(() => import(`@/pages${path}`));
//   return (
//     <Suspense fallback={<div>123</div>}>
//       <Component />
//     </Suspense>
//   )
// }

const routes: RouteItem[] = [
  // 非portal和react-transition-group过度的路由可以懒加载
  {
    path: "/home",
    // component: Layout('/'),
    loadableComponent: loadable(() => import('@/pages/home')),
    // component: <Home />,
    description: '主页'
  },
  {
    path: "/demo1",
    // component: Layout('/demo1'),
    loadableComponent: loadable(() => import('@/pages/demo1')),
    // component: <Demo1 />,
    description: 'demo1：portal实现路由持久化+新消息blink',
    demoRoot: true,
    children: [
      // 用于portal与react-transition-group过度的路由不能懒加载，不然第一次跳转的时候没有过度动画
      {
        path: "/demo1/demo12",
        // component: loadable(() => import('@/pages/demo2')),
        component: <Demo2 />,
        description: 'demo12'
      },
      {
        path: "/demo1/demo13",
        // component: loadable(() => import('@/pages/demo3')),
        component: <Demo3 />,
        description: 'demo13'
      },
    ]
  },
];
export default routes