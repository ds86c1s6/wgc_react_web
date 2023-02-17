import loadable from '@/components/Loadable'
import { lazy, Suspense } from 'react'


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
  },
  {
    path: "/demo1",
    // component: Layout('/demo1'),
    component: loadable(() => import('@/pages/demo1')),
  },
];

export default routes