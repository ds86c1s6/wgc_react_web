import React, { useEffect } from 'react'
import { Route, Routes, HashRouter } from 'react-router-dom'
import routes from './routes'

export default () => {
  
  return (
    <HashRouter>
      <Routes>
        {
          routes.map((route: any) => {
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
    </HashRouter>
  )
}