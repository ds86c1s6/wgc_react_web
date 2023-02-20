import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Demo1 =  () => {
  const navigate = useNavigate();

  return (
    <div>
      demo1
      <Button onClick={() => navigate('/')}>返回</Button>
    </div>
  )
}

export default Demo1