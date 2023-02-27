import React, { useEffect } from 'react'
import { Route, Routes, HashRouter, Navigate } from 'react-router-dom'
import routes, { RouteItem } from './routes'

export default () => {
  

  const renderRoutes = (routes: RouteItem[]) => {
    return routes.map((route: RouteItem) => {
      const element = route.loadableComponent ? <route.loadableComponent/> : route.component
      return (
        <Route
          key={route.path}
          path={route.path}
          element={element}
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      )
    })
  }

  return (
    <HashRouter>
      <Routes>
        {renderRoutes(routes)}
        <Route path='/' element={<Navigate replace to="/home" />} />
      </Routes>
    </HashRouter>
  )
}