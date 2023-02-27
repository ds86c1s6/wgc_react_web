import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Demo2 =  (props) => {
  const navigate = useNavigate();

  return (
    <div className='portalPage' style={{background: 'pink'}}>
      demo222222222222
      <Button onClick={() => navigate(-1)}>返回</Button>
    </div>
  )
}

export default Demo2;