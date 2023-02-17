import React from 'react';
import RouteComponent from '@/routes'
import style from './app.module.less'

const App = (props) => {

  return (
    <div className={style.appHome}>
      <RouteComponent />
    </div>
  )
}

export default App