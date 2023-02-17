import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import history from '@/core/history'

const Home =  (props) => {
  const { dispatch, user = {} } = props;

  const setUserName = () => {
    dispatch({
      type: 'user/saveName',
      payload: '张磊'
    })
  }

  return (
    <div>
      {user.name}
      <Button onClick={setUserName}>点击切换姓名</Button>
      <Button onClick={() => history.push('/demo1')}>跳转demo1</Button>
    </div>
  )
}

export default connect(({ user }: any) => ({
  user
}))(Home);