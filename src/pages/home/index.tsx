import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Home =  (props) => {
  const { dispatch, user = {} } = props;
  const navigate = useNavigate();

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
      <Button onClick={() => navigate('/demo1')}>跳转demo1</Button>
    </div>
  )
}

export default connect(({ user }: any) => ({
  user
}))(Home);