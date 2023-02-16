import React from 'react';
import { connect } from 'react-redux'
import { Button } from 'antd'
import style from './app.module.less'

const App = (props) => {
  const { dispatch, user = {} } = props;

  const setUserName = () => {
    dispatch({
      type: 'user/saveName',
      payload: '张磊'
    })
  }

  return (
    <div className={style.appHome}>
      {user.name}
      <Button onClick={setUserName}>点击切换姓名</Button>
    </div>
  )
}

export default connect(({ user }: any) => ({
  user
}))(App);