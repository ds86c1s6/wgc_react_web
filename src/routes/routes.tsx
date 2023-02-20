import loadable from '@/components/Loadable'
import React, { lazy, Suspense } from 'react'
import Home from '@/pages/home'
import Demo1 from '@/pages/demo1'


// const Layout = (path) => {
//   const Component = lazy(() => import(`@/pages${path}`));
//   return (
//     <Suspense fallback={<div>123</div>}>
//       <Component />
//     </Suspense>
//   )
// }

const routes = [
  {
    path: "/",
    // component: Layout('/'),
    component: loadable(() => import('@/pages/home')),
    // component: <Home />,
  },
  {
    path: "/demo1",
    // component: Layout('/demo1'),
    component: loadable(() => import('@/pages/demo1')),
    // component: <Demo1 />,
  },
];

export default routes