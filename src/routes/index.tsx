import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import routes from './routes'

export default () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {
            routes.map((route: any) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              )
            })
          }
        </Routes>
      </BrowserRouter>
    </div>
  )
}