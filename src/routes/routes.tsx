import loadable from '@/components/Loadable'
import React, { lazy, ReactElement, Suspense } from 'react'
import Home from '@/pages/home'
import Demo1 from '@/pages/demo1'
import Demo2 from '@/pages/demo2'

export interface RouteItem {
  path: string;
  component: ReactElement;
  description: string;
  animationConfig?: {
    enter: string;
    exit: string;
  },
  demoRoot?: boolean
}


// const Layout = (path) => {
//   const Component = lazy(() => import(`@/pages${path}`));
//   return (
//     <Suspense fallback={<div>123</div>}>
//       <Component />
//     </Suspense>
//   )
// }


export const portalRoutes = [
  {
    path: "/demo1/demo2",
    // component: Layout('/demo1'),
    component: <Demo2 />,
    // component: <Demo1 />,
    description: 'demo2：热得快给你的看热闹广阔的让你的认可'
  },
]
const routes: RouteItem[] = [
  {
    path: "/",
    // component: Layout('/'),
    // component: loadable(() => import('@/pages/home')),
    component: <Home />,
    description: '主页'
  },
  {
    path: "/demo1/*",
    // component: Layout('/demo1'),
    // component: loadable(() => import('@/pages/demo1')),
    component: <Demo1 />,
    description: 'demo1：portal实现路由持久化',
    demoRoot: true
  },
  // ...portalRoutes
];
export default routes